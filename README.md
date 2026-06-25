# 🌋 Sismostemu — Sismos recientes cerca de Venezuela

Sismostemu es un servidor Node.js que obtiene en tiempo real los sismos más recientes registrados por el USGS cerca de Venezuela.  
El backend filtra automáticamente los eventos de las últimas horas y días para mostrar siempre los más recientes.

## 🚀 Tecnologías usadas
- Node.js
- Express
- node-fetch
- HTML + CSS + JS (frontend)
- API USGS Earthquake

## 📡 Endpoint principal
/sismos

Devuelve un JSON con:
- Lugar
- Magnitud
- Fecha y hora
- Coordenadas

## 🌍 Frontend
El archivo `public/index.html` muestra:
- Mapa interactivo
- Tabla con los últimos sismos
- Datos actualizados automáticamente

## 🛠 Cómo ejecutar localmente
```bash
npm install
npm start
Servidor en:
http://localhost:3000
