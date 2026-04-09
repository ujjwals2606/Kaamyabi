const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: String,
  topic: String,
  videoId: String,
  watchTime: Number,
  date: { type: Date, default: Date.now },
});

// 🔥 overwrite error se bachne ke liye
module.exports =
  mongoose.models.UserActivity ||
  mongoose.model("UserActivity", userActivitySchema);