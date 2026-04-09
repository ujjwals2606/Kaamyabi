const express = require("express");
const router = express.Router();

const UserActivity = require("../models/UserActivity");

// ================================
// 🎥 VIDEO WATCH TRACKING
// ================================
router.post("/watch", async (req, res) => {
  try {
    const { userId, topic, videoId, watchTime } = req.body;

    if (!userId || !topic || !videoId || !watchTime) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const activity = await UserActivity.create({
      userId,
      topic,
      videoId,
      watchTime,
    });

    res.status(201).json({
      message: "Activity saved",
      data: activity,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving activity" });
  }
});

module.exports = router;