import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Global colors matching the generated image
  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    lightBlue: "#e6f1ff",
    white: "#ffffff",
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section
        className="d-flex align-items-center text-white"
        style={{
          position: "relative",
          minHeight: "85vh",
          background: `linear-gradient(135deg, ${theme.navy} 0%, #112240 100%)`,
          overflow: "hidden",
          paddingTop: "60px"
        }}
      >
        {/* Background Decorative Element (Abstract Path/Compass vibe) */}
        <div
          style={{
            position: "absolute",
            right: "-5%",
            top: "10%",
            width: "50%",
            height: "80%",
            background: "radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%)",
            zIndex: "0",
          }}
        ></div>

        <div className="container" style={{ zIndex: "1" }}>
          <div className="row align-items-center">
            <div className="col-lg-7 text-start">
              <h1 className="display-3 fw-bold mb-3" style={{ letterSpacing: "-1px" }}>
                Welcome to <span style={{ color: theme.gold }}>KAAMYABI</span>
              </h1>
              <p className="lead mb-4 shadow-sm" style={{ opacity: "0.9", fontSize: "1.25rem", maxWidth: "600px" }}>
                Empowering Your Journey to Success through Comprehensive Learning & Development. 
                Explore tutorials, track progress, and master new skills.
              </p>
              <div className="d-flex gap-3">
                <Link 
                  to="/user/add" 
                  className="btn btn-lg px-4 py-3 shadow-lg fw-bold"
                  style={{ backgroundColor: theme.gold, color: theme.navy, border: "none", borderRadius: "8px" }}
                >
                   Explore Now
                </Link>
                <Link 
                  to="/user/dashboard" 
                  className="btn btn-outline-light btn-lg px-4 py-3 fw-bold"
                  style={{ borderRadius: "8px" }}
                >
                  Dashboard
                </Link>
              </div>
            </div>
            
            {/* Right Side Visual (Optional: Represents the Compass/Path from image) */}
            <div className="col-lg-5 d-none d-lg-block text-center">
               <div style={{ 
                 fontSize: "15rem", 
                 opacity: "0.2", 
                 transform: "rotate(15deg)",
                 filter: "drop-shadow(0 0 20px rgba(197, 160, 89, 0.5))" 
               }}>
                 🧭
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-5" style={{ backgroundColor: "#f8f9fa", marginTop: "-50px" }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              { title: "Blogs", icon: "📖", link: "/user/blogs", desc: "Insightful articles for growth" },
              { title: "Tutorials", icon: "🎥", link: "/user/tutorial", desc: "Step-by-step masterclasses" },
              { title: "Quizzes", icon: "📝", link: "/user/quizzes", desc: "Interactive self-assessment" },
              { title: "PDF Resources", icon: "📂", link: "/user/pdfs", desc: "Expert-curated study material" },
              { title: "Video Library", icon: "🎬", link: "/user/videos", desc: "Visual learning at your pace" },
              { title: "AI Chatbot", icon: "🤖", link: "/user/chatbot", desc: "24/7 Smart learning assistant" },
            ].map((item, index) => (
              <div className="col-md-4 col-sm-6" key={index}>
                <Link to={item.link} className="text-decoration-none h-100 d-block">
                  <div
                    className="card h-100 border-0 shadow-sm p-4 text-center"
                    style={{
                      borderRadius: "15px",
                      transition: "all 0.3s ease",
                      backgroundColor: theme.white,
                      borderBottom: `4px solid transparent`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
                      e.currentTarget.style.borderBottom = `4px solid ${theme.gold}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0px)";
                      e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
                      e.currentTarget.style.borderBottom = `4px solid transparent`;
                    }}
                  >
                    <div className="mb-3" style={{ fontSize: "2.5rem" }}>{item.icon}</div>
                    <h5 className="fw-bold" style={{ color: theme.navy }}>{item.title}</h5>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION / PROGRESS SECTION --- */}
      <section className="py-5 text-center" style={{ backgroundColor: theme.navy }}>
        <div className="container py-4">
          <h2 className="display-6 fw-bold text-white mb-4">
            Ready to Accelerate Your <span style={{ color: theme.gold }}>Success</span>?
          </h2>
          <p className="text-white-50 mb-5 mx-auto" style={{ maxWidth: "600px" }}>
            Join thousands of learners and start tracking your personalized progress today.
          </p>
          <Link
            to="/user/add"
            className="btn btn-outline-warning btn-lg px-5"
            style={{ borderColor: theme.gold, color: theme.gold, borderRadius: "50px" }}
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;