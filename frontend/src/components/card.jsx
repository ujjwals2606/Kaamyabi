import React from "react";

const Card = ({
  title,
  description,
  image,
  buttonText,
  onClick,
  link,
}) => {
  const theme = {
    navy: "#0a192f",
    gold: "#c5a059",
    white: "#ffffff",
  };

  return (
    <div
      className="card border-0 shadow-sm h-100"
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        backgroundColor: theme.white,
        borderBottom: `4px solid transparent`, // Hidden until hover
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 15px 35px rgba(10, 25, 47, 0.15)";
        e.currentTarget.style.borderBottom = `4px solid ${theme.gold}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)";
        e.currentTarget.style.borderBottom = `4px solid transparent`;
      }}
    >
      {/* IMAGE SECTION */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={
            image ||
            "https://img.icons8.com/color/344/image.png"
          }
          alt={title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400/0a192f/white?text=Kaamyabi";
          }}
        />
        {/* Subtle Overlay on Image */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, transparent 60%, rgba(10, 25, 47, 0.1))",
          pointerEvents: "none"
        }}></div>
      </div>

      {/* CARD BODY */}
      <div className="card-body d-flex flex-column p-4">
        <h5 className="fw-bold mb-2" style={{ color: theme.navy, fontSize: "1.15rem" }}>
          {title}
        </h5>

        {description && (
          <p className="text-muted small mb-4" style={{ lineHeight: "1.5", flexGrow: 1 }}>
            {description.length > 90 ? description.substring(0, 90) + "..." : description}
          </p>
        )}

        {/* ACTION BUTTON */}
        {buttonText && (
          link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm w-100 py-2 fw-bold"
              style={{ 
                backgroundColor: theme.navy, 
                color: theme.white, 
                borderRadius: "8px",
                border: "none",
                transition: "0.3s"
              }}
            >
              {buttonText}
            </a>
          ) : (
            <button
              className="btn btn-sm w-100 py-2 fw-bold"
              onClick={onClick}
              style={{ 
                backgroundColor: "transparent", 
                color: theme.navy, 
                border: `2px solid ${theme.navy}`, 
                borderRadius: "8px",
                transition: "0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.navy;
                e.target.style.color = theme.white;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = theme.navy;
              }}
            >
              {buttonText}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Card;