import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    mutedText: "rgba(255, 255, 255, 0.7)"
  };

  return (
    <footer
      className="text-white"
      style={{
        background: theme.navy,
        borderTop: `4px solid ${theme.gold}`,
        paddingTop: "40px"
      }}
    >
      <div className="container pb-4"> 
        <div className="row g-4">

          {/* Logo & Vision */}
          <div className="col-md-5 mb-3">
            <h4 className="fw-bold mb-3" style={{ letterSpacing: "1px" }}>
              <span style={{ color: theme.gold }}>
                <i className="bi bi-mortarboard-fill me-2"></i>
              </span>
              KAAMYABI
            </h4>
            <p
              className="pe-lg-5"
              style={{
                fontSize: "15px",
                color: theme.mutedText,
                lineHeight: "1.6"
              }}
            >
              A premium learning ecosystem empowering students through AI-driven resources, 
              interactive quizzes, and structured skill-building tutorials.
            </p>
            <div className="d-flex gap-3 mt-3" style={{ fontSize: "1.2rem" }}>
              <i className="bi bi-facebook" style={{ cursor: "pointer", color: theme.gold }}></i>
              <i className="bi bi-twitter-x" style={{ cursor: "pointer", color: theme.gold }}></i>
              <i className="bi bi-linkedin" style={{ cursor: "pointer", color: theme.gold }}></i>
              <i className="bi bi-instagram" style={{ cursor: "pointer", color: theme.gold }}></i>
            </div>
          </div>

          {/* Dynamic Navigation */}
          <div className="col-md-3 mb-3">
            <h6
              className="fw-bold mb-3 text-uppercase"
              style={{
                color: theme.gold,
                fontSize: "14px",
                letterSpacing: "1px"
              }}
            >
              Quick Access
            </h6>
            <ul className="list-unstyled" style={{ fontSize: "15px" }}>
              
              {/* GUEST */}
              {!user && (
                <>
                  <li className="mb-2">
                    <Link to="/" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      Home
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/login" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      Member Login
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/user/add" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      Create Account
                    </Link>
                  </li>
                </>
              )}

              {/* USER LINKS */}
              {user?.role === "user" && (
                <>
                  <li className="mb-2">
                    <Link to="/user/dashboard" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      User Dashboard
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/user/blogs" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      Explore Blogs
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/user/quizzes" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      Take a Quiz
                    </Link>
                  </li>
                </>
              )}

              {/* ADMIN LINKS */}
              {user?.role === "admin" && (
                <>
                  <li className="mb-2">
                    <Link to="/admin" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      Admin Control Panel
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/admin/users" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      User Management
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/admin/blogs" className="text-decoration-none" style={{ color: theme.mutedText }}>
                      Content Strategy
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="col-md-4 mb-3">
            <h6
              className="fw-bold mb-3 text-uppercase"
              style={{
                color: theme.gold,
                fontSize: "14px",
                letterSpacing: "1px"
              }}
            >
              Get In Touch
            </h6>
            <p className="mb-2" style={{ fontSize: "15px", color: theme.mutedText }}>
              <i className="bi bi-envelope-fill me-2" style={{ color: theme.gold }}></i>
              support@kaamyabi.com
            </p>
            <p className="mb-2" style={{ fontSize: "15px", color: theme.mutedText }}>
              <i className="bi bi-geo-alt-fill me-2" style={{ color: theme.gold }}></i>
              Kanpur, Uttar Pradesh, India 🇮🇳
            </p>
            <p className="mt-4 small" style={{ color: theme.gold }}>
              <i className="bi bi-clock-fill me-1"></i>
              Available 24/7 for AI Assistance
            </p>
          </div>

        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "30px 0 20px" }} />

        {/* CENTERED COPYRIGHT */}
        <div className="text-center">
          <p className="mb-0" style={{ fontSize: "14px", color: theme.mutedText }}>
            © {new Date().getFullYear()} <span className="fw-bold">KAAMYABI</span>. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;