import React, { useEffect, useState } from "react";
import { getPdfs } from "../api/api";

const Pdfs = () => {
  const [search, setSearch] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f8f9fa",
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const res = await getPdfs();
      setPdfs(res.data);
    } catch (err) {
      console.log("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = pdfs.filter((pdf) =>
    pdf.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>

      {/* Header Section */}
      <div className="container text-center mb-5">
        <h2 className="fw-bold mb-3" style={{ color: theme.navy }}>
          Study <span style={{ color: theme.gold }}>Materials</span> 📂
        </h2>
        <p className="text-muted mx-auto mb-4" style={{ maxWidth: "600px" }}>
          Access premium PDF resources, notes, and e-books curated for your academic success.
        </p>

        {/* Search Bar Upgrade */}
        <div className="position-relative mx-auto" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            placeholder="Search for documents, notes..."
            className="form-control py-3 shadow-sm px-4"
            style={{ borderRadius: "50px", border: "1px solid #eee" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="position-absolute end-0 top-50 translate-middle-y pe-4 text-muted">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="container">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Indexing documents...</p>
          </div>
        )}

        {/* Grid */}
        <div className="row g-4">
          {!loading && filteredData.length === 0 ? (
            <div className="text-center py-5 w-100">
              <h1 className="display-4 text-muted">🔍</h1>
              <p className="text-muted">No documents found matching your criteria.</p>
            </div>
          ) : (
            filteredData.map((pdf) => (
              <div key={pdf._id} className="col-md-4 col-lg-3 col-sm-6">
                <div
                  className="card border-0 shadow-sm h-100 p-4 text-center"
                  style={{
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                    backgroundColor: theme.white,
                    border: "1px solid #f0f0f0"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = theme.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = "#f0f0f0";
                  }}
                >
                  {/* PDF Icon/Thumbnail Box */}
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      height: "90px",
                      width: "90px",
                      backgroundColor: "#fff5f5", // Light red tint for PDF vibe
                      borderRadius: "15px",
                      padding: "15px"
                    }}
                  >
                    <img
                      src={pdf.thumbnail || "https://img.icons8.com/color/344/pdf.png"}
                      alt={pdf.title}
                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                      onError={(e) => {
                        e.target.src = "https://img.icons8.com/color/344/pdf.png";
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h6 className="fw-bold mb-4" style={{ color: theme.navy, fontSize: "0.95rem", minHeight: "2.5rem" }}>
                    {pdf.title}
                  </h6>

                  {/* Action Buttons */}
                  <div className="mt-auto pt-2 d-flex flex-column gap-2">
                    <a
                      href={pdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm fw-bold w-100"
                      style={{ 
                        backgroundColor: theme.navy, 
                        color: theme.white, 
                        borderRadius: "8px",
                        padding: "8px"
                      }}
                    >
                      <i className="bi bi-eye-fill me-2"></i> View Online
                    </a>

                    <a
                      href={pdf.url}
                      download
                      className="btn btn-sm fw-bold w-100"
                      style={{ 
                        backgroundColor: "transparent", 
                        color: theme.gold, 
                        border: `1px solid ${theme.gold}`,
                        borderRadius: "8px",
                        padding: "8px"
                      }}
                    >
                      <i className="bi bi-download me-2"></i> Download
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Pdfs;