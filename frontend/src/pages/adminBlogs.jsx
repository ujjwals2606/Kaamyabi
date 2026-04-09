import React, { useEffect, useState } from "react";
import { getBlogs, addBlog, deleteBlog } from "../api/api";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "", url: "", image: "" });
  const [search, setSearch] = useState("");

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f4f7fe"
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddBlog = async () => {
    if (!form.title || !form.url) {
      alert("Title & URL required ❗");
      return;
    }
    try {
      await addBlog(form);
      fetchBlogs();
      setForm({ title: "", description: "", url: "", image: "" });
    } catch (err) {
      console.log("Add error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: theme.lightGray, minHeight: "100vh" }}>
      
      <div className="row g-4">
        {/* LEFT COLUMN: ADD FORM */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 sticky-top" style={{ borderRadius: "20px", top: "80px", zIndex: 1 }}>
            <h4 className="fw-bold mb-4" style={{ color: theme.navy }}>
               Create <span style={{ color: theme.gold }}>Blog</span> ✍️
            </h4>
            
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">BLOG TITLE</label>
              <input type="text" name="title" className="form-control" style={{ borderRadius: "10px" }} value={form.title} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">DESCRIPTION</label>
              <textarea name="description" className="form-control" rows="3" style={{ borderRadius: "10px" }} value={form.description} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">RESOURCE URL</label>
              <input type="text" name="url" className="form-control" style={{ borderRadius: "10px" }} value={form.url} onChange={handleChange} />
            </div>

            <div className="mb-4">
              <label className="small fw-bold text-muted mb-1">THUMBNAIL IMAGE URL</label>
              <input type="text" name="image" className="form-control" style={{ borderRadius: "10px" }} value={form.image} onChange={handleChange} />
            </div>

            {form.image && (
              <div className="mb-3 text-center border rounded-3 p-2 bg-light">
                <p className="small text-muted mb-1">Live Preview</p>
                <img src={form.image} alt="preview" style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px" }}
                  onError={(e) => { e.target.src = "https://placehold.co/400x200?text=Invalid+Image+URL"; }} />
              </div>
            )}

            <button className="btn fw-bold w-100 py-2 shadow-sm" style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "12px" }} onClick={handleAddBlog}>
              Publish Blog Post
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: BLOG LISTING */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0" style={{ color: theme.navy }}>Manage Repository</h3>
            <div className="position-relative" style={{ width: "300px" }}>
              <input type="text" placeholder="Search entries..." className="form-control shadow-sm px-4" style={{ borderRadius: "50px", border: "1px solid #ddd" }} value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : (
            <div className="row g-3">
              {filteredBlogs.length === 0 ? (
                <div className="text-center py-5 card border-0 shadow-sm rounded-4 w-100">
                  <p className="text-muted mb-0">No records found matching your search.</p>
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <div key={blog._id} className="col-12">
                    <div className="card border-0 shadow-sm p-3 mb-2" style={{ borderRadius: "15px", transition: "0.3s" }}>
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img src={blog.image || "https://img.icons8.com/color/344/blog.png"} alt="thumb" 
                            style={{
  width: "100%",
  height: "70px",
  objectFit: "contain",   // 👈 change here
  borderRadius: "10px",
  backgroundColor: "#fff" // optional (better look)
}} />
                        </div>
                        <div className="col-md-7">
                          <h6 className="fw-bold mb-1" style={{ color: theme.navy }}>{blog.title}</h6>
                          <p className="text-muted small mb-0">{blog.description?.substring(0, 80)}...</p>
                        </div>
                        <div className="col-md-3 text-end">
                          <a href={blog.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light me-2 border">View</a>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(blog._id)}>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;