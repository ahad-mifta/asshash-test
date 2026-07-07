import { Router } from "express";
import { randomUUID } from "crypto";

import { connectDB } from "../db.js";
import Payment from "../models/Payment.js";
import {
  initiateHostedPayment,
  validateHostedPayment,
} from "../services/sslcommerz.js";
import { config } from "../config.js";

const router = Router();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildTransactionId() {
  return `TST${Date.now().toString(36)}${randomUUID().replace(/-/g, "").slice(0, 16)}`
    .slice(0, 30)
    .toUpperCase();
}

/**
 * Returns a self-closing HTML page that posts a message to window.opener
 * (the React app's popup listener) then closes itself.
 */
function buildResultPage(success, message) {
  const icon = success ? "✓" : "✗";
  const color = success ? "#22B573" : "#ef4444";
  const bgIcon = success ? "#e9f8f0" : "#fee2e2";
  const title = success ? "পেমেন্ট সফল" : "পেমেন্ট ব্যর্থ";

  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Segoe UI',sans-serif;min-height:100vh;display:flex;
      align-items:center;justify-content:center;background:#f7fbf8}
    .card{background:#fff;border-radius:16px;padding:48px 40px;text-align:center;
      box-shadow:0 8px 40px rgba(0,0,0,.10);max-width:420px;width:90%}
    .icon{width:72px;height:72px;border-radius:50%;background:${bgIcon};
      color:${color};font-size:2.4rem;line-height:72px;
      margin:0 auto 24px;font-weight:bold}
    h2{color:${color};font-size:1.5rem;margin-bottom:12px}
    p{color:#6b7280;font-size:.95rem;line-height:1.6;margin-bottom:24px}
    .note{font-size:.8rem;color:#9ca3af}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h2>${title}</h2>
    <p>${message}</p>
    <p class="note">এই উইন্ডো স্বয়ংক্রিয়ভাবে বন্ধ হয়ে যাচ্ছে…</p>
  </div>
  <script>
    (function(){
      var ok=${success};
      function notify(){
        try{
          if(window.opener&&!window.opener.closed){
            window.opener.postMessage({type:'ASSHASH_PAYMENT_RESULT',success:ok},'*');
          }
        }catch(e){}
      }
      notify();
      setTimeout(function(){ notify(); window.close(); }, 2000);
    })();
  </script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// POST /api/initiate-payment
// Frontend calls this to get a GatewayPageURL to open in a popup.
// ---------------------------------------------------------------------------
router.post("/initiate-payment", async (req, res) => {
  try {
    await connectDB();

    const { testId, testTitle, amount } = req.body;

    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ ok: false, error: "Invalid amount" });
    }

    if (!config.sslcommerzStoreId || !config.sslcommerzStorePassword) {
      return res.status(503).json({
        ok: false,
        error:
          "Payment gateway not configured. Set SSLCOMMERZ_STORE_ID and SSLCOMMERZ_STORE_PASSWORD.",
      });
    }

    const transactionId = buildTransactionId();
    const backendUrl = config.backendUrl;

    const sslPayload = {
      total_amount: parsedAmount,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${backendUrl}/api/payment/success`,
      fail_url: `${backendUrl}/api/payment/fail`,
      cancel_url: `${backendUrl}/api/payment/cancel`,
      shipping_method: "NO",
      product_name: testTitle || "Psychological Test",
      product_category: "healthcare",
      product_profile: "non-physical-goods",
      cus_name: "Patient",
      cus_email: "patient@asshash.com",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_postcode: "1205",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",
      ship_name: "Patient",
      ship_add1: "Dhaka",
      ship_city: "Dhaka",
      ship_postcode: "1205",
      ship_country: "Bangladesh",
      value_a: testId || "",
    };

    const gatewayResponse = await initiateHostedPayment(sslPayload);

    if (!gatewayResponse.GatewayPageURL) {
      // eslint-disable-next-line no-console
      console.error("SSLCommerz init failed:", gatewayResponse);
      return res.status(502).json({
        ok: false,
        error: "Payment gateway error",
        details:
          gatewayResponse.failedreason ||
          "Could not retrieve gateway URL from SSLCommerz",
      });
    }

    const payment = await Payment.create({
      transactionId,
      sessionKey: gatewayResponse.sessionkey || null,
      gatewayPageUrl: gatewayResponse.GatewayPageURL,
      testId: testId || null,
      testTitle: testTitle || null,
      amount: parsedAmount,
      gatewayResponse: JSON.stringify(gatewayResponse),
    });

    return res.json({
      ok: true,
      sessionId: payment._id.toString(),
      gatewayPageUrl: gatewayResponse.GatewayPageURL,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("initiate-payment error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// ---------------------------------------------------------------------------
// GET /api/payment/status/:sessionId
// Frontend polls this while the popup is open.
// ---------------------------------------------------------------------------
router.get("/payment/status/:sessionId", async (req, res) => {
  try {
    await connectDB();

    const payment = await Payment.findById(req.params.sessionId)
      .select("status transactionId")
      .lean();

    if (!payment) {
      return res
        .status(404)
        .json({ ok: false, error: "Payment session not found" });
    }

    return res.json({
      ok: true,
      status: payment.status,
      transactionId: payment.transactionId,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("payment/status error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// ---------------------------------------------------------------------------
// Shared callback handler
// ---------------------------------------------------------------------------
async function handleCallback(req, res, expectedOutcome) {
  let success = false;
  let message = "পেমেন্ট সম্পন্ন হয়নি।";

  try {
    await connectDB();

    const payload = { ...req.body, ...req.query };
    const { tran_id, val_id } = payload;

    const payment = await Payment.findOne({ transactionId: tran_id });
    if (!payment) {
      message = "পেমেন্ট সেশন খুঁজে পাওয়া যায়নি।";
    } else if (expectedOutcome === "success") {
      let validated = false;

      if (val_id) {
        try {
          const validation = await validateHostedPayment(val_id);
          if (
            (validation.status === "VALID" ||
              validation.status === "VALIDATED") &&
            String(validation.tran_id) === String(tran_id)
          ) {
            validated = true;
            payment.validationId = val_id;
            payment.paymentMethod = payload.card_type || null;
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("SSLCommerz validation error:", e);
        }
      }

      if (validated) {
        payment.status = "Completed";
        success = true;
        message = "পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!";
      } else {
        payment.status = "Failed";
        payment.failureReason = "Validation failed";
        message = "পেমেন্ট যাচাই করা সম্ভব হয়নি।";
      }
      await payment.save();
    } else if (expectedOutcome === "fail") {
      payment.status = "Failed";
      payment.failureReason = payload.error || "Payment failed at gateway";
      await payment.save();
      message = "পেমেন্ট ব্যর্থ হয়েছে।";
    } else if (expectedOutcome === "cancel") {
      payment.status = "Cancelled";
      await payment.save();
      message = "পেমেন্ট বাতিল করা হয়েছে।";
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("payment callback error:", err);
    message = "পেমেন্ট প্রক্রিয়ায় সমস্যা হয়েছে।";
  }

  return res.send(buildResultPage(success, message));
}

// SSLCommerz can POST or GET to these routes
router.all("/payment/success", (req, res) => handleCallback(req, res, "success"));
router.all("/payment/fail", (req, res) => handleCallback(req, res, "fail"));
router.all("/payment/cancel", (req, res) => handleCallback(req, res, "cancel"));

export default router;
