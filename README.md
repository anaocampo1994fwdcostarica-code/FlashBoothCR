# FlashBooth Costa Rica — sitio web

Sitio de una sola página hecho con React, Vite y Tailwind CSS.

## Correr el proyecto

Requiere Node.js 20 o superior.

```sh
npm install
npm run dev      # http://localhost:5173
npm test         # pruebas de cálculo de precios y enlaces de WhatsApp
```

## Cambiar precios y paquetes

Edita `src/data/packages.js`. Cada paquete tiene `name`, `desc`, `popular` (recomendado), la lista `features` y `prices`: una entrada por duración (`hours`, `label` y `price` en colones, sin puntos). El cotizador usa el precio exacto de la combinación paquete + duración.

Los beneficios comunes están en `INCLUDED_IN_ALL` y la nota de créditos de cortesía en `CREDITS_NOTE`, en el mismo archivo.

## Cambiar WhatsApp, redes y correo

Todo está en `src/config/site.js`:

- `WHATSAPP_NUMBER`: con código de país y sin espacios ni guiones (ej. `50687212900`).
- `WHATSAPP_DISPLAY`: cómo se muestra el número (ej. `8721-2900`).
- `INSTAGRAM_URL`, `FACEBOOK_URL`, `TIKTOK_URL`.
- `CONTACT_EMAIL`.

Todos los botones de WhatsApp usan `waLink()`, así que basta con cambiar el número ahí. Si cambias el teléfono o las redes, actualiza también el bloque JSON-LD y las etiquetas Open Graph de `index.html`.

## Agregar u optimizar imágenes

Los originales pesados viven en `assets-originales/` (fuera de `public/` y de Git). Para agregar fotos a la galería, las tiras o las comparaciones:

1. Copia el original (JPG o PNG) en `assets-originales/images/gallery`, `assets-originales/photo-strips/trimmed` o `assets-originales/comparisons`.
2. Ejecuta `npm run optimize:images`. Genera un `.webp` (máx. 1600 px de ancho, calidad 80) en la carpeta equivalente de `public/`, con el nombre en kebab-case.
3. Usa la ruta `.webp` en el componente (`Gallery.jsx`, `RealEvents.jsx` o `VideosExperiences.jsx`).

Evita nombres de archivo con espacios o mayúsculas.

## Build de producción

```sh
npm run build    # genera dist/
npm run preview  # revisa el build localmente
```

Publica solo la carpeta `dist/`. Las cabeceras de seguridad recomendadas están en `DEPLOYMENT.md`.
