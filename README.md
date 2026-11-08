# Invitación de boda · Enma & Diego

Aplicación Next.js + TypeScript + Tailwind, preparada para desplegar en Vercel. La invitación usa la fecha del 4 de diciembre de 2026 y los datos editables del evento están centralizados en `config.ts`. La portada incluye un aro floral ilustrado, y se cargan Cormorant Garamond, Alex Brush y Montserrat desde Google Fonts.

## Requisitos e inicio

1. Instala Node.js 20 o posterior.
2. Copia `.env.example` a `.env.local` y completa las variables. Define claves largas y únicas para el panel.
3. En Supabase, ejecuta `supabase/schema.sql` desde el editor SQL.
4. Instala e inicia: `npm install` y `npm run dev`.
5. Abre `http://localhost:3000`. El panel se encuentra en `/admin`.

Sin Supabase configurado, la invitación pública se muestra, pero las confirmaciones, enlaces únicos y administración no pueden acceder a datos.

## Invitados y enlaces

El panel permite crear, editar, eliminar, buscar y filtrar invitados. Copia el enlace desde la tabla para compartir `/i/TOKEN`. La importación CSV acepta columnas `nombre,pases,notas`; exporta estado y enlace desde el botón CSV. La respuesta se guarda como `confirmed` o `declined` en Supabase.

## Despliegue en Vercel

Importa el repositorio en Vercel, define las cuatro variables de `.env.example` en la configuración del proyecto y despliega. `NEXT_PUBLIC_SITE_URL` debe ser la URL pública final. Mantén `SUPABASE_SERVICE_ROLE_KEY` y la clave del panel solo como variables de servidor. Las fotos originales están en `public/fotos` y pesan varios MB; para producción conviene generar derivados WebP/AVIF y ajustar las referencias de `config.ts` si se desea reducir el peso de descarga.

## Personalización

Actualiza nombres, fecha, zona horaria, horarios, sedes, enlaces Maps, vestuario, itinerario, opciones de regalo, álbum y contacto en `config.ts`. El QR de regalo está pendiente de la imagen correspondiente. Las fotografías adjuntas se conservan en `public/fotos`, incluidas `DSC09911.jpg` y `DSC09914.jpg`.
