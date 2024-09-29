const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Middleware para manejar datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir archivos estáticos (CSS, JS)

// Array para almacenar notas
let notas = [];

// Ruta principal para servir el HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener las notas
app.get('/notas', (req, res) => {
  res.json(notas);
});

// Ruta para agregar una nota
app.post('/notas', (req, res) => {
  const nuevaNota = req.body.nota;
  if (nuevaNota) {
    notas.push(nuevaNota);
    res.status(201).json({ mensaje: 'Nota agregada' });
  } else {
    res.status(400).json({ mensaje: 'Nota no válida' });
  }
});

// Ruta para eliminar una nota
app.delete('/notas/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < notas.length) {
    notas.splice(index, 1);
    res.json({ mensaje: 'Nota eliminada' });
  } else {
    res.status(404).json({ mensaje: 'Nota no encontrada' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
