const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: String,
    description: String,

    thumbnail: {
      type: String,
      default: "",
    },

    questions: {
      type: Array,
      default: [], // 🔥 VERY IMPORTANT
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);