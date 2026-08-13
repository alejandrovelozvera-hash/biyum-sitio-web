# Despliegue de Biyum en Hostinger

App Next.js (SSR) que reemplaza el sitio WordPress. WordPress se conserva en un
subdominio solo como almacenamiento (imágenes + datos del panel vía el plugin).

## Arquitectura final

- `biyum.agency` → app Next.js (el nuevo diseño, dominio principal)
- `wp.biyum.agency` → WordPress (biblioteca de medios + plugin Biyum Storage)
- El panel nuevo guarda proyectos y config en el REST API de `wp.biyum.agency`

## Prerrequisitos

- Plan Hostinger con soporte Node.js (Business/Cloud) o VPS
- Node 20+ disponible en la web app (usa Node 22 en hPanel)
- Repositorio Git del proyecto o el código comprimido

## 1) Mover WordPress a un subdominio

1. En hPanel crea el subdominio `wp.biyum.agency`.
2. Mueve la instalación de WordPress (incluido `wp-content/uploads`) a la carpeta
   del subdominio.
   - O bien usa el Asistente de WordPress/Hostinger para clonarla al subdominio.
3. En `wp-admin > Ajustes > Generales` cambia:
   - Dirección del sitio: `https://wp.biyum.agency`
   - Dirección de WordPress: `https://wp.biyum.agency`
4. Verifica que `https://wp.biyum.agency/wp-json/` responda `200`.

## 2) Instalar el plugin Biyum Storage en WordPress

1. Ve a `https://wp.biyum.agency/wp-admin > Plugins > Añadir nuevo > Subir plugin`.
2. Sube `wordpress/biyum-storage.php` y actívalo.
3. Ve a **Ajustes > Biyum Storage**, genera un token y guárdalo.
   - Las escrituras (crear/editar/borrar proyectos y config) requieren ese token.
4. Verifica el endpoint:
   `https://wp.biyum.agency/wp-json/biyum/v1/projects` → devuelve `[]` o la lista.

## 3) Publicar la app en el dominio principal

1. En hPanel crea una **Web App (Node.js)**.
   - Application type: `next`
   - Build script: `build`
   - Output directory: `.next` (o `standalone` si usas `output: "standalone"`)
   - Entry file: dejarlo por defecto (Hostinger ejecuta `next start`)
   - Node version: 22 LTS
2. Asigna el dominio principal `biyum.agency` a esta web app, de modo que la app
   quede en la raíz reemplazando el HTML de WordPress para ese dominio.
3. Sube el código (GitHub de Hostinger o archivo comprimido, sin `node_modules`).
4. Define las variables de entorno de la web app:
   - `NEXT_PUBLIC_WORDPRESS_URL=https://wp.biyum.agency`
   - `BIYUM_WP_TOKEN=<token del paso 2>`
   - `ADMIN_PASSWORD=<contraseña del panel>`
   - `NODE_ENV=production`

## 4) Verificación

1. `https://biyum.agency` → muestra el nuevo diseño (home + portafolio).
2. `https://biyum.agency/admin/login` → abre el panel usando `ADMIN_PASSWORD`.
3. Crea un proyecto: en la pestaña de imágenes deberían verse las de la
   biblioteca de WordPress (de `wp.biyum.agency`).
4. `https://biyum.agency/wp-json/...` → redirigido a `wp.biyum.agency` (config
   de `next.config.ts`, `redirects`).

## Notas

- Los enlaces viejos de imágenes (`/wp-content/...`, `/wp-json/...`) se redirigen
  automáticamente a `wp.biyum.agency` desde `next.config.ts`. Si tus medios están
  en otro subdominio, cambia `wpHost` ahí.
- Mientras `wp.biyum.agency` no esté configurado o el token no coincida, el
  sitio público usa datos demo (`src/lib/demo-data.ts`) para que nunca se vea roto.
- Si el plan no soporta Node.js, despliega en un VPS con PM2: `npm ci`, luego
  `npm run build`, y `pm2 start npm --name biyum -- start`.