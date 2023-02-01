const express = require('express');

const expenseController = require('../controllers/expense')

const router = express.Router();

router.get('/', expenseController.getAllExpenses);

router.post('/', expenseController.createExpense);

module.exports = router;