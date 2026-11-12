# Publicación y cabeceras de seguridad

## Estado

No hay un proveedor de hosting configurado en el repositorio. Por ello estas cabeceras **no están activas** todavía: deben configurarse mediante el mecanismo oficial del proveedor elegido y verificarse sobre la URL HTTPS pública. El artefacto publicable es `dist/`, generado con `npm run build`; `vite dev` y `vite preview` no son servidores de producción.

## Recursos revisados

- Aplicación, imágenes, videos y JavaScript: mismo origen (`'self'`).
- Tipografías: `https://fonts.googleapis.com` y `https://fonts.gstatic.com`.
- Navegaciones iniciadas por el usuario: WhatsApp (`https://wa.me`), Instagram, Facebook y TikTok (URLs en `src/config/site.js`). No requieren `connect-src`.
- Formulario: no envía datos a ningún servidor; arma el mensaje y abre WhatsApp. `connect-src` se mantiene en `'self'`.
- La interfaz utiliza atributos de estilo dinámicos, por lo que la CSP debe conservar `'unsafe-inline'` únicamente en `style-src`. No se permiten scripts inline ni `unsafe-eval`.

## Cabeceras para producción HTTPS

Configura estas cabeceras HTTP exactamente en el proveedor, primero como `Content-Security-Policy-Report-Only` si el proveedor admite ese modo. Tras revisar las infracciones reales y confirmar que fuentes, imágenes, videos, modales, cotizador y enlaces externos funcionan, cambia el nombre a `Content-Security-Policy`.

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'; media-src 'self'; connect-src 'self'; form-action 'self'; upgrade-insecure-requests
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), clipboard-read=(), clipboard-write=(), fullscreen=(self), picture-in-picture=(self)
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

`frame-ancestors 'none'` evita que terceros incluyan FlashBooth en un marco. Solo funciona como cabecera HTTP, no como etiqueta `meta`.

No añadas `Strict-Transport-Security` durante validación local. Después de confirmar que el dominio público y todas sus rutas funcionan exclusivamente por HTTPS, añade:

```text
Strict-Transport-Security: max-age=31536000
```

No uses `includeSubDomains` ni `preload` hasta confirmar que todos los subdominios pertenecen al sitio y admiten HTTPS.

## Endpoint de contacto futuro

Hoy el formulario solo abre WhatsApp. Si en el futuro se habilita un endpoint, debe ser una URL HTTPS de un proveedor definido, con protección contra abuso. Añade solamente su origen exacto a `connect-src`; por ejemplo, para `https://forms.example.com/submit`:

```text
connect-src 'self' https://forms.example.com
```

No publiques secretos en `VITE_*`: esas variables se incorporan al JavaScript del navegador. Mantén los valores reales en `.env.*`, que están ignorados por Git, y conserva `.env.example` vacío.

## Pasos cuando se elija el proveedor

1. Configura el build como `npm run build` y publica únicamente `dist/`.
2. Activa HTTPS administrado por el proveedor y la redirección HTTP a HTTPS.
3. Aplica primero la CSP en modo Report-Only, junto con las demás cabeceras.
4. Prueba la interfaz y revisa los informes/consola sin enviar consultas reales por WhatsApp.
5. Activa la CSP definitiva, configura HSTS según la sección anterior y verifica las cabeceras en la respuesta HTTPS pública, por ejemplo:

   ```sh
   curl -I https://tu-dominio.example/
   ```

6. Confirma que no se sirven archivos `.env` ni sourcemaps. Vite ya genera el build con `sourcemap: false`.
