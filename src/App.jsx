import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useState } from "react";
import Knife from "./components/Knife";
import "./App.css";

const mapPresets = {
  dust2: {
    name: "Dust II",
    image:
      "https://image-proxy.bo3.gg/uploads/news/16425/title_image/webp-f0264c970f134865fd9b7b194bc41ca9.webp.webp?w=1248&h=624",
    background: "#0d120e",
    fog: "#2a2b2a",
    accent: "#f6b36a",
    light: "#f4c986",
    coldLight: "#ffd79e",
    title: "Vanilla Karambit",
    subtitle: "Ultra-Rare Covert",
    price: "$1,450.00 USD",
    description: "Warm desert lighting with classic contrast and a clean, premium metal finish.",
  },
  mirage: {
    name: "Mirage",
    image: "https://i.redd.it/uuunldy3tywa1.jpg",
    background: "#071b2a",
    fog: "#071b2a",
    accent: "#86d7ff",
    light: "#9fdcff",
    coldLight: "#dfeeff",
    title: "Gamma Doppler",
    subtitle: "Phase 2 Case Hardened",
    price: "$1,980.00 USD",
    description: "Cold blue contrast with a cleaner, futuristic studio look.",
  },
  inferno: {
    name: "Inferno",
    image:
      "https://images.steamusercontent.com/ugc/2193876107321389670/E0076B0C43D57FC4528BAB444CBBD621EF69C1D7/",
    background: "#180a08",
    fog: "#180a08",
    accent: "#ff8a5b",
    light: "#ffbf7d",
    coldLight: "#ffd4a6",
    title: "Night Stripe",
    subtitle: "Rare Patterned Blade",
    price: "$1,730.00 USD",
    description: "Warm ember tones and dramatic reflections for a more aggressive finish.",
  },
  overpass: {
    name: "Overpass",
    image:
      "https://static.wikia.nocookie.net/cswikia/images/5/55/Overpass_loading_screen.png/revision/latest/scale-to-width-down/1200",
    background: "#0b1117",
    fog: "#0b1117",
    accent: "#a4d6ff",
    light: "#dfefff",
    coldLight: "#ffffff",
    title: "Urban Karambit",
    subtitle: "Fade / Blue Steel",
    price: "$2,120.00 USD",
    description: "Industrial lighting and cool gray shadows to highlight sharp edges.",
  },
};

function App() {
  const [selectedMap, setSelectedMap] = useState("mirage");
  const map = useMemo(() => mapPresets[selectedMap], [selectedMap]);

  return (
    <div className="app-shell">
      <header className="top-header">
        <div className="business-name">
          <img
            src="/bitmap.svg"
            alt="Logo de la empresa"
            className="logo"
          />
          <div className="text-design">
            <span className="owner-name">SSSL</span>
            <span className="fullname">Shadow Spectrum Systems Ltd.</span>
          </div>
        </div>
      </header>

      <main className="app-layout">
        <section className="viewport-section">
          <div className="viewport-3d">
            <div
              className="scene-shell"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(4,8,14,0.2), rgba(4,8,14,0.78)), url(${map.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0.4, 2.4], fov: 28 }}
                gl={{ antialias: true, alpha: true }}
              >
                <fog attach="fog" args={[map.fog, 2.8, 7.5]} />

                <ambientLight intensity={0.9} color="#eaf2ff" />
                <directionalLight
                  position={[4, 4, 4]}
                  intensity={2.8}
                  color={map.light}
                  castShadow
                />
                <spotLight
                  position={[-3, 3, 3]}
                  angle={0.42}
                  penumbra={0.9}
                  intensity={70}
                  color={map.accent}
                />
                <spotLight
                  position={[2, 1.8, 3]}
                  angle={0.5}
                  penumbra={1}
                  intensity={50}
                  color={map.coldLight}
                />

                <Knife />

                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  minPolarAngle={Math.PI / 2.2}
                  maxPolarAngle={Math.PI / 1.8}
                  autoRotate
                  autoRotateSpeed={1.4}
                />
              </Canvas>
            </div>
          </div>

          <footer className="viewport-footer">
            <div className="footer-item knife-title">Karambit | {map.name}</div>
            <div className="footer-item source-badge">
              <span>Source:</span> <strong className="platform-csfloat">CSFloat</strong>
            </div>
            <div className="footer-item price-tag">{map.price}</div>
          </footer>
        </section>

        <aside className="info-sidebar">
          <div className="card-section text-info">
            <h2 className="name-skin">{map.title}</h2>
            <span className="category-badge">{map.subtitle}</span>
          </div>

          <div className="card-section float-container">
            <div className="float-header">
              <span>Float Value</span>
              <span className="float-num">0.00782341</span>
            </div>
            <div className="float-bar-bg">
              <div className="float-bar-fill" style={{ width: "15%" }} />
            </div>
            <div className="pattern-info">Pattern Index: <strong>428</strong></div>
          </div>

          <div className="card-section stickers-section">
            <span className="section-title">Applied Stickers</span>
            <ul className="sticker-grid">
              <li className="sticker-slot">+</li>
              <li className="sticker-slot">+</li>
              <li className="sticker-slot">+</li>
              <li className="sticker-slot">+</li>
            </ul>
          </div>

          <div className="card-section maps-section">
            <span className="section-title">Environment Lighting</span>
            <div className="maps-grid">
              {Object.entries(mapPresets).map(([key, preset]) => (
                <button
                  key={key}
                  className={`map-card ${selectedMap === key ? "selected" : ""}`}
                  onClick={() => setSelectedMap(key)}
                  type="button"
                >
                  <img src={preset.image} alt={preset.name} />
                  <span className="map-title">{preset.name}</span>
                </button>
              ))}
            </div>
            <p className="map-description">{map.description}</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;