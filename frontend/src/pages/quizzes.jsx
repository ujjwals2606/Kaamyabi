import React, { useEffect, useState } from "react";
import { getQuizzes, submitQuiz } from "../api/api";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [finished, setFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f8f9fa",
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await getQuizzes();
      setQuizzes(res.data || []);
    } catch (err) {
      console.log("❌ Fetch Quiz Error:", err);
    }
  };

  const handleAnswer = (option) => {
    if (!selectedQuiz) return;
    setSelectedOption(option);

    setTimeout(async () => {
      const isCorrect = option === selectedQuiz.questions[qIndex].answer;
      const newScore = isCorrect ? score + 1 : score;

      if (qIndex + 1 < selectedQuiz.questions.length) {
        setScore(newScore);
        setQIndex(qIndex + 1);
        setSelectedOption(null);
      } else {
        setScore(newScore);
        setFinished(true);

        if (!isSubmitting) {
          setIsSubmitting(true);
          try {
            const userId = localStorage.getItem("userId");
            if (userId) {
              await submitQuiz({
                userId: String(userId),
                quizId: String(selectedQuiz._id),
                score: Number(newScore),
                total: Number(selectedQuiz.questions.length),
              });
            }
          } catch (err) {
            console.log("❌ Error saving result:", err);
          } finally {
            setIsSubmitting(false);
          }
        }
      }
    }, 600);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setQIndex(0);
    setScore(0);
    setFinished(false);
    setSelectedOption(null);
    setIsSubmitting(false);
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-2" style={{ color: theme.navy }}>
            Assessment <span style={{ color: theme.gold }}>Zone</span> 🧠
          </h2>
          <p className="text-muted">Challenge yourself and track your academic progress</p>
        </div>

        {/* ================= QUIZ LIST ================= */}
        {!selectedQuiz ? (
          <div className="row g-4">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="col-md-4 col-lg-3">
                <div
                  className="card border-0 shadow-sm text-center p-4 h-100"
                  style={{ borderRadius: "20px", transition: "0.3s" }}
                >
                  
                  {/* 🔥 UPDATED IMAGE SECTION */}
                  <div
  className="mb-3 mx-auto d-flex align-items-center justify-content-center"
  style={{
    width: "120px",   // 👈 bigger circle
    height: "120px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    border: "2px solid #f1f1f1",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
  }}
>
  <img
    src={quiz.thumbnail || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
    alt={quiz.title}
    style={{
      width: "90px",   // 👈 increased
      height: "90px",
      objectFit: "contain"
    }}
  />
</div>

                  <h6 className="fw-bold mb-3" style={{ color: theme.navy }}>
                    {quiz.title}
                  </h6>

                  <button
                    className="btn fw-bold w-100 mt-auto"
                    style={{
                      backgroundColor: theme.navy,
                      color: theme.white,
                      borderRadius: "10px"
                    }}
                    onClick={() => setSelectedQuiz(quiz)}
                  >
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              {!finished ? (
                <div className="card border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: "25px" }}>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="badge px-3 py-2" style={{ backgroundColor: theme.gold, color: theme.navy }}>
                      Question {qIndex + 1} of {selectedQuiz.questions.length}
                    </span>
                    <button className="btn btn-sm btn-outline-danger border-0 fw-bold" onClick={resetQuiz}>
                      Exit
                    </button>
                  </div>

                  <div className="progress mb-4" style={{ height: "8px", backgroundColor: "#eee" }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${((qIndex + 1) / selectedQuiz.questions.length) * 100}%`,
                        backgroundColor: theme.navy,
                        transition: "0.5s"
                      }}
                    />
                  </div>

                  <h4 className="fw-bold mb-4" style={{ color: theme.navy }}>
                    {selectedQuiz.questions[qIndex]?.question}
                  </h4>

                  <div className="d-grid gap-3">
                    {(selectedQuiz.questions[qIndex]?.options || []).map((opt, i) => (
                      <button
                        key={i}
                        className="btn py-3 px-4 text-start fw-semibold shadow-sm"
                        style={{
                          borderRadius: "12px",
                          border: "2px solid #f0f0f0",
                          backgroundColor:
                            selectedOption === opt
                              ? opt === selectedQuiz.questions[qIndex].answer
                                ? "#d1e7dd"
                                : "#f8d7da"
                              : theme.white,
                          color: theme.navy
                        }}
                        onClick={() => handleAnswer(opt)}
                        disabled={selectedOption !== null}
                      >
                        <span className="me-3 opacity-50">
                          {String.fromCharCode(65 + i)}.
                        </span>{" "}
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="card border-0 shadow-lg p-5 text-center" style={{ borderRadius: "25px" }}>
                  <div className="display-1 mb-3">
                    {score >= selectedQuiz.questions.length / 2 ? "🎉" : "💪"}
                  </div>

                  <h2 className="fw-bold mb-2">Quiz Results</h2>
                  <p className="text-muted mb-4">
                    You've completed the {selectedQuiz.title} assessment.
                  </p>

                  <h1 className="fw-bold mb-4" style={{ color: theme.navy }}>
                    {score}/{selectedQuiz.questions.length}
                  </h1>

                  <button
                    className="btn btn-lg w-100 py-3 fw-bold"
                    style={{
                      backgroundColor: theme.navy,
                      color: theme.white,
                      borderRadius: "15px"
                    }}
                    onClick={resetQuiz}
                  >
                    Continue Learning
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;