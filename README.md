# Movies App - Vue 3 Boilerplate

Proyecto Vue 3 con Clean Architecture, TypeScript, TanStack Query, Pinia, Tailwind CSS y Zod.

> **Nota**: Este proyecto usa [pnpm](https://pnpm.io/) como gestor de paquetes. Si no lo tienes instalado, puedes instalarlo con: `npm install -g pnpm`

## 🚀 Características

- ✅ Vue 3.5+ con Composition API
- ✅ TypeScript
- ✅ Clean Architecture
- ✅ TanStack Query (Vue Query)
- ✅ Pinia para gestión de estado
- ✅ Tailwind CSS (estilo Disney+)
- ✅ Axios para peticiones HTTP
- ✅ @iconify/vue para iconos
- ✅ Zod para validaciones y entidades
- ✅ Vue Router
- ✅ ESLint
- ✅ Vitest para testing

## 📦 Instalación

```bash
pnpm install
```

## 🏃 Desarrollo

```bash
pnpm dev
```

## 🏗️ Build

```bash
pnpm build
```

## 🧪 Testing

```bash
pnpm test
```

## 🐳 Docker

### Prerrequisitos

- Docker instalado ([https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/))
- Docker Compose instalado (incluido en Docker Desktop)

### Configuración

1. **Asegúrate de tener el archivo `.env` configurado** con tus variables de entorno:
   ```env
   VITE_OMDB_API_KEY=tu_clave_de_api_aqui
   VITE_API_URL=https://www.omdbapi.com
   ```

### Construcción y Ejecución

#### Opción 1: Usando Docker Compose (Recomendado)

```bash
# Construir y ejecutar el contenedor
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d --build

# Detener el contenedor
docker-compose down
```

La aplicación estará disponible en: `http://localhost:8081`

#### Opción 2: Usando Docker directamente

```bash
# Construir la imagen
docker build -t verifarma-challenge .

# Ejecutar el contenedor
docker run -d -p 8081:80 --name verifarma-challenge verifarma-challenge

# Detener el contenedor
docker stop verifarma-challenge

# Eliminar el contenedor
docker rm verifarma-challenge
```

### Notas sobre Docker

- **Variables de Entorno**: Las variables de entorno deben estar configuradas en el archivo `.env` antes de construir la imagen, ya que Vite las incluye en el build. Docker Compose leerá automáticamente el archivo `.env` y pasará las variables como build arguments.
- **Puerto**: Por defecto, la aplicación se sirve en el puerto `8081` del host. Puedes cambiarlo modificando el puerto en `docker-compose.yml` o en el comando `docker run`.
- **Nginx**: La aplicación se sirve usando nginx en modo producción, optimizado para servir archivos estáticos y manejar el routing de Vue Router (SPA).
- **Build Arguments**: Si usas Docker directamente (sin docker-compose), necesitas pasar las variables de entorno como build arguments:
  ```bash
  docker build --build-arg VITE_OMDB_API_KEY=tu_clave --build-arg VITE_API_URL=https://www.omdbapi.com -t verifarma-challenge .
  ```

## 📁 Estructura del Proyecto

```
src/
├── application/      # Capa de aplicación (stores, casos de uso)
├── core/            # Capa de dominio (entidades, repositorios)
├── data/            # Capa de datos (implementación de repositorios, API, composables)
├── presentation/    # Capa de presentación (componentes, páginas, hooks)
├── shared/          # Código compartido (configuración, utilidades)
└── test/            # Tests
```

## 🔑 Variables de Entorno

### Configuración de OMDb API

1. **Obtener una API Key de OMDb:**
   - Visita [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
   - Regístrate para obtener una API key gratuita (1000 requests/día) o de pago

2. **Configurar el archivo `.env`:**
   
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   # OMDb API Configuration
   VITE_OMDB_API_KEY=tu_clave_de_api_aqui
   VITE_API_URL=https://www.omdbapi.com
   ```

   **Importante:** 
   - Reemplaza `tu_clave_de_api_aqui` con tu API key real de OMDb
   - Solo incluye la API key, NO incluyas la URL completa
   - Ejemplo correcto: `VITE_OMDB_API_KEY=3488191e`
   - Ejemplo incorrecto: `VITE_OMDB_API_KEY=https://www.omdbapi.com/?apikey=3488191e`

3. **Ejemplo de archivo `.env`:**
   ```env
   VITE_OMDB_API_KEY=3488191e
   VITE_API_URL=https://www.omdbapi.com
   ```
   
   > **Nota:** Si accidentalmente configuraste la URL completa en `VITE_OMDB_API_KEY`, el código intentará extraer la clave automáticamente, pero es mejor configurarlo correctamente.

> **Nota:** El archivo `.env` no debe ser commiteado al repositorio. Asegúrate de que esté en `.gitignore`.

## 🎨 Diseño

El proyecto utiliza un diseño inspirado en Disney+ con:
- Colores oscuros (background: #0A0E27)
- Tipografía Inter
- Cards con hover effects
- Transiciones suaves

## 📝 Notas

- El login es dummy, acepta cualquier email y contraseña
- Los composables de películas están en `src/data/composables/useMovies.ts`
- Las entidades están definidas con Zod en `src/core/entities/`
- La aplicación consume la API de OMDb para obtener información de películas
- Los componentes skeleton se muestran durante la carga asíncrona de datos

## 🎬 Funcionalidades

### Pantallas Implementadas

1. **Pantalla de Login** (`/login`)
   - Autenticación dummy con email y contraseña
   - Validación de formulario con Zod

2. **Pantalla de Listado de Películas** (`/movies`)
   - Búsqueda de películas usando OMDb API
   - Paginación de resultados
   - Skeletons durante la carga
   - Navegación a página de detalle

3. **Pantalla de Detalle de Película** (`/movies/:id`)
   - Información completa de la película
   - Premios, ratings, sinopsis, actores, director, etc.
   - Skeleton durante la carga

### Características Técnicas

- **Clean Architecture**: Separación en capas (presentation, application, core, data)
- **TypeScript**: Tipado estático para mayor seguridad
- **TanStack Query**: Gestión de estado del servidor y caché
- **Skeletons**: Componentes de carga para mejor UX
- **Responsive Design**: Diseño adaptativo para móviles y desktop
- **Accesibilidad**: Estructura semántica y navegación por teclado

