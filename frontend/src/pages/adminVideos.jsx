import React, { useEffect, useState } from "react";
import {
  getVideos,
  addVideo,
  deleteVideo,
  updateVideo,
} from "../api/api";

const DEFAULT_IMG = "https://img.icons8.com/color/344/youtube-play.png";

const AdminVideos = () => {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ title: "", url: "", topic: "" });
  const [editId, setEditId] = useState(null);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f4f7fe",
    danger: "#dc3545"
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getVideos();
      setVideos(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  const getThumbnail = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/|embed\/)([^&?]+)/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      : DEFAULT_IMG;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.url || !form.topic) {
      alert("Please fill all fields ❗");
      return;
    }

    const data = {
      ...form,
      thumbnail: getThumbnail(form.url),
    };

    try {
      if (editId) {
        await updateVideo(editId, data);
        setEditId(null);
      } else {
        await addVideo(data);
      }
      setForm({ title: "", url: "", topic: "" });
      fetchVideos();
      alert("Database Updated Successfully ✅");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Remove this video from the library?")) {
      await deleteVideo(id);
      fetchVideos();
    }
  };

  const handleEdit = (video) => {
    setForm({ title: video.title, url: video.url, topic: video.topic || "" });
    setEditId(video._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: theme.lightGray, minHeight: "100vh" }}>
      
      <div className="row g-4 justify-content-center">
        {/* LEFT COLUMN: UPLOAD FORM */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 sticky-top" style={{ borderRadius: "20px", top: "80px", zIndex: 1 }}>
            <h4 className="fw-bold mb-4" style={{ color: theme.navy }}>
              Video <span style={{ color: theme.gold }}>Studio</span> 🎬
            </h4>
            
            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">VIDEO TITLE</label>
              <input name="title" className="form-control" style={{ borderRadius: "10px" }} value={form.title} onChange={handleChange} placeholder="e.g. React Hooks Explained" />
            </div>

            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">YOUTUBE URL</label>
              <input name="url" className="form-control" style={{ borderRadius: "10px" }} value={form.url} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." />
            </div>

            <div className="mb-4">
              <label className="small fw-bold text-muted mb-1">LEARNING TOPIC</label>
              <input name="topic" className="form-control" style={{ borderRadius: "10px" }} value={form.topic} onChange={handleChange} placeholder="e.g. Development, Success" />
            </div>

            {/* PREVIEW BOX */}
            {form.url && (
              <div className="mb-4 rounded-3 overflow-hidden shadow-sm border">
                <p className="small fw-bold text-center bg-light m-0 py-1">Auto-Generated Thumbnail</p>
                <img src={getThumbnail(form.url)} alt="preview" style={{ width: "100%", height: "160px", objectFit: "cover" }} />
              </div>
            )}

            <button className="btn btn-lg w-100 fw-bold shadow-sm" style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "12px" }} onClick={handleSubmit}>
              {editId ? "Update Metadata" : "Add to Library"}
            </button>
            {editId && <button className="btn btn-link w-100 text-muted mt-2" onClick={() => {setEditId(null); setForm({title:"", url:"", topic:""})}}>Cancel Edit</button>}
          </div>
        </div>

        {/* RIGHT COLUMN: VIDEO REPOSITORY */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0" style={{ color: theme.navy }}>Video Repository</h3>
            <span className="badge px-3 py-2" style={{ backgroundColor: theme.gold, color: theme.navy }}>
               {videos.length} Lectures Total
            </span>
          </div>

          <div className="row g-3">
            {videos.map((video) => (
              <div key={video._id} className="col-md-6 col-xl-4">
                <div className="card border-0 shadow-sm h-100 p-2" style={{ borderRadius: "16px", transition: "0.3s" }}>
                  <div className="position-relative overflow-hidden rounded-3 mb-2">
                    <img src={video.thumbnail || DEFAULT_IMG} alt="thumb" style={{ height: "140px", width: "100%", objectFit: "cover" }} />
                    <div className="position-absolute top-0 start-0 m-2">
                       <span className="badge bg-white text-dark shadow-sm" style={{ fontSize: "0.7rem" }}>{video.topic}</span>
                    </div>
                  </div>

                  <div className="p-2">
                    <h6 className="fw-bold text-dark text-truncate mb-3">{video.title}</h6>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm flex-grow-1 fw-bold" style={{ backgroundColor: "#eef2ff", color: theme.navy, borderRadius: "8px" }} onClick={() => handleEdit(video)}>
                        <i className="bi bi-pencil-square me-1"></i> Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger flex-grow-1" style={{ borderRadius: "8px" }} onClick={() => handleDelete(video._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVideos;