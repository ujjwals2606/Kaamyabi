const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// ================= DB =================
connectDB();

// ================= MIDDLEWARE =================

// ✅ CORS
const allowedOrigins = [
  // "http://localhost:5173",
  "https://kaamyabi.netlify.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Body Parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ Static folder
app.use("/uploads", express.static("uploads"));

// ================= ROUTES =================

// 🔥 IMPORTANT: All base paths are correct
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/pdfs", require("./routes/pdfRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));

// ✅ FIXED QUIZ ROUTE (same rahega)
app.use("/api/quizzes", require("./routes/quizRoutes"));

app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Kaamyabi Backend Running...");
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: "Route not found",
  });
});


// ================= temporary =================
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});


// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    msg: err.message || "Internal Server Error",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});