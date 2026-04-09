import React, { useEffect, useState } from "react";
import { getBlogs } from "../api/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    lightGray: "#f8f9fa",
    white: "#ffffff",
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fe",
        paddingLeft: "5%",
        paddingRight: "5%"
      }}
    >
      {/* PAGE HEADER */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2" style={{ color: theme.navy }}>
          Knowledge <span style={{ color: theme.gold }}>Hub</span> 📚
        </h1>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Stay updated with the latest insights, tutorials, and success stories 
          curated by the Kaamyabi expert team.
        </p>
        <div className="mx-auto" style={{ width: "50px", height: "3px", backgroundColor: theme.gold }}></div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Curating best articles for you...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && blogs.length === 0 && (
        <div className="text-center py-5">
          <h2 className="display-1">📂</h2>
          <p className="text-muted">No blogs found at the moment. Check back soon!</p>
        </div>
      )}

      {/* BLOG GRID */}
      <div className="row g-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-6 col-lg-4">
            <div
              className="card border-0 shadow-sm h-100"
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                backgroundColor: theme.white,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(10, 25, 47, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
              }}
            >
              {/* IMAGE CONTAINER */}
              {/* IMAGE CONTAINER */}
<div
  style={{
    height: "160px", // 👈 reduced from 210px
    overflow: "hidden",
    position: "relative",
    background: "#f8f9fa"
  }}
>
  <img
    src={blog.image || "https://placehold.co/600x400/0a192f/white?text=Blog"}
    alt={blog.title}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain", // 👈 FIX (no zoom)
      padding: "10px"       // 👈 gives breathing space
    }}
    onError={(e) => {
      e.target.src = "https://placehold.co/600x400/0a192f/white?text=Blog";
    }}
  />

  {/* Badge */}
  <span 
    className="position-absolute top-0 end-0 m-2 badge px-2 py-1"
    style={{ 
      backgroundColor: "rgba(10, 25, 47, 0.7)", 
      backdropFilter: "blur(3px)", 
      borderRadius: "50px",
      fontSize: "0.7rem"
    }}
  >
    Learning
  </span>
</div>

              {/* CARD CONTENT */}
              <div className="card-body p-4 d-flex flex-column">
                <h5 className="fw-bold mb-3" style={{ color: theme.navy, lineHeight: "1.4", height: "3rem", overflow: "hidden" }}>
                  {blog.title}
                </h5>

                <p className="text-muted small mb-4" style={{ flexGrow: 1 }}>
                  {blog.description?.length > 110 
                    ? blog.description.substring(0, 110) + "..." 
                    : blog.description}
                </p>

                <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                   <span className="small text-muted">
                     <i className="bi bi-calendar3 me-1"></i> Recent Post
                   </span>
                   <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn fw-bold px-4"
                    style={{ 
                      backgroundColor: theme.gold, 
                      color: theme.navy, 
                      borderRadius: "8px",
                      fontSize: "0.85rem" 
                    }}
                  >
                    Read Article
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;