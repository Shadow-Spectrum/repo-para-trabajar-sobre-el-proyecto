# Shadow Spectrum

Visualizador 3D de skins de Counter-Strike 2 con WebGL.

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-1F6FEB?style=flat-square)
![WebGL](https://img.shields.io/badge/WebGL-0D1117?style=flat-square&logo=webgl&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-0D1117?style=flat-square&logo=javascript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-0D1117?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-0D1117?style=flat-square&logo=css3&logoColor=white)

<!-- Cuando tengas una captura, guárdala como docs/preview.png y descomenta la línea:
![Vista previa](docs/preview.png)
-->

## Descripción

Aplicación web interactiva para inspeccionar en 3D las skins de armas de Counter-Strike 2. El objetivo es que cualquier jugador pueda ver una skin desde todos los ángulos antes de elegirla.

## Funcionalidades

- Modelo 3D de un karambit.
- Rotación con el ratón.
- Zoom.
- Cambio de skin.
- Cambio del fondo de la escena.

## Estructura del repositorio

| Carpeta | Contenido |
|---------|-----------|
| `landing/` | Página de presentación del proyecto |
| `knifes-proyects/` | Proyectos de visualización de cuchillos |
| `docs/` | Documentación |

## Cómo ejecutarlo

1. Clona el repositorio:

```bash
git clone https://github.com/Shadow-Spectrum/repo-para-trabajar-sobre-el-proyecto.git
cd repo-para-trabajar-sobre-el-proyecto
```

2. Arranca un servidor local en la carpeta del proyecto (WebGL suele necesitarlo para cargar los modelos):

```bash
python3 -m http.server 8000
```

3. Abre `http://localhost:8000` en el navegador.

## Hoja de ruta

- [x] Visor 3D con rotación, zoom, cambio de skin y de fondo
- [ ] API REST propia con Spring Boot que devuelva la lista de skins
- [ ] Base de datos PostgreSQL para guardar las skins
- [ ] Cargar las skins desde la API
- [ ] Despliegue online (visor y API)
- [ ] Más modelos de armas y cuchillos

## Aviso legal

Counter-Strike 2 y sus skins son propiedad de Valve Corporation. Este proyecto es independiente y no está afiliado a Valve ni respaldado por ella.

## Autor

Cristian Peligros · [GitHub](https://github.com/kenyZ-ll) · [LinkedIn](https://www.linkedin.com/in/cristian-peligros-63513738a/)
