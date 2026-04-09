import React, { useContext, useState } from "react";
import { userContext } from "../context/globalContext";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";

const Login = () => {
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();

  const [data, setData] = useState({
    mailId: "",
    pwd: "",
  });

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f1f4f8",
  };

  const context = useContext(userContext) || {};
  const { setToken, setUserId, setRole } = context;

  const formData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await loginUser(data);

      const { token, userId, role, name, email } = res.data;

      // ✅ Context update
      setToken && setToken(token);
      setUserId && setUserId(userId);
      setRole && setRole(role);

      // 🔥 LOCAL STORAGE (VERY IMPORTANT)
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      localStorage.setItem(
        "user",
        JSON.stringify({
          role,
          name: name || "User",
          email: email || data.mailId,
        })
      );

      console.log("LOGIN SUCCESS:", { userId, role });

      // ✅ Redirect
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user/dashboard");
      }

    } catch (e) {
      console.log("Login Error:", e);

      if (e.response?.status === 404) {
        setMsg("User not found. Please register.");
      } else if (e.response?.status === 400) {
        setMsg("Invalid password ❌");
      } else {
        setMsg("Login failed ❌ Try again");
      }
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
        padding: "20px",
      }}
    >
      <div
        className="card border-0 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* Top Accent */}
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
                fontSize: "1.8rem",
              }}
            >
              <i className="bi bi-shield-lock-fill"></i>
            </div>

            <h2 className="fw-bold" style={{ color: theme.navy }}>
              Welcome Back
            </h2>

            <p className="text-muted small">
              Login to access your Kaamyabi dashboard
            </p>
          </div>

          <form onSubmit={formHandler}>
            {/* Email */}
            <div className="mb-4">
              <label
                className="form-label small fw-bold text-uppercase"
                style={{ color: theme.navy, letterSpacing: "1px" }}
              >
                Email Address
              </label>

              <input
                type="email"
                name="mailId"
                className="form-control py-2"
                placeholder="name@example.com"
                value={data.mailId}
                onChange={formData}
                required
                style={{
                  borderRadius: "8px",
                  backgroundColor: "#f8f9fa",
                }}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                className="form-label small fw-bold text-uppercase"
                style={{ color: theme.navy, letterSpacing: "1px" }}
              >
                Password
              </label>

              <div className="input-group">
                <input
                  type={showPwd ? "text" : "password"}
                  name="pwd"
                  className="form-control py-2"
                  placeholder="••••••••"
                  value={data.pwd}
                  onChange={formData}
                  required
                  style={{ borderRadius: "8px 0 0 8px" }}
                />

                <span
                  className="input-group-text bg-light"
                  style={{
                    cursor: "pointer",
                    borderRadius: "0 8px 8px 0",
                  }}
                  onClick={() => setShowPwd(!showPwd)}
                >
                  <i
                    className={`bi ${
                      showPwd ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>
            </div>

            {/* Error */}
            {msg && (
              <div className="alert alert-danger text-center py-2">
                {msg}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="btn w-100 py-3 fw-bold"
              disabled={loading}
              style={{
                backgroundColor: theme.navy,
                color: theme.white,
                borderRadius: "10px",
              }}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-muted small">
              Don't have an account?{" "}
              <Link
                to="/user/add"
                className="fw-bold"
                style={{ color: theme.gold }}
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;