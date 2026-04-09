import React, { useEffect, useState } from "react";
import { getVideos, trackVideoWatch } from "../api/api";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [activeVideo, setActiveVideo] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const userId = localStorage.getItem("userId");

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f8f9fa"
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await getVideos();
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(search.toLowerCase())
  );

  const getVideoId = (url) => {
    const match = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : "";
  };

  const openVideo = (video) => {
    setActiveVideo(video);
    setStartTime(Date.now());
  };

  const closeVideo = async () => {
    if (startTime && activeVideo) {
      const endTime = Date.now();
      const watchTime = Math.floor((endTime - startTime) / 1000);
      if (watchTime > 5) {
        try {
          await trackVideoWatch({
            userId,
            topic: activeVideo.topic || "general",
            videoId: activeVideo._id,
            watchTime,
          });
        } catch (err) {
          console.error("❌ Error saving watch time", err);
        }
      }
    }
    setActiveVideo(null);
    setStartTime(null);
  };

  return (
    <div className="container-fluid py-5 px-lg-5" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>

      {/* Heading Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-3" style={{ color: theme.navy }}>
          Video <span style={{ color: theme.gold }}>Learning</span> 🎬
        </h2>
        <p className="text-muted mx-auto mb-4" style={{ maxWidth: "600px" }}>
          Enhance your skills with high-quality visual content curated for academic excellence.
        </p>

        {/* Search Upgrade */}
        <div className="position-relative mx-auto" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            placeholder="Search for a topic..."
            className="form-control py-3 shadow-sm px-4"
            style={{ borderRadius: "50px", border: "1px solid #eee" }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="row g-4 px-2">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">No tutorials found matching your search.</h4>
          </div>
        ) : (
          filteredVideos.map((video) => (
            <div key={video._id} className="col-sm-6 col-md-4 col-lg-3">
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backgroundColor: theme.white
                }}
                onClick={() => openVideo(video)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
                }}
              >
                {/* Thumbnail with Play Overlay */}
                <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                  <img
                    src={video.thumbnail || "https://placehold.co/600x400/0a192f/white?text=Tutorial"}
                    alt={video.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    className="play-overlay d-flex align-items-center justify-content-center"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "rgba(10, 25, 47, 0.4)",
                      color: theme.gold,
                      fontSize: "3rem",
                      opacity: 0.9,
                      transition: "0.3s"
                    }}
                  >
                    <i className="bi bi-play-circle-fill"></i>
                  </div>
                </div>

                <div className="card-body py-3 px-3">
                  <h6 className="fw-bold mb-1" style={{ color: theme.navy, fontSize: "0.95rem" }}>{video.title}</h6>
                  <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                    <i className="bi bi-clock-history me-1"></i> Interactive Session
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= MODAL / THEATER MODE ================= */}
      {activeVideo && (
        <div
          className="modal-overlay"
          onClick={closeVideo}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(10, 25, 47, 0.95)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
            padding: "20px"
          }}
        >
          <div
            className="modal-content-wrapper"
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: "1000px", position: "relative" }}
          >
            {/* Header in Modal */}
            <div className="d-flex justify-content-between align-items-center mb-3 text-white">
              <h5 className="fw-bold mb-0">{activeVideo.title}</h5>
              <button 
                className="btn-close btn-close-white" 
                onClick={closeVideo}
                aria-label="Close"
              ></button>
            </div>

            {/* Responsive Iframe Container */}
            <div className="ratio ratio-16x9 shadow-lg" style={{ borderRadius: "15px", overflow: "hidden", backgroundColor: "#000" }}>
              <iframe
                src={`https://www.youtube.com/embed/${getVideoId(activeVideo.url)}?autoplay=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <p className="mt-3 text-white-50 text-center small">
              Close the video to save your learning progress automatically.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;