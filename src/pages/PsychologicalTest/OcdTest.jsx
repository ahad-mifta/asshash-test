import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import Footer from "../../shared/Footer/Footer";
import Navbar from "../../shared/Navbar/Navbar";
import {
  answerOptions,
  getReport,
  paymentFee,
  tests,
} from "./psychologicalTestData";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const initialUser = {
  name: "",
  age: "",
  email: "",
  phone: "",
};

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

const saveReport = async (payload) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  if (apiBaseUrl) {
    const response = await fetch(`${apiBaseUrl}/psychological-tests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const msg = await response.text().catch(() => "");
      throw new Error(`Report submit failed: ${msg}`);
    }

    await response.json().catch(() => null);
    return "server";
  }

  const existing = JSON.parse(
    localStorage.getItem("psychologicalTestReports") || "[]"
  );
  localStorage.setItem(
    "psychologicalTestReports",
    JSON.stringify([...existing, payload])
  );

  return "local";
};

// ---------------------------------------------------------------------------
// OcdTest component
// ---------------------------------------------------------------------------

const OcdTest = () => {
  const { testId = "ocd" } = useParams();
  const test = tests[testId] || tests.ocd;
  const options = answerOptions[test.answerType];

  // ── Wizard step ──────────────────────────────────────────────────────────
  const [step, setStep] = useState("payment");

  // ── User info ────────────────────────────────────────────────────────────
  const [user, setUser] = useState(initialUser);

  // ── Quiz state ───────────────────────────────────────────────────────────
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reportStatus, setReportStatus] = useState("");

  // ── Payment state ────────────────────────────────────────────────────────
  /**
   * paymentStatus:
   *   "idle"       – not started
   *   "initiating" – calling backend to get GatewayPageURL
   *   "pending"    – popup open, waiting for user to pay
   *   "completed"  – payment confirmed
   *   "failed"     – payment failed or cancelled
   */
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [paymentMessage, setPaymentMessage] = useState("");

  // Refs for popup and polling interval
  const popupRef = useRef(null);
  const pollingRef = useRef(null);

  // ── Derived values ───────────────────────────────────────────────────────
  const score = useMemo(
    () => answers.reduce((total, answer) => total + Number(answer || 0), 0),
    [answers]
  );
  const report = getReport(test, score);
  const progress = Math.round((answers.length / test.questions.length) * 100);
  const selectedAnswer = answers[currentIndex];

  // ── Payment effect ───────────────────────────────────────────────────────

  // Stop polling and optionally close the popup
  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const closePopup = () => {
    try {
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close();
      }
    } catch (_) {
      /* cross-origin close may throw in some browsers — ignore */
    }
    popupRef.current = null;
  };

  // Listen for postMessage from the payment result page served by the backend
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type !== "ASSHASH_PAYMENT_RESULT") return;

      stopPolling();
      closePopup();

      if (event.data.success) {
        setPaymentStatus("completed");
        setPaymentMessage("পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। এগিয়ে যান।");
      } else {
        setPaymentStatus("failed");
        setPaymentMessage(
          "পেমেন্ট ব্যর্থ হয়েছে অথবা বাতিল করা হয়েছে। আবার চেষ্টা করুন।"
        );
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
      stopPolling();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Payment handler ──────────────────────────────────────────────────────

  const handlePayment = async () => {
    if (paymentStatus === "initiating" || paymentStatus === "pending") return;

    setPaymentStatus("initiating");
    setPaymentMessage("");

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    // ── Demo mode (no backend configured) ──────────────────────────────────
    if (!apiBaseUrl) {
      setPaymentStatus("completed");
      setPaymentMessage(
        "ডেমো মোডে SSLCommerz পেমেন্ট সম্পন্ন ধরা হয়েছে। লাইভ পেমেন্টের জন্য VITE_API_BASE_URL সেট করুন।"
      );
      return;
    }

    // ── Open a blank popup immediately (before the async call) so browsers ──
    // ── don't block it as a non-user-gesture popup.                         ──
    const popupFeatures =
      "width=640,height=720,scrollbars=yes,resizable=yes,left=200,top=80,toolbar=no,menubar=no";
    const popup = window.open("about:blank", "SSLCommerzPayment", popupFeatures);
    popupRef.current = popup;

    // Write a loading placeholder into the popup
    if (popup) {
      popup.document.write(`<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8"/>
  <title>পেমেন্ট লোড হচ্ছে…</title>
  <style>
    body{font-family:'Segoe UI',sans-serif;display:flex;align-items:center;
         justify-content:center;min-height:100vh;margin:0;background:#f7fbf8}
    .loader{text-align:center;color:#22B573}
    .spinner{width:48px;height:48px;border:5px solid #e9f8f0;
             border-top-color:#22B573;border-radius:50%;
             animation:spin .9s linear infinite;margin:0 auto 20px}
    @keyframes spin{to{transform:rotate(360deg)}}
    p{font-size:1rem;font-weight:600}
  </style>
</head>
<body>
  <div class="loader">
    <div class="spinner"></div>
    <p>পেমেন্ট পেজ লোড হচ্ছে…</p>
  </div>
</body>
</html>`);
    }

    try {
      const response = await fetch(`${apiBaseUrl}/initiate-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: test.id,
          testTitle: test.title,
          amount: paymentFee,
        }),
      });

      const data = await response.json();

      if (!data.ok || !data.gatewayPageUrl) {
        closePopup();
        setPaymentStatus("failed");
        setPaymentMessage(
          data.error ||
            "পেমেন্ট শুরু করা সম্ভব হয়নি। সার্ভার কনফিগারেশন পরীক্ষা করুন।"
        );
        return;
      }

      setPaymentStatus("pending");
      setPaymentMessage(
        "SSLCommerz পেমেন্ট উইন্ডো খোলা হয়েছে। পেমেন্ট শেষ করলে এই পেজ স্বয়ংক্রিয়ভাবে আপডেট হবে।"
      );

      // Navigate the popup to the real SSLCommerz page
      if (popup && !popup.closed) {
        popup.location.href = data.gatewayPageUrl;
      }

      // ── Poll backend every 3 s as a fallback for postMessage ──────────────
      const sessionId = data.sessionId;

      pollingRef.current = setInterval(async () => {
        // If user manually closed the popup, do a final status check
        if (popup && popup.closed && pollingRef.current) {
          stopPolling();
          try {
            const statusRes = await fetch(
              `${apiBaseUrl}/payment/status/${sessionId}`
            );
            const statusData = await statusRes.json();
            if (statusData.ok && statusData.status === "Completed") {
              setPaymentStatus("completed");
              setPaymentMessage("পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। এগিয়ে যান।");
            } else if (
              statusData.ok &&
              (statusData.status === "Failed" ||
                statusData.status === "Cancelled")
            ) {
              setPaymentStatus("failed");
              setPaymentMessage(
                "পেমেন্ট ব্যর্থ হয়েছে অথবা বাতিল করা হয়েছে। আবার চেষ্টা করুন।"
              );
            } else {
              // Popup closed but status still pending — user may have closed early
              setPaymentStatus("idle");
              setPaymentMessage(
                "পেমেন্ট উইন্ডো বন্ধ করা হয়েছে। পেমেন্ট সম্পন্ন না হলে আবার চেষ্টা করুন।"
              );
            }
          } catch {
            setPaymentStatus("idle");
            setPaymentMessage(
              "পেমেন্ট উইন্ডো বন্ধ। স্ট্যাটাস জানা যায়নি — আবার চেষ্টা করুন।"
            );
          }
          return;
        }

        try {
          const statusRes = await fetch(
            `${apiBaseUrl}/payment/status/${sessionId}`
          );
          const statusData = await statusRes.json();

          if (statusData.ok && statusData.status === "Completed") {
            stopPolling();
            closePopup();
            setPaymentStatus("completed");
            setPaymentMessage("পেমেন্ট সফলভাবে সম্পন্ন হয়েছে। এগিয়ে যান।");
          } else if (
            statusData.ok &&
            (statusData.status === "Failed" ||
              statusData.status === "Cancelled")
          ) {
            stopPolling();
            closePopup();
            setPaymentStatus("failed");
            setPaymentMessage(
              "পেমেন্ট ব্যর্থ হয়েছে অথবা বাতিল করা হয়েছে। আবার চেষ্টা করুন।"
            );
          }
        } catch {
          /* Ignore transient polling errors */
        }
      }, 3000);
    } catch (err) {
      console.error("Payment initiation error:", err);
      closePopup();
      setPaymentStatus("failed");
      setPaymentMessage(
        "পেমেন্ট শুরু করতে সমস্যা হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন।"
      );
    }
  };

  // ── User form ────────────────────────────────────────────────────────────

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();
    setStep("questions");
  };

  // ── Quiz ─────────────────────────────────────────────────────────────────

  const handleAnswer = (value) => {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = value;
    setAnswers(nextAnswers);

    if (currentIndex < test.questions.length - 1) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    setStep("report");
    submitReport(nextAnswers);
  };

  const submitReport = async (finalAnswers) => {
    setReportStatus(
      "রিপোর্ট সংরক্ষণ ও ইমেইল পাঠানোর জন্য প্রস্তুত করা হচ্ছে..."
    );

    const payload = {
      user,
      testId: test.id,
      testTitle: test.title,
      score: finalAnswers.reduce(
        (total, answer) => total + Number(answer || 0),
        0
      ),
      resultTitle: report.title,
      reportText: report.text,
      answers: finalAnswers,
    };

    try {
      const target = await saveReport(payload);
      setReportStatus(
        target === "server"
          ? "রিপোর্ট ডাটাবেসে সেভ হয়েছে এবং ইমেইল সার্ভিসে পাঠানো হয়েছে।"
          : "Backend সেট না থাকায় রিপোর্ট ব্রাউজারের localStorage-এ সেভ হয়েছে।"
      );
    } catch {
      setReportStatus(
        "রিপোর্ট তৈরি হয়েছে, তবে সার্ভারে পাঠানো যায়নি। backend endpoint পরীক্ষা করুন।"
      );
    }
  };

  // ── Reset ────────────────────────────────────────────────────────────────

  const resetTest = () => {
    stopPolling();
    closePopup();
    setStep("payment");
    setUser(initialUser);
    setAnswers([]);
    setCurrentIndex(0);
    setReportStatus("");
    setPaymentStatus("idle");
    setPaymentMessage("");
  };

  // ── Payment step button rendering ────────────────────────────────────────

  const isPaymentBusy =
    paymentStatus === "initiating" || paymentStatus === "pending";

  const PaymentButton = () => {
    if (paymentStatus === "completed") {
      return (
        <button
          type="button"
          onClick={() => setStep("details")}
          className="mt-6 w-full rounded-full bg-[#22B573] px-6 py-3 font-bold text-white transition hover:bg-[#1a935b] flex items-center justify-center gap-2"
        >
          {/* Animated checkmark */}
          <svg
            className="w-5 h-5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          পেমেন্ট সম্পন্ন হয়েছে, এগিয়ে যান
        </button>
      );
    }

    return (
      <button
        type="button"
        id="ssl-pay-btn"
        onClick={handlePayment}
        disabled={isPaymentBusy}
        className={`mt-6 w-full rounded-full px-6 py-3 font-bold text-white transition flex items-center justify-center gap-2 ${
          isPaymentBusy
            ? "bg-[#22B573]/70 cursor-not-allowed"
            : "bg-[#22B573] hover:bg-[#1a935b]"
        }`}
      >
        {isPaymentBusy ? (
          <>
            {/* Spinner */}
            <svg
              className="w-5 h-5 animate-spin shrink-0"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            {paymentStatus === "initiating"
              ? "পেমেন্ট শুরু হচ্ছে…"
              : "পেমেন্টের অপেক্ষায়…"}
          </>
        ) : (
          "SSLCommerz দিয়ে পে করুন"
        )}
      </button>
    );
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f7fbf8]">
      <div className="bg-white">
        <Navbar />
      </div>

      <main className="container mx-auto px-4 py-10 md:py-14">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              to="/psychological-test"
              className="text-sm font-semibold text-[#22B573]"
            >
              ← সব টেস্টে ফিরে যান
            </Link>
            <h1 className="mt-3 text-3xl font-bold text-[#10251b] md:text-4xl">
              {test.title}
            </h1>
            <p className="mt-2 max-w-2xl text-gray-600">{test.subtitle}</p>
          </div>
          <div className="rounded-lg border border-[#dcefe5] bg-white px-5 py-4 text-right shadow-sm">
            <p className="text-sm text-gray-500">টেস্ট ফি</p>
            <p className="text-2xl font-bold text-[#22B573]">৳{paymentFee}</p>
          </div>
        </div>

        {/* Wizard card */}
        <section className="rounded-lg border border-[#dcefe5] bg-white p-5 shadow-xl shadow-green-100/50 md:p-8">
          {/* Step indicator */}
          <div className="mb-8 grid gap-3 md:grid-cols-4">
            {["পেমেন্ট", "তথ্য", "প্রশ্ন", "রিপোর্ট"].map((label, index) => {
              const activeIndex = [
                "payment",
                "details",
                "questions",
                "report",
              ].indexOf(step);
              return (
                <div
                  key={label}
                  className={`rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
                    index <= activeIndex
                      ? "bg-[#22B573] text-white"
                      : "bg-[#eef7f2] text-[#173d2b]"
                  }`}
                >
                  {label}
                </div>
              );
            })}
          </div>

          {/* ── PAYMENT STEP ─────────────────────────────────────────────── */}
          {step === "payment" && (
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h2 className="text-2xl font-bold text-[#10251b]">
                  SSLCommerz পেমেন্ট সম্পন্ন করুন
                </h2>
                <p className="mt-3 leading-7 text-gray-600">
                  নিচের বাটনে ক্লিক করলে একটি নিরাপদ SSLCommerz পেমেন্ট
                  উইন্ডো খুলবে। পেমেন্ট শেষ হলে এই পেজ স্বয়ংক্রিয়ভাবে
                  আপডেট হয়ে যাবে।
                </p>

                {/* Status message area */}
                {paymentMessage && (
                  <p
                    className={`mt-5 rounded-lg p-4 text-sm font-semibold leading-6 ${
                      paymentStatus === "failed"
                        ? "bg-red-50 text-red-700"
                        : paymentStatus === "completed"
                        ? "bg-[#e9f8f0] text-[#173d2b]"
                        : "bg-[#e9f8f0] text-[#173d2b]"
                    }`}
                  >
                    {paymentMessage}
                  </p>
                )}
              </div>

              <div className="rounded-lg border border-[#dcefe5] bg-[#f8fdfb] p-6">
                <p className="text-sm font-semibold text-gray-500">
                  পরিশোধযোগ্য
                </p>
                <p className="mt-2 text-4xl font-bold text-[#10251b]">
                  ৳{paymentFee}
                </p>

                {/* Dynamic payment button */}
                <PaymentButton />

                {/* Retry hint shown only on failure */}
                {paymentStatus === "failed" && (
                  <p className="mt-3 text-center text-xs text-gray-400">
                    উপরের বাটনে ক্লিক করে আবার চেষ্টা করুন
                  </p>
                )}

                {/* SSLCommerz badge */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <svg
                    className="w-4 h-4 text-[#22B573]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  SSLCommerz দ্বারা সুরক্ষিত পেমেন্ট
                </div>
              </div>
            </div>
          )}

          {/* ── DETAILS STEP ─────────────────────────────────────────────── */}
          {step === "details" && (
            <form onSubmit={handleUserSubmit} className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-[#10251b]">
                আপনার তথ্য দিন
              </h2>
              <p className="mt-2 text-gray-600">
                রিপোর্ট তৈরি, ইমেইল পাঠানো এবং ডাটাবেসে সংরক্ষণের জন্য তথ্য
                প্রয়োজন।
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["name", "নাম", "text"],
                  ["age", "বয়স", "number"],
                  ["email", "ইমেইল", "email"],
                  ["phone", "ফোন নম্বর", "tel"],
                ].map(([name, label, type]) => (
                  <label key={name} className="block">
                    <span className="mb-2 block text-sm font-bold text-[#173d2b]">
                      {label}
                    </span>
                    <input
                      required
                      name={name}
                      type={type}
                      value={user[name]}
                      onChange={handleUserChange}
                      className="w-full rounded-lg border border-[#cfe6d8] px-4 py-3 outline-none transition focus:border-[#22B573] focus:ring-2 focus:ring-green-100"
                    />
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="mt-7 rounded-full bg-[#22B573] px-8 py-3 font-bold text-white transition hover:bg-[#1a935b]"
              >
                প্রশ্ন শুরু করুন
              </button>
            </form>
          )}

          {/* ── QUESTIONS STEP ───────────────────────────────────────────── */}
          {step === "questions" && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-6">
                <div className="mb-2 flex justify-between text-sm font-semibold text-gray-500">
                  <span>
                    প্রশ্ন {currentIndex + 1} / {test.questions.length}
                  </span>
                  <span>{progress}% সম্পন্ন</span>
                </div>
                <div className="h-2 rounded-full bg-[#e4f3eb]">
                  <div
                    className="h-2 rounded-full bg-[#22B573] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="rounded-lg bg-[#f8fdfb] p-6 md:p-8">
                <p className="text-xl font-bold leading-9 text-[#10251b] md:text-2xl">
                  {test.questions[currentIndex]}
                </p>
                <div className="mt-8 grid gap-3">
                  {options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      className={`rounded-lg border px-5 py-4 text-left font-semibold transition ${
                        selectedAnswer === option.value
                          ? "border-[#22B573] bg-[#e9f8f0] text-[#173d2b]"
                          : "border-[#dcefe5] bg-white text-gray-700 hover:border-[#22B573]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex justify-between">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((index) => index - 1)}
                  className="rounded-full border border-[#cfe6d8] px-5 py-2 font-semibold text-[#173d2b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  আগের প্রশ্ন
                </button>
                <button
                  type="button"
                  onClick={resetTest}
                  className="rounded-full px-5 py-2 font-semibold text-gray-500 hover:text-[#173d2b]"
                >
                  নতুন করে শুরু
                </button>
              </div>
            </div>
          )}

          {/* ── REPORT STEP ──────────────────────────────────────────────── */}
          {step === "report" && (
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg bg-[#10251b] p-6 text-white md:p-8">
                <p className="text-sm font-semibold text-green-100">
                  {user.name} এর রিপোর্ট
                </p>
                <h2 className="mt-3 text-3xl font-bold">{report.title}</h2>
                <p className="mt-4 text-lg text-green-50">
                  মোট স্কোর: <span className="font-bold">{score}</span>
                </p>
              </div>

              <div className="mt-6 rounded-lg border border-[#dcefe5] bg-[#f8fdfb] p-6">
                <h3 className="text-xl font-bold text-[#10251b]">
                  ফলাফলের ব্যাখ্যা
                </h3>
                <p className="mt-3 leading-8 text-gray-700">{report.text}</p>
                <p className="mt-5 rounded-lg bg-white p-4 text-sm leading-6 text-gray-600">
                  এই রিপোর্টটি প্রাথমিক স্ক্রিনিং হিসেবে তৈরি। এটি চিকিৎসকের
                  চূড়ান্ত রোগনির্ণয়ের বিকল্প নয়।
                </p>
                {reportStatus && (
                  <p className="mt-4 text-sm font-semibold text-[#22B573]">
                    {reportStatus}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetTest}
                  className="rounded-full bg-[#22B573] px-6 py-3 font-bold text-white transition hover:bg-[#1a935b]"
                >
                  আরেকটি টেস্ট দিন
                </button>
                <Link
                  to="/psychological-test"
                  className="rounded-full border border-[#22B573] px-6 py-3 font-bold text-[#22B573] transition hover:bg-[#e9f8f0]"
                >
                  সব টেস্ট দেখুন
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer color="bg-green-900" />
    </div>
  );
};

export default OcdTest;
