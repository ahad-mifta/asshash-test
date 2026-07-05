import mongoose from "mongoose";

const PsychologicalTestSubmissionSchema = new mongoose.Schema(
  {
    user: {
      name: { type: String, default: "" },
      age: { type: String, default: "" },
      email: { type: String, required: true },
      phone: { type: String, default: "" },
    },
    testId: { type: String, required: true },
    testTitle: { type: String, required: true },

    score: { type: Number, required: true },
    resultTitle: { type: String, required: true },
    reportText: { type: String, required: true },

    answers: { type: Array, default: [] },

    // Useful for auditing
    ip: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model(
  "PsychologicalTestSubmission",
  PsychologicalTestSubmissionSchema
);

