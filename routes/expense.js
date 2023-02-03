const express = require('express');

const checkAuth = require('../middleware/checkAuth');
const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/', expenseController.getAllExpenses);

router.post('/', checkAuth, expenseController.createExpense);

module.exports = router;