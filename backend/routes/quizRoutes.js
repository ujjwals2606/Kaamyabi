const express = require("express");
const router = express.Router();

const {
  getQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require("../controllers/quizController");

// ✅ BASE PATH already /api/quizzes hai

router.get("/", getQuizzes);          // /api/quizzes
router.post("/", addQuiz);            // /api/quizzes
router.put("/:id", updateQuiz);       // /api/quizzes/:id
router.delete("/:id", deleteQuiz);    // /api/quizzes/:id
router.post("/submit", submitQuiz);   // /api/quizzes/submit

module.exports = router;