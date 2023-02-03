const Expense = require('../models/expense');

exports.getAllExpenses = (req, res, next) => {
    Expense.findAll().then(result => {
        return res.status(200).json({
            message: "Expense data has been fetched successfully!",
            expenses: result
        });
    }).catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }

        if(!error.message) {
            error.message = 'Something went wrong!';
        }

        next(error);
    });
}

exports.createExpense = (req, res, next) => {
    const { name, category, price, currency, date, type } = req.body;
    const { userId } = req?.userData;

    Expense.create({ name, category, price, currency, date, type, userId }).then(newExpense => {
        return res.status(201).json({
            message: "Expense data has been created successfully!",
            expenseData: newExpense
        });
    }).catch(error => {
        if(!error.statusCode) {
            error.statusCode = 500;
        }

        if(!error.message) {
            error.message = 'Something went wrong!';
        }

        next(error);
    });
}