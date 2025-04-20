const express = require('express');

const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db.js');

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  db.query('SELECT NOW()', (err, results) => {
    if (err) return res.status(500).send('Error al conectar con la BD');
    res.send('Servidor conectado a MySQL. Hora actual: ' + results[0]['NOW()']);
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});