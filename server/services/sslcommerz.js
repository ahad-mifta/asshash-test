import { createRequire } from "module";
import { config } from "../config.js";

const require = createRequire(import.meta.url);

function createClient() {
  const { sslcommerzStoreId, sslcommerzStorePassword, sslcommerzIsLive } =
    config;
  if (!sslcommerzStoreId || !sslcommerzStorePassword) {
    throw new Error(
      "SSLCommerz credentials not configured. Set SSLCOMMERZ_STORE_ID and SSLCOMMERZ_STORE_PASSWORD in .env"
    );
  }
  const SSLCommerzPayment = require("sslcommerz-lts");
  return new SSLCommerzPayment(
    sslcommerzStoreId,
    sslcommerzStorePassword,
    sslcommerzIsLive
  );
}

/**
 * Initialise a hosted-payment session.
 * @param {object} payload  – SSLCommerz init payload (see docs)
 * @returns {Promise<object>} – Response containing GatewayPageURL etc.
 */
export async function initiateHostedPayment(payload) {
  const client = createClient();
  return client.init(payload);
}

/**
 * Validate a payment by val_id (returned in the SSLCommerz callback).
 * @param {string} valId
 * @returns {Promise<object>}
 */
export async function validateHostedPayment(valId) {
  const client = createClient();
  return client.validate({ val_id: valId });
}
