import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import psychologicalTestsRouter from "./routes/psychologicalTests.js";
import { connectDB } from "./db.js";

dotenv.config();

const app = express();

const env = process?.env || {};

app.use(cors({
  origin: env.CORS_ORIGIN?.split(",").map((s) => s.trim()) || true,
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

// Fail fast if Mongo credentials are wrong
connectDB().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Mongo connection failed:", err);
  process.exit(1);
});

app.use("/api", psychologicalTestsRouter);

const port = env.API_PORT || 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on port ${port}`);
});


