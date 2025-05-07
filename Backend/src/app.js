const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require('./routes/Product.routes');
const expenseRoutes = require('./routes/Expense.routes');

app.use(cors());
app.use(express.json());


app.use('/api/todos', todoRoutes); // base path
app.use('/api/expenses', expenseRoutes); // base path

module.exports = app;
