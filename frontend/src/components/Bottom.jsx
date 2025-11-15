// BottomSection.jsx
import React from "react";

const Bottom = () => {
  return (
    <section
      id="bottom-section"
      style={{
        height: "200vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "black",
      }}
    >
      <button
        style={{
          padding: "20px 40px",
          fontSize: "2rem",
          fontWeight: "bold",
          borderRadius: "10px",
          background: "white",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </section>
  );
};

export default Bottom;
