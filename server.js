import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

// Coordenadas del centro (Venezuela)
const latitude = 8.0;
const longitude = -66.0;
const maxradiuskm = 800;

// Servir carpeta public
app.use(express.static("public"));

app.get("/sismos", async (req, res) => {
  try {
    // Fecha actual
    const now = new Date();

    // Intento 1: últimos 1 día
    let past = new Date(now);
    past.setDate(now.getDate() - 1);

    let quakes = await buscarSismos(past, now);

    // Si no hay suficientes, intento 2: últimos 3 días
    if (quakes.length < 5) {
      past = new Date(now);
      past.setDate(now.getDate() - 3);
      quakes = await buscarSismos(past, now);
    }

    // Si aún no hay suficientes, intento 3: últimos 7 días
    if (quakes.length < 5) {
      past = new Date(now);
      past.setDate(now.getDate() - 7);
      quakes = await buscarSismos(past, now);
    }

    res.json(quakes.slice(0, 10));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo datos sísmicos" });
  }
});

// Función para buscar sismos
async function buscarSismos(start, end) {
  const params = new URLSearchParams({
    format: "geojson",
    starttime: start.toISOString().split("T")[0],
    endtime: end.toISOString().split("T")[0],
    minmagnitude: 2.5,
    latitude,
    longitude,
    maxradiuskm,
  });

  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?${params.toString()}`;
  const response = await fetch(url);
  const data = await response.json();

  return data.features.map((f) => ({
    lugar: f.properties.place,
    magnitud: f.properties.mag,
    tiempo: new Date(f.properties.time).toLocaleString(),
    lon: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
  }));
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
