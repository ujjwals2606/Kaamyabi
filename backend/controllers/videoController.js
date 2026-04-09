const Video = require("../models/Video");

// ================= GET =================
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ _id: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos" });
  }
};

// ================= ADD =================
exports.addVideo = async (req, res) => {
  try {
    const { title, url, thumbnail, topic } = req.body;

    const video = await Video.create({
      title,
      url,
      thumbnail,
      topic,
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: "Error adding video" });
  }
};

// ================= DELETE =================
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
  }
};

// ================= UPDATE (🔥 NEW) =================
exports.updateVideo = async (req, res) => {
  try {
    const updated = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};