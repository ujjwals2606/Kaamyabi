import React, { useState } from "react";

const Tutorials = () => {
  const [search, setSearch] = useState("");

  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
    lightGray: "#f8f9fa",
  };

  const tutorialData = [
    { title: "React Tutorial", thumbnail: "https://img.icons8.com/color/344/react-native.png", url: "https://reactjs.org/docs/getting-started.html" },
    { title: "JavaScript Basics", thumbnail: "https://img.icons8.com/color/344/javascript.png", url: "https://www.w3schools.com/js/" },
    { title: "HTML5 Tutorial", thumbnail: "https://img.icons8.com/color/344/html-5.png", url: "https://www.tutorialspoint.com/html/index.htm" },
    { title: "CSS3 Tutorial", thumbnail: "https://img.icons8.com/color/344/css3.png", url: "https://www.tutorialspoint.com/css/index.htm" },
    { title: "Node.js Guide", thumbnail: "https://img.icons8.com/color/344/nodejs.png", url: "https://nodejs.dev/learn" },
    { title: "Python Tutorial", thumbnail: "https://img.icons8.com/color/344/python--v1.png", url: "https://www.w3schools.com/python/" },
    { title: "AI & ML Guide", thumbnail: "https://img.icons8.com/color/344/artificial-intelligence.png", url: "https://www.coursera.org/learn/machine-learning" },
    { title: "Java Tutorial", thumbnail: "https://img.icons8.com/color/344/java-coffee-cup-logo.png", url: "https://www.w3schools.com/java/" },
    { title: "C Programming", thumbnail: "https://img.icons8.com/color/344/c-programming.png", url: "https://www.tutorialspoint.com/cprogramming/index.htm" },
    { title: "C++ Tutorial", thumbnail: "https://img.icons8.com/color/344/c-plus-plus-logo.png", url: "https://www.tutorialspoint.com/cplusplus/index.htm" },
    { title: "SQL Guide", thumbnail: "https://img.icons8.com/color/344/sql.png", url: "https://www.w3schools.com/sql/" },
    { title: "Bootstrap Tutorial", thumbnail: "https://img.icons8.com/color/344/bootstrap.png", url: "https://getbootstrap.com/docs/5.0/getting-started/introduction/" },
  ];

  const filteredData = tutorialData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#fdfdfd", minHeight: "100vh" }}>
      
      {/* Header Section */}
      <div className="container text-center mb-5">
        <h2 className="fw-bold mb-3" style={{ color: theme.navy }}>
          Skill <span style={{ color: theme.gold }}>Tutorials</span> 📚
        </h2>
        <p className="text-muted mx-auto mb-4" style={{ maxWidth: "600px" }}>
          Master new technologies with our hand-picked documentation and structured learning paths.
        </p>

        {/* Search Bar Upgrade */}
        <div className="position-relative mx-auto" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            placeholder="What do you want to learn today?"
            className="form-control py-3 shadow-sm px-4"
            style={{ borderRadius: "50px", border: `2px solid #eee`, fontSize: "1rem" }}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="position-absolute end-0 top-50 translate-middle-y pe-4 text-muted">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div className="container">
        {/* Grid */}
        <div className="row g-4">
          {filteredData.map((tutorial, index) => (
            <div key={index} className="col-md-4 col-lg-3 col-sm-6">
              <div
                className="card border-0 shadow-sm h-100 text-center p-4"
                style={{
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  backgroundColor: theme.white,
                  border: "1px solid #f0f0f0"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.08)";
                  e.currentTarget.style.borderColor = theme.gold;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "#f0f0f0";
                }}
              >
                
                {/* Tech Icon Box */}
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    height: "100px",
                    width: "100px",
                    backgroundColor: theme.lightGray,
                    borderRadius: "50%",
                    padding: "20px"
                  }}
                >
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.target.src = "https://img.icons8.com/color/344/book.png";
                    }}
                  />
                </div>

                {/* Title */}
                <h6 className="fw-bold mb-3" style={{ color: theme.navy }}>{tutorial.title}</h6>

                {/* Button Upgrade */}
                <div className="mt-auto">
                  <a
                    href={tutorial.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm w-100 py-2 fw-bold"
                    style={{ 
                        backgroundColor: theme.navy, 
                        color: theme.white, 
                        borderRadius: "10px",
                        letterSpacing: "0.5px"
                    }}
                  >
                    View Course
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* No Result */}
        {filteredData.length === 0 && (
          <div className="text-center mt-5 py-5">
            <h1 className="display-4">🔍</h1>
            <p className="text-muted fs-5">We couldn't find any tutorials matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorials;