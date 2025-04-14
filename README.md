# Sistema de Reportes de Estacionamiento

Este proyecto de aplicación web permite registrar y consultar los horarios y precios de un estacionamiento, esto generando reportes que se pueden filtrar por fecha y hora y descargar en formatos xlsx y pdf, es una prueba desarrollada por Ángel David Lerma Carrera para el puesto de desarrollador en la empresa Grupo Garza Limón.
---

## Configuración del Backend

### Requerimientos
- Node.js >= 14.x
- MySQL o MariaDB
- npm

### Instalación

```bash
# Primero debes clonar el repositorio
git clone <https://github.com/david-carrerx/Estacionamiento.git>

# Luego navegar a la carpeta del Backend
cd backend

# Instala las dependencias
npm install
```

### Configuración

Debes crear un archivo `.env` en la raíz del backend con la siguiente estructura:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=parkingdb
PORT=3000
```

### Base de datos MySQL o MariaDB

Puedes crear la base de datos ejecutando este script, de igual forma este se encuentra en un archivo llamado packing.sql:

```sql
CREATE DATABASE IF NOT EXISTS parkingdb;
USE parkingdb;

CREATE TABLE IF NOT EXISTS parking_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  license_plate VARCHAR(10) NOT NULL,
  vehicle_type ENUM('oficial', 'residente', 'no_residente') NOT NULL,
  entry_time DATETIME NOT NULL,
  exit_time DATETIME,
  total_time_minutes INT,
  total_amount DECIMAL(10, 2)
);
```

### Ejecutar el backend

```bash
#Ahora para correr el backend usa el siguiente comando, en caso de tener el puerto ocupado puedes cambiarlo en el archivo .env
npm run dev
```

Esto iniciará el backend en `http://localhost:3000`.

---

## Frontend

### Requerimientos
- Node.js >= 14.x
- npm

### Instalación

```bash
# Primero navega al frontend
cd frontend

# Instala las dependencias
npm install
```

### Configuración

En el archivo `src/services/api.js`, asegúrate que la URL de la API apunte correctamente en la  que este el backend ejecutandose:

```js
const API_URL = 'http://localhost:3000';
```

### Ejecutar el frontend

```bash
#Corre en el navegador
npm start
```

Esto abrirá la aplicación en tu navegador en `http://localhost:3000`.

---

## Funcionalidades

- Consulta de registros por fechas (`desde` y `hasta`)
- Visualización del reporte:
  - Placa
  - Tipo de vehículo
  - Hora de entrada y salida
  - Tiempo total
  - Total a pagar
- Generación de reportes:
  - Excel (`.xlsx`)
  - PDF (`.pdf`)

---

## 📂 Estructura del proyecto

```
/backend
  └── index.js, routes, controllers, database.js
/frontend
  └── src/components/ReportForm.js
  └── src/services/api.js
```

---

## 🧑‍💻 Autor

Ángel David Lerma Carrera