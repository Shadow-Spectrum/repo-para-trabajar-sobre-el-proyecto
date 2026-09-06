# Montar APIs — Guía práctica paso a paso

Este documento te enseña desde cero cómo montar APIs para tu proyecto (p. ej. servir datos de skins, precios, y texturas), con ejemplos prácticos en Node.js/Express y notas sobre bases de datos, autenticación y despliegue.

## Resumen rápido
- Objetivo: crear APIs REST simples y robustas para alimentar tu `karambit-viewer`.
- Stack recomendado inicial: Node.js + Express + SQLite (local) / Postgres (producción).
- Duración sugerida: 1–2 semanas para llegar a una API funcional.

---

## 1. Conceptos básicos
- API: interfaz que expone datos y funcionalidades vía HTTP.
- REST vs GraphQL: REST es más simple y suficiente para la mayoría de catálogos.
- Endpoints típicos para tu proyecto:
  - `GET /api/skins` → listado de skins
  - `GET /api/skins/:id` → detalle de un skin
  - `POST /api/skins` → crear skin (admin)
  - `PUT /api/skins/:id` → actualizar skin
  - `DELETE /api/skins/:id` → borrar skin

---

## 2. Preparar el entorno (Node + Express)
1. Inicializa proyecto (en la raíz del repo o en `backend/`):

```bash
mkdir backend && cd backend
npm init -y
npm install express cors dotenv sqlite3 knex better-sqlite3
npm install -D nodemon
```

2. Scripts en `package.json`:

```json
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

---

## 3. Ejemplo mínimo: API Express (index.js)

Crea `backend/index.js`:

```js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let skins = [
  { id: 'mirage_gamma', name: 'Gamma Doppler', price: 1980, texture: '/models/mi_skin.png' },
  { id: 'inferno_night', name: 'Night Stripe', price: 1730, texture: '/models/mi_skin2.png' }
];

app.get('/api/skins', (req, res) => res.json(skins));
app.get('/api/skins/:id', (req, res) => {
  const s = skins.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  res.json(s);
});

app.post('/api/skins', (req, res) => {
  const body = req.body;
  if (!body.id || !body.name) return res.status(400).json({ error: 'missing fields' });
  skins.push(body);
  res.status(201).json(body);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('API running on', port));
```

Probar con curl:

```bash
curl http://localhost:4000/api/skins
curl http://localhost:4000/api/skins/mirage_gamma
curl -X POST -H "Content-Type: application/json" -d '{"id":"test","name":"Test"}' http://localhost:4000/api/skins
```

---

## 4. Persistencia: SQLite (local) o Postgres
- Para desarrollo local `sqlite` es simple: no requiere servidor.
- Usa `knex` o `better-sqlite3` para consultas seguras.

Ejemplo con `better-sqlite3`:

```js
import Database from 'better-sqlite3';
const db = new Database('data.db');
// Crear tabla
db.prepare('CREATE TABLE IF NOT EXISTS skins (id TEXT PRIMARY KEY, name TEXT, price INTEGER, texture TEXT)').run();
// Insert
const insert = db.prepare('INSERT OR REPLACE INTO skins (id,name,price,texture) VALUES (?,?,?,?)');
insert.run('mirage_gamma','Gamma Doppler',1980,'/models/mi_skin.png');
// Query
const rows = db.prepare('SELECT * FROM skins').all();
```

---

## 5. Validación y seguridad
- Validación: `Joi` o `zod` para validar `req.body`.
- Sanitizar entradas.
- Evitar inyección SQL: usar consultas parametrizadas.
- Autenticación (opcional para endpoints admin): JWT.
- Middleware de rate limiting: `express-rate-limit`.

---

## 6. CORS y consumo desde tu app React
- Habilita CORS en Express (`npm i cors`), o configura cabeceras específicas.
- En React, consume con `fetch('/api/skins')` o la URL completa en producción.

---

## 7. API avanzada: subir texturas y servir archivos
- Para subir imágenes usa `multer` en Express.
- Guardar en `public/uploads` y servir desde `/uploads/xxx.png`.

Ejemplo rápido con `multer`:

```js
import multer from 'multer';
const upload = multer({ dest: 'public/uploads/' });
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({ path: `/uploads/${req.file.filename}` });
});
```

En React, usa `FormData` para enviar archivos.

---

## 8. Documentar la API: OpenAPI / Swagger
- Añade `swagger-jsdoc` + `swagger-ui-express` para tener documentación interactiva.

---

## 9. Testing
- Tests unitarios: `jest` o `vitest`.
- Tests de endpoints: `supertest`.

---

## 10. Despliegue
- Opciones fáciles: Vercel (serverless), Railway, Render, Fly.io, Heroku (si sigue disponible).
- Para Docker: crea `Dockerfile` y `docker-compose` si necesitas DB.

Dockerfile mínima:

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
CMD ["node","index.js"]
```

---

## 11. Buenas prácticas y tips
- Versiona tu API (`/api/v1/skins`).
- Usa env vars para secretos (`.env`).
- Poner límites de tamaño para uploads.
- Logs y monitorización (Sentry, LogDNA).
- Backup de DB si usas Postgres.

---

## 12. Recursos y lectura
- Express docs: https://expressjs.com/
- Node.js: https://nodejs.org/
- Knex.js: http://knexjs.org/
- better-sqlite3: https://github.com/WiseLibs/better-sqlite3
- Multer: https://github.com/expressjs/multer
- Swagger UI Express: https://github.com/scottie1984/swagger-ui-express
- JWT authentication: https://jwt.io/

---

## 13. ¿Qué puedo crear ahora por ti?
Responde con lo que quieres que genere del siguiente grupo:
1) `backend/index.js` de ejemplo (ya incluido arriba) en la carpeta `backend/` y `package.json` listo.
2) `scripts/scrapeSkins.js` (cheerio) para una URL que indiques.
3) `backend/upload` endpoint con `multer` y ejemplo de `FormData` en React.
4) `README` corto en `backend/` con comandos de inicio.


---
Documento creado en: `docs/montar-apis.md`
