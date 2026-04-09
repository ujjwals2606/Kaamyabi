const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    userId: String,
    quizId: String,
    score: Number,
    total: Number,
    percentage: Number,
  },
  {
    timestamps: true, // 🔥 createdAt & updatedAt auto add
  }
);

// 🔥 IMPORTANT FIX
module.exports =
  mongoose.models.QuizResult ||
  mongoose.model("QuizResult", quizResultSchema);