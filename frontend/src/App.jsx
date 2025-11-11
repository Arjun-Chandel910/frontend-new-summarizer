import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import "./App.css";

function App() {
  return (
    <div className="bg-black relative">
      <nav className="absolute top-0 left-0 right-0 z-10 bg-black/80 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">NewsGpt</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Canvas className="absolute inset-0">
        <Scene />
      </Canvas>
    </div>
  );
}

export default App;
