# Proyecto PC2 - Frontend Angular Y Backend Spring Boot

Aplicacion fullstack de demostracion con cuatro modulos:

- Cafeteria: consultar productos y registrar pedidos que descuentan stock.
- Laboratorio: registrar incidencias y actualizar su estado de atencion.
- Matricula: consultar cursos y solicitar matriculas que descuentan vacantes.
- Tareas: administrar entregas con estado, fecha y prioridad.

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

El esquema PostgreSQL recrea las tablas academicas y carga datos de demostracion:

```text
backend/database/001_schema_inicial.sql
```

Para preparar la base de demostracion, ejecutar manualmente ese script en
pgAdmin. El script elimina las tablas anteriores, por lo que debe usarse en
una base destinada a esta demostracion.

## Endpoints Principales

```text
GET  /api/productos
GET  /api/productos/{id}
POST /api/pedidos
GET  /api/incidencias
POST /api/incidencias
PUT  /api/incidencias/{id}/estado
GET  /api/cursos
GET  /api/cursos/{id}
POST /api/matriculas
GET  /api/tareas
POST /api/tareas
PUT  /api/tareas/{id}
DELETE /api/tareas/{id}
```

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
SPA como `/productos`, `/pedidos`, `/incidencias/dashboard`, `/cursos`,
`/matricula` y `/tareas`.

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
