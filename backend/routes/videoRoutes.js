const express = require("express");
const router = express.Router();

const {
  getVideos,
  addVideo,
  deleteVideo,
  updateVideo,
} = require("../controllers/videoController");

router.get("/", getVideos);
router.post("/", addVideo);
router.delete("/:id", deleteVideo);

// 🔥 NEW
router.put("/:id", updateVideo);

module.exports = router;