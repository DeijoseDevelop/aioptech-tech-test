const express = require('express');
const connection = require('./dbConnection');

const app = express();
const PORT = 3000;

app.get('/test-db', (req, res) => {
  const query = 'SELECT * FROM vehiculos';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).send('Error en la consulta');
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});