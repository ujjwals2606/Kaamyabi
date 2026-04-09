import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f8f9fa"
  };

  return (
    <div className="text-dark" style={{ backgroundColor: theme.white }}>

      {/* --- HERO SECTION --- */}
      <section
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{
          position: "relative",
          minHeight: "50vh",
          background: `linear-gradient(135deg, ${theme.navy} 0%, #112240 100%)`,
          overflow: "hidden"
        }}
      >
        {/* Subtle Decorative Circle */}
        <div style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "400px",
          height: "400px",
          background: "rgba(197, 160, 89, 0.05)",
          borderRadius: "50%",
          zIndex: 0
        }}></div>

        <div className="container" style={{ zIndex: 2 }}>
          <h1 className="display-3 fw-bold mb-3">
            About <span style={{ color: theme.gold }}>KAAMYABI</span>
          </h1>
          <p className="lead mx-auto mb-0" style={{ maxWidth: "800px", opacity: 0.9 }}>
            Empowering the next generation of learners through a unified, 
            AI-driven ecosystem designed for academic excellence.
          </p>
        </div>
      </section>

      {/* --- MISSION & VISION (Side by Side) --- */}
      <section className="container py-5 mt-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-6">
            <div className="p-4 p-lg-5 shadow-sm rounded-4" style={{ backgroundColor: theme.lightGray, borderLeft: `5px solid ${theme.gold}` }}>
              <h2 className="fw-bold mb-3" style={{ color: theme.navy }}>Our Mission</h2>
              <p className="text-muted mb-0" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                At <strong>Kaamyabi</strong>, our mission is to simplify the learning curve. 
                We bring together disparate resources—blogs, tutorials, and AI-powered tools—into 
                one cohesive platform to ensure every student has the roadmap to success.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-4 p-lg-5 shadow-sm rounded-4" style={{ backgroundColor: theme.navy, color: theme.white }}>
              <h2 className="fw-bold mb-3" style={{ color: theme.gold }}>Our Vision 🌟</h2>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", opacity: 0.9 }}>
                We envision a future where high-quality education is not a privilege but a standard. 
                By leveraging AI, we aim to make learning smarter, personalized, and universally 
                accessible for everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE PILLARS (Offerings) --- */}
      <section className="py-5" style={{ backgroundColor: "#fdfdfd" }}>
        <div className="container text-center py-4">
          <h2 className="fw-bold mb-2" style={{ color: theme.navy }}>The Kaamyabi Ecosystem</h2>
          <div className="mx-auto mb-5" style={{ width: "60px", height: "4px", backgroundColor: theme.gold }}></div>

          <div className="row g-4">
            {[
              { title: "Skill Blogs", icon: "📖", desc: "Expert insights on modern tech and career growth." },
              { title: "Structured Tutorials", icon: "🎥", desc: "Curated learning paths for deep understanding." },
              { title: "Smart Quizzes", icon: "📝", desc: "Real-time assessments to validate your knowledge." },
              { title: "Digital Resources", icon: "📂", desc: "Downloadable PDFs and essential study guides." },
              { title: "Video Content", icon: "🎬", desc: "High-quality visual learning at your fingertips." },
              { title: "AI Learning Assistant", icon: "🤖", desc: "24/7 intelligent support for your queries." },
            ].map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div
                  className="card border-0 shadow-sm p-4 h-100"
                  style={{ borderRadius: "15px", transition: "0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)")}
                >
                  <div className="mb-3" style={{ fontSize: "2.5rem" }}>{item.icon}</div>
                  <h5 className="fw-bold" style={{ color: theme.navy }}>{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LEADERSHIP --- */}
      <section className="py-5 bg-white">
  <div className="container text-center">
    <h2 className="fw-bold mb-5" style={{ color: theme.navy }}>
      Our Leadership
    </h2>

    <div className="row justify-content-center">

      {/* Tuba Fatima */}
      <div className="col-md-5 col-lg-4">
        <div
          className="card border-0 shadow p-4"
          style={{ borderRadius: "20px" }}
        >
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#f0f4f8",
              borderRadius: "50%",
              fontSize: "3rem",
            }}
          >
            👤
          </div>

          <h5 className="fw-bold mb-1">Tuba Fatima</h5>

          <p
            className="text-uppercase fw-bold small mb-3"
            style={{ color: theme.gold, letterSpacing: "1px" }}
          >
            Founder & Lead Architect
          </p>

          <p className="text-muted" style={{ fontSize: "0.95rem" }}>
            Passionate about building AI-driven education platforms and
            pioneering digital-first learning experiences.
          </p>
        </div>
      </div>

      {/* Ujjwal Singh */}
      <div className="col-md-5 col-lg-4">
        <div
          className="card border-0 shadow p-4"
          style={{ borderRadius: "20px" }}
        >
          <div
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#f0f4f8",
              borderRadius: "50%",
              fontSize: "3rem",
            }}
          >
            👨‍💻
          </div>

          <h5 className="fw-bold mb-1">Ujjwal Singh</h5>

          <p
            className="text-uppercase fw-bold small mb-3"
            style={{ color: theme.gold, letterSpacing: "1px" }}
          >
            Co-Founder & Technical Lead
          </p>

          <p className="text-muted" style={{ fontSize: "0.95rem" }}>
            Focused on building robust backend systems and managing core
            technical architecture for scalable applications.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* --- FINAL CALL TO ACTION --- */}
      <section
        className="text-center text-white py-5"
        style={{ background: theme.navy }}
      >
        <div className="container py-3">
          <h2 className="fw-bold mb-3">Begin Your Success Story Today</h2>
          <p className="mb-4 mx-auto" style={{ maxWidth: "600px", opacity: 0.8 }}>
            Join Kaamyabi and unlock access to premium resources and personalized tracking.
          </p>
          <Link
            to="/user/dashboard"
            className="btn btn-lg px-5 fw-bold"
            style={{ backgroundColor: theme.gold, color: theme.navy, borderRadius: "50px", border: "none" }}
          >
            Go to Dashboard →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;