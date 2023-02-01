const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');

const User = require('../models/user');

const inputValidation = require('../utils/validateInput');

exports.getUsers = (req, res, next) => {
    User.findAll({
        attributes: {
            exclude: ['password', 'resetToken', 'resetTokenExpiration']
        }
    }).then(result => {
        return res.status(200).json({
            message: "Users data has been fetched successfully!",
            users: result
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

exports.getUser = (req, res, next) => {
    
}

exports.createUser = (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;
    const formData = {
        firstName,
        lastName,
        username,
        email,
        password
    };

    // Check if anyfield is empty
    if(!inputValidation.isFieldNotEmpty(formData)) {
        let error = new Error();
        error.statusCode = 412;
        error.message = 'You cannot leave empty fields!';

        return next(error);
    }

    // Check if email is in a correct form
    if(!inputValidation.isEmail(req.body.email)) {
        let error = new Error();
        error.statusCode = 412;
        error.message = 'E-mail is not in a correct form!';

        return next(error);
    }

    // Check if any input field has non english characters
    if(inputValidation.includesNonEnglish(formData)) {
        let error = new Error();
        error.statusCode = 412;
        error.message = 'Make sure to use only english characters!';

        return next(error);
    }

    // Check if the password is in a correct form
    if(!inputValidation.isPasswordValid(req.body.password)) {
        let error = new Error();
        error.statusCode = 412;
        error.message = 'Make sure to enter a valid password!';

        return next(error);
    }

    User.findOne({
        where: {
            email: email
        }
    }).then(fetchedUser => {
        if(fetchedUser) {
            let error = new Error();
            error.statusCode = 400;
            error.message = 'Such an email already exists!';

            return next(error);
        }

        return bcrypt.hash(password, 12);
    }).then(hashedPassword => {
        return User.create({ password: hashedPassword, firstName, lastName, username, email });
    }).then(createdUser => {
        return res.status(201).json({
            message: 'User has been created successfully!',
            createdUser
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

exports.loginUser = (req, res, next) => {
    
}

exports.editUser = (req, res, next) => {
    
}

exports.deleteUser = (req, res, next) => {
    
}

exports.requestPasswordReset  = (req, res, next) => {
    
}

exports.resetPassword  = (req, res, next) => {
    
}

exports.changePassword  = (req, res, next) => {
    
}