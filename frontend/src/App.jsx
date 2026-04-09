import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Nav from "./components/nav";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/footer"; // ✅ ADD

// Pages
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Add from "./pages/add";

// User Pages
import Blogs from "./pages/blogs";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Tutorials from "./pages/tutorials";
import PDFs from "./pages/pdf";
import Quizzes from "./pages/quizzes";
import Chatbot from "./pages/chatbot";
import Videos from "./pages/videos";

// Admin Pages
import Admin from "./pages/admin";
import AdminVideos from "./pages/adminVideos";
import AdminUsers from "./pages/adminUsers";
import AdminQuizzes from "./pages/adminQuizzes";
import AdminPdfs from "./pages/adminPdfs";
import AdminBlogs from "./pages/adminBlogs";
import AdminChatbot from "./pages/adminChatbot";

// 🔥 Wrapper for Footer Logic
const AppContent = () => {
  const location = useLocation();

  // ❌ Hide footer on these routes
  const hideFooterRoutes = ["/", "/about"];

  return (
    <>
      <Nav />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/add" element={<Add />} />

        {/* USER ROUTES */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/pdfs"
          element={
            <ProtectedRoute>
              <PDFs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/quizzes"
          element={
            <ProtectedRoute>
              <Quizzes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/tutorials"
          element={
            <ProtectedRoute>
              <Tutorials />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/videos"
          element={
            <ProtectedRoute>
              <Videos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/videos"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminVideos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/quizzes"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminQuizzes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pdfs"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPdfs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminBlogs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/chatbot"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminChatbot />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* ✅ Footer (only change) */}
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

// Main App
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;