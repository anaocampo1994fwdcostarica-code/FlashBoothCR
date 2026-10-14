# Despliegue y cabeceras de seguridad

El repositorio no contiene configuración de Netlify, Vercel, Firebase, Cloudflare, GitHub Pages ni otro hosting. Las siguientes cabeceras son una propuesta para adaptar al proveedor elegido; no están aplicadas por este archivo.

## Cabeceras recomendadas

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; media-src 'self'; connect-src 'self'; form-action 'self'; upgrade-insecure-requests
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

Si se configura `VITE_CONTACT_FORM_ENDPOINT`, hay que agregar exclusivamente el origen HTTPS de ese proveedor a `connect-src`. La directiva `style-src` conserva `'unsafe-inline'` porque la interfaz actual usa estilos dinámicos en línea; retirarla requiere refactorizar esos estilos a clases o variables autorizadas mediante nonce/hash.

`frame-ancestors` solo tiene efecto como cabecera HTTP, no dentro de una etiqueta `<meta>`. Verifica las cabeceras sobre la URL pública después de desplegar.
