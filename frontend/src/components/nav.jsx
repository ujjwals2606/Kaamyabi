import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top shadow-sm"
      style={{
        background: theme.white,
        borderBottom: `3px solid ${theme.gold}`, // Professional Gold accent line
        padding: "12px 0",
      }}
    >
      <div className="container">
        {/* LOGO - Matching the image branding */}
        <Link 
          className="navbar-brand fw-bold d-flex align-items-center" 
          to="/" 
          style={{ color: theme.navy, fontSize: "1.5rem", letterSpacing: "1px" }}
        >
          <span style={{ color: theme.gold, marginRight: "8px" }}>
            <i className="bi bi-mortarboard-fill"></i>
          </span>
          KAAMYABI
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* COMMON LINKS BEFORE LOGIN */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-3" style={{ color: theme.navy }} to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-3" style={{ color: theme.navy }} to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-3" style={{ color: theme.navy }} to="/login">Login</Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link 
                    className="btn px-4 fw-bold shadow-sm" 
                    to="/user/add"
                    style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "8px" }}
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}

            {/* ================= USER NAV ================= */}
            {user && user.role === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-3" style={{ color: theme.navy }} to="/user/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle fw-semibold px-3"
                    style={{ color: theme.navy }}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Explore Resources
                  </a>
                  <ul className="dropdown-menu shadow border-0 p-2" style={{ borderRadius: "12px" }}>
                    <li><Link className="dropdown-item py-2" to="/user/blogs">📖 Blogs</Link></li>
                    <li><Link className="dropdown-item py-2" to="/user/tutorials">🎥 Tutorials</Link></li>
                    <li><Link className="dropdown-item py-2" to="/user/videos">🎬 Videos</Link></li>
                    <li><Link className="dropdown-item py-2" to="/user/pdfs">📂 PDFs</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item py-2" to="/user/quizzes">📝 Quizzes</Link></li>
                    <li><Link className="dropdown-item py-2 fw-bold text-primary" to="/user/chatbot">🤖 AI Assistant</Link></li>
                  </ul>
                </li>
              </>
            )}

            {/* ================= ADMIN NAV ================= */}
            {user && user.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-3 text-danger" to="/admin">Admin Panel</Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle fw-semibold px-3"
                    style={{ color: theme.navy }}
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Content Management
                  </a>
                  <ul className="dropdown-menu shadow border-0 p-2" style={{ borderRadius: "12px" }}>
                    <li><Link className="dropdown-item py-2" to="/admin/blogs">Manage Blogs</Link></li>
                    <li><Link className="dropdown-item py-2" to="/admin/videos">Manage Videos</Link></li>
                    <li><Link className="dropdown-item py-2" to="/admin/quizzes">Manage Quizzes</Link></li>
                    <li><Link className="dropdown-item py-2" to="/admin/pdfs">Manage PDFs</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item py-2 text-primary" to="/admin/users">User Database</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fw-semibold px-3" style={{ color: theme.gold }} to="/admin/chatbot">🤖 Admin AI</Link>
                </li>
              </>
            )}

            {/* PROFILE & LOGOUT SECTION */}
            {user && (
              <>
                <li className="nav-item ms-lg-4 border-start ps-lg-3">
                  <Link
                    to="/user/profile"
                    className="fw-bold d-flex align-items-center text-decoration-none"
                    style={{ color: theme.navy }}
                  >
                    <div 
                      className="me-2 d-inline-block text-center" 
                      style={{ width: "35px", height: "35px", backgroundColor: theme.lightBlue || "#f0f4f8", borderRadius: "50%", lineHeight: "35px" }}
                    >
                      👤
                    </div>
                    {user.name || "Member"}
                  </Link>
                </li>
                <li className="nav-item ms-lg-3">
                  <button
                    className="btn btn-sm px-3 fw-bold"
                    onClick={handleLogout}
                    style={{ border: `2px solid ${theme.navy}`, color: theme.navy, borderRadius: "6px" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;