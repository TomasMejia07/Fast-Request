const express = require('express');

const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});