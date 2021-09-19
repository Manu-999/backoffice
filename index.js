const express = require('express');

const app = express();
require('dotenv').config();

// Inicialización del puerto del servidor en base a la variable NODE_ENV
const port = process.env.NODE_ENV === 'development' ?
           3000 :
           8000;

// Routes
const productRoute = require('./routes/product');
const paymentRoute = require('./routes/payment');

app.use(express.json());

app.use('/api', productRoute);
app.use('/api', paymentRoute);

// Starting the server
app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
