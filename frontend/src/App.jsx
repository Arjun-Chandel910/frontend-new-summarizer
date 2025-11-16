import React from "react";
import ThreeScene from "./scenes/ThreeScene";

function App() {
  return (
    <div>
      <ThreeScene />
      <section
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "300vh",
          // backgroundColor: "rgba(255, 0, 0, 0.8)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "black",
          fontSize: "2rem",
          pointerEvents: "none",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Overlay Section</h1>
          <p>This 300vh section overlays the Three.js canvas</p>
          <p>Scroll down to see more content!</p>
        </div>
      </section>
    </div>
  );
}

export default App;
