const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    User.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password', 'resetToken', 'resetTokenExpiration', 'createdAt', 'updatedAt'] } }).then(fetchedUser => {
        if (!fetchedUser) {
            let error = new Error();
            error.statusCode = 404;
            error.message = 'No such user was found!';

            return next(error);
        }

        return res.status(200).json({
            message: 'User has been fetched successfully!',
            userData: fetchedUser
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
    const { email, password } = req.body;
    const formData = {
        email, password
    };

    // Check if any form field is empty.
    if (!inputValidation.isFieldNotEmpty(formData)) {
        let error = new Error();
        error.statusCode = 412;
        error.message = 'You cannot leave empty fields!';

        return next(error);
    }

    let userData = {};

    User.findOne({
        where: {
            email: email
        }
    }).then(fetchedUser => {
        if (!fetchedUser) {
            let error = new Error();
            error.statusCode = 400;
            error.message = 'Such a user doesn\'t exist! Please make sure to enter the credentials correctly!';

            return next(error);
        }

        userData = fetchedUser

        return bcrypt.compare(password, userData.password);
    }).then(passwordMatch => {
        if (!passwordMatch) {
            let error = new Error();
            error.statusCode = 400;
            error.message = 'Wrong password! Please make sure to enter the credentials correctly!';

            return next(error);
        }

        const token = jwt.sign({ userId: userData.id, email: userData.email, status: userData.status }, process.env.secret_key, { expiresIn: '1h' });
        
        return res.status(200).json({
            message: 'Successfully logged in!',
            userData: {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                username: userData.username,
                email: userData.email,
                status: userData.status,
                avatarUrl: userData.avatarUrl,
                dateOfBirth: userData.dateOfBirth
            },
            expiresIn: '3600',
            token
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

exports.editUser = (req, res, next) => {
    
}

exports.deleteUser = (req, res, next) => {
    User.destroy({ where: { id: req.params.id } }).then(result => {
        if (result === 0) {
            let error = new Error();
            error.statusCode = 400;
            error.message = 'User record couldn\'t be deleted!';

            return next(error);
        }
        return res.status(200).json({
            message: 'User has been successfully deleted!',
            result
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

exports.requestPasswordReset  = (req, res, next) => {
    
}

exports.resetPassword  = (req, res, next) => {
    
}

exports.changePassword  = (req, res, next) => {
    
}