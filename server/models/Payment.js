import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    sessionKey: { type: String, default: null },
    gatewayPageUrl: { type: String, default: null },
    testId: { type: String, default: null },
    testTitle: { type: String, default: null },
    amount: { type: Number, required: true },
    currency: { type: String, default: "BDT" },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Cancelled"],
      default: "Pending",
    },
    validationId: { type: String, default: null },
    paymentMethod: { type: String, default: null },
    gatewayResponse: { type: String, default: null }, // JSON-stringified
    failureReason: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
