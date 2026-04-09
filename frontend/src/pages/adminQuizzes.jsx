import React, { useEffect, useState } from "react";
import {
  getQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
} from "../api/api";

const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [quizForm, setQuizForm] = useState({ title: "", description: "", thumbnail: "" });
  const [question, setQuestion] = useState({ question: "", options: ["", "", "", ""], answer: "" });
  const [questions, setQuestions] = useState([]);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f4f7fe",
    success: "#198754"
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await getQuizzes();
      setQuizzes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuizChange = (e) => {
    setQuizForm({ ...quizForm, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e, index) => {
    if (e.target.name === "option") {
      const updated = [...question.options];
      updated[index] = e.target.value;
      setQuestion({ ...question, options: updated });
    } else {
      setQuestion({ ...question, [e.target.name]: e.target.value });
    }
  };

  const addQuestionHandler = () => {
    if (!question.question || !question.answer) {
      alert("Question & answer required ❗");
      return;
    }
    setQuestions([...questions, question]);
    setQuestion({ question: "", options: ["", "", "", ""], answer: "" });
  };

  const editQuizHandler = (quiz) => {
    setEditingId(quiz._id);
    setQuizForm({ title: quiz.title, description: quiz.description, thumbnail: quiz.thumbnail || "" });
    setQuestions(quiz.questions || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveQuizHandler = async () => {
    if (!quizForm.title || questions.length === 0) {
      alert("Quiz title & questions required ❗");
      return;
    }
    const data = { ...quizForm, questions, thumbnail: quizForm.thumbnail || DEFAULT_IMG };
    try {
      if (editingId) {
        await updateQuiz(editingId, data);
      } else {
        await addQuiz(data);
      }
      fetchQuizzes();
      setQuizForm({ title: "", description: "", thumbnail: "" });
      setQuestions([]);
      setEditingId(null);
      alert("Quiz Saved Successfully ✅");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteQuizHandler = async (id) => {
    if (!window.confirm("Delete this quiz forever?")) return;
    await deleteQuiz(id);
    fetchQuizzes();
  };

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: theme.lightGray, minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="fw-bold" style={{ color: theme.navy }}>
          Assessment <span style={{ color: theme.gold }}>Builder</span> 🧠
        </h2>
        <div className="badge bg-white shadow-sm p-3 rounded-pill text-dark border">
          <i className="bi bi-database-fill-gear me-2"></i> Total Quizzes: {quizzes.length}
        </div>
      </div>

      <div className="row g-4">
        {/* LEFT COLUMN: QUIZ CONFIGURATION */}
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4 mb-4" style={{ borderRadius: "20px" }}>
            <h5 className="fw-bold mb-4" style={{ color: theme.navy }}>
              {editingId ? "Edit Quiz Meta" : "1. Setup Quiz Details"}
            </h5>
            
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">QUIZ TITLE</label>
              <input type="text" name="title" className="form-control" style={{ borderRadius: "10px" }} value={quizForm.title} onChange={handleQuizChange} />
            </div>

            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">DESCRIPTION</label>
              <textarea name="description" className="form-control" rows="2" style={{ borderRadius: "10px" }} value={quizForm.description} onChange={handleQuizChange} />
            </div>

            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">THUMBNAIL IMAGE URL</label>
              <input type="text" name="thumbnail" className="form-control" style={{ borderRadius: "10px" }} value={quizForm.thumbnail} onChange={handleQuizChange} />
            </div>

            <div className="mb-4 text-center border rounded-3 overflow-hidden bg-light">
              <img src={quizForm.thumbnail || DEFAULT_IMG} alt="preview" style={{ width: "100%", height: "150px", objectFit: "cover" }} onError={(e) => (e.target.src = DEFAULT_IMG)} />
            </div>

            <button className="btn btn-lg w-100 py-2 fw-bold" style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "12px" }} onClick={saveQuizHandler}>
              {editingId ? "Update Quiz Database" : "Finalize & Publish Quiz"}
            </button>
          </div>

          {/* ADD QUESTION SUB-CARD */}
          <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "20px", borderLeft: `5px solid ${theme.gold}` }}>
            <h5 className="fw-bold mb-4" style={{ color: theme.navy }}>2. Add Questions</h5>
            <input type="text" name="question" placeholder="Enter Question Statement" className="form-control mb-3" style={{ borderRadius: "10px" }} value={question.question} onChange={handleQuestionChange} />
            
            <div className="row g-2 mb-3">
              {question.options.map((opt, i) => (
                <div key={i} className="col-6">
                  <input type="text" name="option" placeholder={`Opt ${i + 1}`} className="form-control" style={{ borderRadius: "10px", fontSize: "0.85rem" }} value={opt} onChange={(e) => handleQuestionChange(e, i)} />
                </div>
              ))}
            </div>

            <div className="mb-4">
               <label className="small fw-bold text-success mb-1">CORRECT ANSWER</label>
               <input type="text" name="answer" placeholder="Match precisely with one option" className="form-control border-success" style={{ borderRadius: "10px" }} value={question.answer} onChange={handleQuestionChange} />
            </div>

            <button className="btn btn-outline-primary w-100 py-2 fw-bold" style={{ borderRadius: "12px" }} onClick={addQuestionHandler}>
              <i className="bi bi-plus-circle me-2"></i> Append Question
            </button>
            <p className="text-center mt-3 small text-muted">Questions Ready to Save: <span className="fw-bold text-dark">{questions.length}</span></p>
          </div>
        </div>

        {/* RIGHT COLUMN: REPOSITORY LIST */}
        <div className="col-lg-7">
          <div className="row g-3">
            {quizzes.length === 0 ? (
              <div className="text-center py-5 w-100 card border-0 shadow-sm rounded-4">
                <p className="text-muted mb-0">No quizzes available in repository.</p>
              </div>
            ) : (
              quizzes.map((quiz) => (
                <div key={quiz._id} className="col-md-6">
                  <div className="card border-0 shadow-sm h-100 p-3" style={{ borderRadius: "18px", transition: "0.3s" }}>
                    <div className="position-relative overflow-hidden rounded-3 mb-3">
                      <img src={quiz.thumbnail || DEFAULT_IMG} alt="quiz" style={{ height: "140px", width: "100%", objectFit: "cover" }} onError={(e) => (e.target.src = DEFAULT_IMG)} />
                      <span className="position-absolute top-0 end-0 m-2 badge bg-dark opacity-75">
                         {quiz.questions?.length || 0} Qs
                      </span>
                    </div>
                    <h6 className="fw-bold mb-1" style={{ color: theme.navy }}>{quiz.title}</h6>
                    <p className="small text-muted mb-3 text-truncate">{quiz.description}</p>
                    <div className="d-flex gap-2 mt-auto">
                      <button className="btn btn-sm w-100 py-2 fw-bold" style={{ backgroundColor: theme.gold, color: theme.navy, borderRadius: "8px" }} onClick={() => editQuizHandler(quiz)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger w-100 py-2" style={{ borderRadius: "8px" }} onClick={() => deleteQuizHandler(quiz._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuizzes;