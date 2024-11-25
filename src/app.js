const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const path = require('path');
const { connectToDB } = require('./config/db');


const app = express();

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000'); // Mensaje de confirmación al iniciar el servidor
});

