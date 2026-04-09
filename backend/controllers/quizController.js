const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");

// ================================
// 📥 GET ALL QUIZZES
// ================================
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    console.error("❌ GET QUIZZES ERROR:", error);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

// ================================
// ➕ ADD NEW QUIZ
// ================================
exports.addQuiz = async (req, res) => {
  try {
    const { title, description, questions, thumbnail } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const quiz = new Quiz({
      title: String(title),
      description: description || "",
      questions: Array.isArray(questions) ? questions : [],
      thumbnail: thumbnail || "",
    });

    const savedQuiz = await quiz.save();

    res.status(201).json(savedQuiz);
  } catch (error) {
    console.error("❌ ADD QUIZ ERROR:", error);
    res.status(500).json({ message: "Error adding quiz" });
  }
};

// ================================
// ✏️ UPDATE QUIZ
// ================================
exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      {
        ...req.body,
        questions: Array.isArray(req.body.questions)
          ? req.body.questions
          : [],
        thumbnail: req.body.thumbnail || "",
      },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(updatedQuiz);
  } catch (error) {
    console.error("❌ UPDATE QUIZ ERROR:", error);
    res.status(500).json({ message: "Error updating quiz" });
  }
};

// ================================
// ❌ DELETE QUIZ
// ================================
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    await Quiz.findByIdAndDelete(id);

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE QUIZ ERROR:", error);
    res.status(500).json({ message: "Error deleting quiz" });
  }
};

// ================================
// 🧠 SUBMIT QUIZ (FINAL FIXED 🔥)
// ================================
exports.submitQuiz = async (req, res) => {
  try {
    const { userId, quizId, score, total } = req.body;

    // 🔥 DEBUG LOG
    console.log("📥 Incoming Quiz Result:", req.body);

    // ✅ STRICT VALIDATION
    if (
      !userId ||
      !quizId ||
      score === undefined ||
      total === undefined
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // ✅ TYPE CONVERSION (IMPORTANT)
    const finalUserId = String(userId);
    const finalQuizId = String(quizId);
    const finalScore = Number(score);
    const finalTotal = Number(total);

    // ❌ INVALID DATA CHECK
    if (isNaN(finalScore) || isNaN(finalTotal)) {
      return res.status(400).json({
        message: "Invalid score or total",
      });
    }

    // ✅ CALCULATE PERCENTAGE
    const percentage =
      finalTotal === 0 ? 0 : (finalScore / finalTotal) * 100;

    // ✅ SAVE TO DB
    const result = await QuizResult.create({
      userId: finalUserId,
      quizId: finalQuizId,
      score: finalScore,
      total: finalTotal,
      percentage: Number(percentage.toFixed(2)),
    });

    console.log("✅ SAVED RESULT:", result);

    res.status(201).json({
      message: "Quiz submitted successfully",
      data: result,
    });
  } catch (error) {
    console.error("❌ SUBMIT QUIZ ERROR:", error);
    res.status(500).json({
      message: "Error saving quiz result",
    });
  }
};