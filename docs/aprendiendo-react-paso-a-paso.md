**Aprendiendo React — Paso a paso**

Este documento es tu guía práctica y compacta para aprender React y las piezas necesarias para construir tu `karambit-viewer` (UI, carga de modelos 3D con R3F, y obtención de datos externos).

**Resumen rápido**:
- Objetivo: dominar React básico → integrar datos (fetch/scraping) → Three.js + React Three Fiber (R3F) para tu viewer.
- Duración sugerida: 6 semanas (ver plan).

**Semana 1 — JavaScript esencial (fundamentos)**
- Temas: variables, tipos, funciones, arrays, objetos, `map`/`filter`/`reduce`, promesas, `async/await`.
- Recursos: freeCodeCamp JS, MDN, JavaScript.info.
- Meta práctico: crear pequeñas utilidades que transformen arrays de skins.

**Semana 2 — React básico**
- Temas: JSX, componentes funcionales, `props`, `state` con `useState`.
- Recursos: The Net Ninja (React playlist), freeCodeCamp React.
- Meta práctico: crear una lista de skins estática y poder seleccionar uno.

**Semana 3 — React intermedio**
- Temas: `useEffect`, `useMemo`, composición de componentes, eventos, formularios.
- Recursos: Traversy Media, Midudev.
- Meta práctico: cargar datos locales (JSON) y mostrar fichas de skins con filtros.

**Semana 4 — Datos y fetching (APIs y scraping)**
- Temas: `fetch` / `axios`, APIs REST, CORS, parsing HTML con `cheerio`, scraping con `puppeteer` o `playwright`.
- Recursos: The Net Ninja Node.js, freeCodeCamp scraping tutorials, YouTube: "cheerio tutorial", "puppeteer tutorial".
- Meta práctico: escribir un script Node que consulte una API o scrapee una página y normalice los datos a tu formato de `knifeSkin`.

**Semana 5 — Three.js + React Three Fiber**
- Temas: Canvas, luces, cámaras, `useGLTF`, materiales, texturas, `OrbitControls`.
- Recursos: R3F docs (pmnd.rs), Three.js docs, tutoriales YouTube (buscar "React Three Fiber tutorial").
- Meta práctico: cargar `weapon_knife_karambit.glb` en tu app y aplicar una textura desde `public/models`.

**Semana 6 — Integración y despliegue**
- Temas: integrar fetching de skins con UI, optimizar texturas, preloads, `useMemo` para performance, crear build (`vite build`) y preview.
- Recursos: Vite docs, Netlify / Vercel guides (deploy gratuito).
- Meta práctico: tener un viewer funcional que tome datos externos y cambie textura/fondo al seleccionar skins.

**Estructura de datos recomendada**
```js
{
  id: "mirage_gamma",
  name: "Gamma Doppler",
  price: 1980,
  image: "/maps/mirage.jpg",
  texture: "/models/mi_skin.png",
  float: 0.0078,
  rarity: "Covert"
}
```

**Cómo aplicar una textura (resumen rápido)**
1. Copia la imagen a `public/models/mi_skin.png`.
2. En `src/components/Knife.jsx`, usa `THREE.TextureLoader()`:
```js
const tex = new THREE.TextureLoader().load('/models/mi_skin.png');
tex.flipY = false;
tex.colorSpace = THREE.SRGBColorSpace;
child.material.map = tex;
child.material.needsUpdate = true;
```

**Comandos útiles (en tu proyecto con Vite)**
```bash
# instalar dependencias
npm install
# arrancar dev server
npm run dev
# build para producción
npm run build
# preview del build
npm run preview
```

**Recursos gratuitos (directos)**
- freeCodeCamp (JS, React): https://www.freecodecamp.org/
- The Net Ninja (YouTube) - React playlists: https://www.youtube.com/@TheNetNinja
- Traversy Media (YouTube): https://www.youtube.com/@TraversyMedia
- miduDev (YouTube, español): https://www.youtube.com/@midudev
- React Three Fiber (docs): https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
- Three.js (docs): https://threejs.org/docs/
- Cheerio (scraping): https://cheerio.js.org/
- Puppeteer (headless browser): https://pptr.dev/

**Siguientes pasos que puedo hacer ahora**
- Añadir ejemplos de código listos para copiar en `src/` (por ejemplo: `data/skins.json`, `scripts/fetchSkins.js`).
- Crear un script de scraping mínimo con `axios` + `cheerio` (si me das una URL objetivo).
- Generar un README con el plan de 6 semanas en la raíz del repo.

---
Archivo creado en: `docs/aprendiendo-react-paso-a-paso.md`

Dime cuál de los siguientes quieres ahora (responde el número):
1) Añadir `data/skins.json` con ejemplos
2) Crear `scripts/fetchSkins.js` que obtenga y normalice datos de una API
3) Crear un ejemplo de `scripts/scrapeSkins.js` usando `cheerio` (necesito URL objetivo)
4) Generar `README.md` con el plan y comandos
5) Nada más, sólo quería el documento
