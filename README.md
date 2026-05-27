# Proyecto PC2 - Frontend Angular Y Backend Spring Boot

Aplicacion fullstack de demostracion con cuatro modulos:

- Productos: listar y registrar.
- Incidencias: listar y actualizar.
- Cursos: listar y matricular estudiantes.
- Tareas: listar, registrar, actualizar y eliminar.

## Estructura

```text
PC2_JS_AVANZADO/
|-- backend/     API REST Spring Boot + PostgreSQL
|-- frontend/    SPA Angular
`-- README.md
```

## Desarrollo Local

### Backend

El backend usa variables de entorno para PostgreSQL. Para IntelliJ o ejecucion
local, crear `backend/env/local.env` tomando como referencia
`backend/env/local.env.example`. Este archivo esta excluido de Git.

Desde `backend/`:

```powershell
.\scripts\mvn-local.cmd spring-boot:run
```

La API queda disponible en `http://localhost:8080/api`.

### Frontend

El frontend usa exclusivamente `pnpm` y conserva `pnpm-lock.yaml`.

Desde `frontend/`:

```powershell
pnpm install
pnpm start
```

La SPA queda disponible en `http://localhost:4200`.

## Base De Datos

El esquema PostgreSQL se mantiene en:

```text
backend/database/001_schema_inicial.sql
```

Para preparar la base de demostracion, ejecutar manualmente ese script en
pgAdmin. Los `INSERT` opcionales del final pueden ejecutarse una sola vez para
mostrar datos iniciales durante la presentacion.

## Despliegue Backend En Render

Crear el Web Service desde este repositorio con estos valores:

```text
Root Directory: backend
Runtime: Docker
Dockerfile: Dockerfile
Health Check Path: /api/productos
```

Configurar las variables del servicio:

```text
DB_URL=jdbc:postgresql://HOST_INTERNO_RENDER:5432/BASE_RENDER
DB_USERNAME=USUARIO_RENDER
DB_PASSWORD=PASSWORD_RENDER
DDL_AUTO=validate
CORS_ALLOWED_ORIGINS=http://localhost:4200
```

`DDL_AUTO=validate` hace que Hibernate valide las tablas creadas por el script
sin intentar construir el esquema durante el despliegue.

Una vez que Vercel entregue la URL del frontend, actualizar Render:

```text
CORS_ALLOWED_ORIGINS=http://localhost:4200,https://URL-FRONTEND-VERCEL
```

## Despliegue Frontend En Vercel

Antes de crear el deploy, reemplazar en
`frontend/src/environments/environment.production.ts` la URL local por la URL
publica real de Render:

```ts
export const environment = {
  production: true,
  apiUrl: 'https://URL-BACKEND-RENDER/api',
};
```

Configurar el proyecto Vercel:

```text
Root Directory: frontend
Framework Preset: Angular
Install Command: pnpm install --frozen-lockfile
Build Command: pnpm build
Output Directory: dist/mi-app/browser
```

El archivo `frontend/vercel.json` permite abrir y recargar directamente rutas
SPA como `/productos`, `/incidencias`, `/cursos` y `/tareas`.

## Enlaces De Produccion

Completar al finalizar los despliegues:

```text
Frontend (Vercel): https://URL-FRONTEND-VERCEL
Backend (Render):  https://URL-BACKEND-RENDER
```

## Checklist Para Presentacion

1. Confirmar que la base Render contiene tablas y datos de prueba.
2. Abrir `https://URL-BACKEND-RENDER/api/productos` minutos antes para
   despertar el servicio gratuito.
3. Abrir el frontend Vercel y recorrer los cuatro modulos.
4. Probar una operacion representativa en cada modulo.
5. No versionar `backend/env/local.env` ni credenciales de Render.

