import mongoose from "mongoose";

const aiTriageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    result: {
      condition_category: String,
      urgency_level: String,
      recommended_consultation_type: String,
      possible_conditions: [String],
      risk_score: Number,
      explanation: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AITriage", aiTriageSchema);
