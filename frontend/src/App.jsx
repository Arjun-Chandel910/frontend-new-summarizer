import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./Pages/Hero";
function App() {
  return (
    <div className="bg-black relative">
      <Navbar />
      <Hero />
    </div>
  );
}

export default App;
