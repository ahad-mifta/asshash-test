import nodemailer from "nodemailer";
import { config, assertConfig } from "../config.js";

let transporter;

function getTransporter() {
  if (transporter) return transporter;

  assertConfig();

  transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  return transporter;
}

export async function sendPsychologicalTestEmail({
  to,
  subject,
  text,
}) {
  const t = getTransporter();

  const info = await t.sendMail({
    from: config.emailFrom,
    to,
    subject,
    text,
  });

  return { messageId: info?.messageId };
}

