import React, { useEffect, useState } from "react";
import { getPdfs, addPdf, deletePdf } from "../api/api";

const AdminPdfs = () => {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", url: "", thumbnail: "" });
  const [search, setSearch] = useState("");

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f4f7fe"
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const res = await getPdfs();
      setPdfs(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPdf = async () => {
    if (!form.title || !form.url) {
      alert("Title & URL required ❗");
      return;
    }
    try {
      await addPdf(form);
      fetchPdfs();
      setForm({ title: "", url: "", thumbnail: "" });
      alert("PDF Added to Vault ✅");
    } catch (err) {
      console.log("Add error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this document permanently?")) return;
    try {
      await deletePdf(id);
      fetchPdfs();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  const filtered = pdfs.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: theme.lightGray, minHeight: "100vh" }}>
      
      <div className="row g-4">
        {/* LEFT: ADD DOCUMENT FORM */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 sticky-top" style={{ borderRadius: "24px", top: "90px", zIndex: 1 }}>
            <h4 className="fw-bold mb-4" style={{ color: theme.navy }}>
               Upload <span style={{ color: theme.gold }}>Document</span> 📂
            </h4>

            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">DOCUMENT TITLE</label>
              <input type="text" name="title" className="form-control" style={{ borderRadius: "10px" }} value={form.title} onChange={handleChange} placeholder="e.g. Mid-term Notes" />
            </div>

            <div className="mb-3">
              <label className="small fw-bold text-muted mb-1">PDF EXTERNAL LINK</label>
              <input type="text" name="url" className="form-control" style={{ borderRadius: "10px" }} value={form.url} onChange={handleChange} placeholder="https://drive.google.com/..." />
            </div>

            <div className="mb-4">
              <label className="small fw-bold text-muted mb-1">THUMBNAIL URL (OPTIONAL)</label>
              <input type="text" name="thumbnail" className="form-control" style={{ borderRadius: "10px" }} value={form.thumbnail} onChange={handleChange} />
            </div>

            {form.thumbnail && (
              <div className="mb-3 text-center border rounded-3 p-2 bg-light">
                <img src={form.thumbnail} alt="preview" style={{ width: "100%", height: "120px", objectFit: "contain" }}
                  onError={(e) => { e.target.src = "https://img.icons8.com/color/344/pdf.png"; }} />
              </div>
            )}

            <button className="btn fw-bold w-100 py-3 shadow-sm" style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "15px" }} onClick={handleAddPdf}>
              Add to Library
            </button>
          </div>
        </div>

        {/* RIGHT: DOCUMENT REPOSITORY */}
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0" style={{ color: theme.navy }}>Document Repository</h3>
            <div className="position-relative" style={{ width: "250px" }}>
              <input type="text" placeholder="Filter PDFs..." className="form-control shadow-sm px-4" style={{ borderRadius: "50px" }} value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          {loading ? (
             <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
          ) : (
            <div className="row g-3">
              {filtered.length === 0 ? (
                <div className="text-center py-5 card border-0 shadow-sm rounded-4 w-100">
                  <p className="text-muted mb-0">No documents found.</p>
                </div>
              ) : (
                filtered.map((pdf) => (
                  <div key={pdf._id} className="col-12">
                    <div className="card border-0 shadow-sm p-3 mb-1" style={{ borderRadius: "16px" }}>
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <div className="p-2 rounded-3" style={{ backgroundColor: "#fff5f5" }}>
                             <img src={pdf.thumbnail || "https://img.icons8.com/color/344/pdf.png"} alt="pdf" style={{ height: "45px", width: "45px", objectFit: "contain" }} />
                          </div>
                        </div>
                        <div className="col">
                          <h6 className="fw-bold mb-0" style={{ color: theme.navy }}>{pdf.title}</h6>
                          <small className="text-muted text-truncate d-block" style={{ maxWidth: "250px" }}>{pdf.url}</small>
                        </div>
                        <div className="col-auto d-flex gap-2">
                          <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light border">
                             <i className="bi bi-eye"></i>
                          </a>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(pdf._id)}>
                             <i className="bi bi-trash"></i>
                          </button>
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

export default AdminPdfs;