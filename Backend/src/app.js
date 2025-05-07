const express = require('express');
const app = express();
const cors = require('cors');
const cart = require('./routes/cart.routes');

app.use(cors());
app.use(express.json());
app.use('/cart', cart);



module.exports = app;
