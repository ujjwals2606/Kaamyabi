import UserActivity from "../models/UserActivity.js";
import QuizResult from "../models/QuizResult.js";

// ================= PIE CHART (VIDEO DATA) =================
export const getPieData = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await UserActivity.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$topic",
          totalWatch: { $sum: "$watchTime" },
        },
      },
    ]);

    // ✅ format for chart
    const formatted = data.map((item) => ({
      name: item._id,
      value: item.totalWatch,
    }));

    res.json(formatted);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching pie data" });
  }
};

// ================= LINE CHART (QUIZ DATA) =================
export const getLineData = async (req, res) => {
  try {
    const userId = req.user.id;

    const results = await QuizResult.find({ userId })
      .sort({ createdAt: 1 });

    const formatted = results.map((r, index) => ({
      name: `Quiz ${index + 1}`,
      score: r.percentage,
    }));

    res.json(formatted);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching line data" });
  }
};