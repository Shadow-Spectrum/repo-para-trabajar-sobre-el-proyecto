import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Knife from "./components/Knife";
import "./App.css";

function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 45 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={3} />

      <Knife />

      <OrbitControls />
    </Canvas>
  );
}

export default App;