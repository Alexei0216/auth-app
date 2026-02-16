# Instalación y ejecución del proyecto

Sigue estos pasos para ejecutar el proyecto en tu entorno local.

## Requisitos

Asegúrate de tener instalado:

* Docker
* Docker Compose
* Git

## Pasos de instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Configurar variables de entorno

Entra en la carpeta del servidor y crea el archivo `.env`:

```bash
cd server
cp .env.example .env
cd ..
```

### 3. Levantar los contenedores

```bash
docker compose up -d --build
```

Esto construirá las imágenes y levantará todos los servicios en segundo plano.

## Acceso a la aplicación

Una vez iniciado, la aplicación estará disponible en:

* Client: http://localhost:5174
* -(Server: http://localhost:5000)

## 🛑 Detener el proyecto

Para detener los contenedores:

```bash
docker compose down
```

---

¡Listo! El proyecto debería estar funcionando correctamente.
