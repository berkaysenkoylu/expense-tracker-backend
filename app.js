require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const handleErrors = require('./middleware/handleErrors');
const sequelize = require('./utils/database');

// Database models
const Expense = require('./models/expense');
const User = require('./models/user');

const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// NORMAL ROUTES
app.use('/api/expenses', expenseRoutes);
app.use('/api/users', userRoutes);

app.use(handleErrors);

// Database associations
User.hasMany(Expense, { constraints: true, onDelete: 'CASCADE' });
Expense.belongsTo(User);

sequelize.sync().then(() => {
    console.log('Connection has been established successfully.');
    app.listen(process.env.PORT || 8000);
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});