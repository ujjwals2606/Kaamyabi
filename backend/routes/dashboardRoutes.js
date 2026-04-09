const express = require("express");
const router = express.Router();

const UserActivity = require("../models/UserActivity");
const QuizResult = require("../models/QuizResult");

// ================================
// 📊 PIE CHART DATA (VIDEO)
// ================================
router.get("/pie/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await UserActivity.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$topic",
          totalWatch: { $sum: "$watchTime" },
        },
      },
    ]);

    // ✅ FORMAT FIX
    const formatted = data.map((item) => ({
      name: item._id,
      value: item.totalWatch,
    }));

    res.json(formatted);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching pie data" });
  }
});

// ================================
// 📈 LINE CHART DATA (QUIZ)
// ================================
router.get("/line/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const data = await QuizResult.find({ userId })
      .sort({ createdAt: 1 }); // 🔥 fix (date → createdAt)

    // ✅ FORMAT FIX
    const formatted = data.map((item, index) => ({
      name: `Quiz ${index + 1}`,
      score: item.percentage, // 🔥 important
    }));

    res.json(formatted);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching line data" });
  }
});

module.exports = router;