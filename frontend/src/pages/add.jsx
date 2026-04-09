import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api"; 

const Add = () => {
  const [data, setData] = useState({
    unm: "",
    mailID: "",
    pwd: "",
  });

  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f1f4f8"
  };

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      await registerUser(data); 
      setMsg("Registration successful ✅ Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.log("Register Error:", err);
      setMsg(err.response?.data?.msg || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ 
        minHeight: "100vh", 
        background: `linear-gradient(135deg, ${theme.navy} 0%, #112240 100%)`,
        padding: "20px"
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{ 
          width: "100%", 
          maxWidth: "450px", 
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        {/* Top Accent Bar */}
        <div style={{ height: "6px", backgroundColor: theme.gold }}></div>

        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{ 
                width: "60px", 
                height: "60px", 
                backgroundColor: theme.lightGray, 
                borderRadius: "15px",
                color: theme.navy,
                fontSize: "1.8rem"
              }}
            >
              <i className="bi bi-person-plus-fill"></i>
            </div>
            <h2 className="fw-bold" style={{ color: theme.navy }}>Join Kaamyabi</h2>
            <p className="text-muted small">Create your account to start learning</p>
          </div>

          <form onSubmit={formHandler}>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{ color: theme.navy, letterSpacing: "1px" }}>
                Full Name
              </label>
              <input
                type="text"
                name="unm"
                className="form-control py-2"
                placeholder="John Doe"
                style={{ borderRadius: "8px", backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}
                value={data.unm}
                onChange={inputHandler}
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{ color: theme.navy, letterSpacing: "1px" }}>
                Email Address
              </label>
              <input
                type="email"
                name="mailID"
                className="form-control py-2"
                placeholder="name@example.com"
                style={{ borderRadius: "8px", backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}
                value={data.mailID}
                onChange={inputHandler}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: theme.navy, letterSpacing: "1px" }}>
                Password
              </label>
              <input
                type="password"
                name="pwd"
                className="form-control py-2"
                placeholder="Create a strong password"
                style={{ borderRadius: "8px", backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}
                value={data.pwd}
                onChange={inputHandler}
                required
              />
            </div>

            {/* Status Message */}
            {msg && (
              <div className={`alert ${msg.includes('successful') ? 'alert-success' : 'alert-danger'} py-2 small border-0 text-center mb-4`} style={{ borderRadius: "8px" }}>
                {msg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-100 py-3 fw-bold shadow-sm mb-3"
              disabled={loading}
              style={{ 
                backgroundColor: theme.navy, 
                color: theme.white, 
                borderRadius: "10px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#1d2d44"}
              onMouseLeave={(e) => e.target.style.backgroundColor = theme.navy}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : "Create Account"}
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center mt-3">
            <p className="text-muted small mb-0">
              Already have an account?{" "}
              <Link to="/login" className="fw-bold text-decoration-none" style={{ color: theme.gold }}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;