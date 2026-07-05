import { Router } from "express";
import { z } from "zod";

import { connectDB } from "../db.js";
import Submission from "../models/PsychologicalTestSubmission.js";
import { sendPsychologicalTestEmail } from "../services/mailer.js";

const router = Router();

const payloadSchema = z.object({
  user: z.object({
    name: z.string().optional().default(""),
    age: z.string().optional().default(""),
    email: z.string().email(),
    phone: z.string().optional().default(""),
  }),
  testId: z.string().min(1),
  testTitle: z.string().min(1),
  score: z.number(),
  resultTitle: z.string().min(1),
  reportText: z.string().min(1),
  answers: z.array(z.any()).optional().default([]),
});

router.post("/psychological-tests", async (req, res) => {
  try {
    await connectDB();

    const parsed = payloadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        ok: false,
        error: "Invalid payload",
        details: parsed.error.flatten(),
      });
    }

    const payload = parsed.data;

    const submission = await Submission.create({
      user: payload.user,
      testId: payload.testId,
      testTitle: payload.testTitle,
      score: payload.score,
      resultTitle: payload.resultTitle,
      reportText: payload.reportText,
      answers: payload.answers,
      ip:
        req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
        req.socket?.remoteAddress ||
        "",
    });

    const userName = payload.user?.name?.trim() || "User";
    const subject = `Your ${payload.testTitle} report`;

    const text = [
      `Hi ${userName},`,
      "",
      `Here is your psychological test report:`,
      `Test: ${payload.testTitle}`,
      `Result: ${payload.resultTitle}`,
      `Score: ${payload.score}`,
      "",
      "Report:",
      payload.reportText,
      "",
      "Disclaimer: This is a preliminary screening and not a medical diagnosis.",
    ].join("\n");

    await sendPsychologicalTestEmail({
      to: payload.user.email,
      subject,
      text,
    });

    return res.status(201).json({ ok: true, id: submission._id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

export default router;

