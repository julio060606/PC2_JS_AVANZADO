# Proyecto PC2 - Js Avanzado (Frontend & Backend)

Bienvenido al repositorio central para nuestra evaluación PC2. Este repositorio es un **monorepo** que contiene tanto el backend (Spring Boot) como el frontend (Angular). 

Todo está configurado para trabajar de forma fluida a través de **GitHub Codespaces**.

---

## 📂 Estructura del Proyecto

```text
mi-proyecto-pc2/
├── backend/          <-- API RESTful en Java (Spring Boot)
│   ├── src/
│   ├── pom.xml
│   └── ...
├── frontend/         <-- Aplicación SPA en TypeScript (Angular)
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md

Paso 1: Levantar el Backend (Spring Boot)
Abre una nueva terminal en Codespaces (Ctrl + Shift + ``` o desde el menú).

Ingresa a la carpeta del backend y ejecuta la aplicación:
cd backend
./mvnw spring-boot:run

Paso 2: Levantar el Frontend (Angular)
Divide la terminal de Codespaces (haz clic en el ícono de las dos ventanas juntas en el panel de terminal) o abre una segunda terminal.

Ingresa a la carpeta del frontend, instala las dependencias y levanta el servidor:
cd frontend
npm install
ng serve
(Nota: El comando npm install es obligatorio la primera vez que entras al Codespace para que se genere la carpeta node_modules).

Paso 3: Puertos y CORS
El Backend corre en el puerto 8080.

El Frontend corre en el puerto 4200.

⚠️ MUY IMPORTANTE: Ve a la pestaña "Ports" (Puertos) en la parte inferior de Codespaces. Asegúrate de que la "Visibility" (Visibilidad) del puerto 8080 esté en Public. Si está en Private, el frontend de Angular no podrá conectarse a la API.

🌐 Enlaces de Despliegue (Producción)
Cuando hagamos un push a la rama main, las plataformas desplegarán los cambios automáticamente:

Frontend (Vercel): [URL_PENDIENTE_AQUI]

Backend (Render): [URL_PENDIENTE_AQUI]

📝 Reglas de Trabajo para el Examen
Rutas Relativas/Variables de Entorno: En Angular, usamos variables de entorno para consumir la API. Si modificas los servicios, asegúrate de usar environment.apiUrl en lugar de quemar http://localhost:8080.

Commits Claros: Tratemos de hacer commits separados si el cambio es netamente del front o del back. Si es una función completa (ej: Endpoint de Tareas + Vista), se puede hacer en uno solo.




