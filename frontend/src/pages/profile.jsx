import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f4f7fe"
  };

  // Get first letter for avatar
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: theme.lightGray, minHeight: "90vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          
          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: theme.navy }}>
              User <span style={{ color: theme.gold }}>Identity</span>
            </h2>
            <p className="text-muted small">Manage your personal credentials and account status.</p>
          </div>

          <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: "30px" }}>
            {/* Top Decorative Header */}
            <div style={{ height: "100px", backgroundColor: theme.navy }}></div>
            
            <div className="card-body px-4 pb-5 text-center" style={{ marginTop: "-50px" }}>
              {/* Profile Avatar */}
              <div className="shadow-lg mb-4 d-inline-block p-1 bg-white rounded-circle">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.navy}, ${theme.gold})`,
                    color: theme.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                    fontWeight: "bold",
                    border: "4px solid #fff"
                  }}
                >
                  {firstLetter}
                </div>
              </div>

              {/* Identity Details */}
              <div className="mb-4">
                <h4 className="fw-bold mb-0" style={{ color: theme.navy }}>{user?.name || "Anonymous User"}</h4>
                <span className="badge px-3 py-2 mt-2" style={{ backgroundColor: theme.gold + "20", color: theme.gold, borderRadius: "50px", fontSize: "0.75rem", letterSpacing: "1px" }}>
                  {user?.role?.toUpperCase() || "STUDENT"}
                </span>
              </div>

              <hr className="my-4" style={{ opacity: "0.1" }} />

              <div className="row g-3 text-start px-3">
                <div className="col-12">
                  <label className="small fw-bold text-muted mb-1">EMAIL ADDRESS</label>
                  <div className="p-3 rounded-3 border bg-light d-flex align-items-center">
                    <i className="bi bi-envelope me-3 text-muted"></i>
                    <span className="text-dark fw-medium">{user?.email || "Not Available"}</span>
                  </div>
                </div>

                <div className="col-12">
                  <label className="small fw-bold text-muted mb-1">ACCOUNT STATUS</label>
                  <div className="p-3 rounded-3 border bg-light d-flex align-items-center">
                    <i className="bi bi-shield-check me-3 text-success"></i>
                    <span className="text-dark fw-medium">Verified Account</span>
                    <span className="ms-auto badge bg-success-subtle text-success border border-success-subtle">Active</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {/* <div className="mt-5 px-3">
                <button 
                  className="btn btn-lg w-100 fw-bold shadow-sm mb-3" 
                  style={{ backgroundColor: theme.navy, color: theme.white, borderRadius: "15px" }}
                  disabled
                >
                  Edit Profile Settings
                </button>
                <p className="small text-muted mb-0">Security settings managed by Admin.</p>
              </div> */}
            </div>
          </div>

          <div className="text-center mt-4">
            {/* <p className="text-muted small">© 2026 Kaamyabi Platform </p> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;