import axios from "axios";

// ================= BASE CONFIG =================
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ================= TOKEN INTERCEPTOR =================
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ================= COMMON ERROR HANDLER =================
const handleError = (error) => {
  console.error("🔥 FRONTEND ERROR:");

  if (error.response) {
    console.log("👉 DATA:", error.response.data);
    console.log("👉 STATUS:", error.response.status);
  } else {
    console.log("👉 ERROR:", error.message);
  }

  throw error;
};

// ================= AUTH =================
export const loginUser = async (data) => {
  try {
    return await API.post("/auth/login", data);
  } catch (err) {
    handleError(err);
  }
};

export const registerUser = async (data) => {
  try {
    return await API.post("/auth/register", data);
  } catch (err) {
    handleError(err);
  }
};

// ================= 🔥 ADMIN USERS =================

// ✅ GET ALL USERS
export const getUsers = async () => {
  try {
    return await API.get("/auth/users");
  } catch (err) {
    handleError(err);
  }
};

// ✅ DELETE USER
export const deleteUser = async (id) => {
  try {
    return await API.delete(`/auth/users/${id}`);
  } catch (err) {
    handleError(err);
  }
};

// ================= BLOGS =================
export const getBlogs = async () => {
  try {
    return await API.get("/blogs");
  } catch (err) {
    handleError(err);
  }
};

export const addBlog = async (data) => {
  try {
    return await API.post("/blogs", data);
  } catch (err) {
    handleError(err);
  }
};

export const deleteBlog = async (id) => {
  try {
    return await API.delete(`/blogs/${id}`);
  } catch (err) {
    handleError(err);
  }
};

// ================= PDF =================
export const getPdfs = async () => {
  try {
    return await API.get("/pdfs");
  } catch (err) {
    handleError(err);
  }
};

export const addPdf = async (data) => {
  try {
    return await API.post("/pdfs", data);
  } catch (err) {
    handleError(err);
  }
};

export const deletePdf = async (id) => {
  try {
    return await API.delete(`/pdfs/${id}`);
  } catch (err) {
    handleError(err);
  }
};

// ================= QUIZZES =================
export const getQuizzes = async () => {
  try {
    return await API.get("/quizzes");
  } catch (err) {
    handleError(err);
  }
};

export const addQuiz = async (data) => {
  try {
    return await API.post("/quizzes", data);
  } catch (err) {
    handleError(err);
  }
};

export const updateQuiz = async (id, data) => {
  try {
    return await API.put(`/quizzes/${id}`, data);
  } catch (err) {
    handleError(err);
  }
};

export const deleteQuiz = async (id) => {
  try {
    return await API.delete(`/quizzes/${id}`);
  } catch (err) {
    handleError(err);
  }
};

// 🔥 SUBMIT QUIZ
export const submitQuiz = async (data) => {
  try {
    return await API.post("/quizzes/submit", data);
  } catch (err) {
    handleError(err);
  }
};

// ================= VIDEOS =================
export const getVideos = async () => {
  try {
    return await API.get("/videos");
  } catch (err) {
    handleError(err);
  }
};

export const addVideo = async (data) => {
  try {
    return await API.post("/videos", data);
  } catch (err) {
    handleError(err);
  }
};

export const deleteVideo = async (id) => {
  try {
    return await API.delete(`/videos/${id}`);
  } catch (err) {
    handleError(err);
  }
};

// 🔥 UPDATE VIDEO
export const updateVideo = async (id, data) => {
  try {
    return await API.put(`/videos/${id}`, data);
  } catch (err) {
    handleError(err);
  }
};

// 🔥 VIDEO WATCH TRACKING
export const trackVideoWatch = async (data) => {
  try {
    return await API.post("/activity/watch", data);
  } catch (err) {
    handleError(err);
  }
};

// ================= DASHBOARD =================

// 🔥 PIE DATA
export const getPieData = async (userId) => {
  try {
    return await API.get(`/dashboard/pie/${userId}`);
  } catch (err) {
    handleError(err);
  }
};

// 🔥 LINE DATA
export const getLineData = async (userId) => {
  try {
    return await API.get(`/dashboard/line/${userId}`);
  } catch (err) {
    handleError(err);
  }
};

// ================= AI =================
export const chatAI = async (message) => {
  try {
    const res = await API.post("/ai/chat", { message });
    return res.data.reply;
  } catch (err) {
    handleError(err);
  }
};