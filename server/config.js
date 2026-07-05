import dotenv from "dotenv";

dotenv.config();

const env = process?.env || {};

export const config = {
  mongodbUri: env.MONGODB_URI,
  apiPort: env.API_PORT || 5000,
  corsOrigin: env.CORS_ORIGIN || "*",
  smtpHost: env.SMTP_HOST,
  smtpPort: env.SMTP_PORT ? Number(env.SMTP_PORT) : 587,
  smtpUser: env.SMTP_USER,
  smtpPass: env.SMTP_PASS,
  emailFrom: env.EMAIL_FROM,
};

export function assertConfig() {
  const missing = [];
  if (!config.mongodbUri) missing.push("MONGODB_URI");
  if (!config.smtpHost) missing.push("SMTP_HOST");
  if (!config.smtpPort) missing.push("SMTP_PORT");
  if (!config.smtpUser) missing.push("SMTP_USER");
  if (!config.smtpPass) missing.push("SMTP_PASS");
  if (!config.emailFrom) missing.push("EMAIL_FROM");

  if (missing.length) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}

