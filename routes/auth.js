const express = require("express");
const { body } = require("express-validator");

const authController = require("../controller/AuthController");
const User = require('../models/user');

const router = express.Router();

router.put(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('Email id is already exist!');
                    }
                })
            })
            .normalizeEmail(),
        body("name").trim().isLength({ min: 5 }),
        body('password').trim().not().isEmpty()
    ],
    authController.signup
);

router.post('/login',authController.login);


module.exports = router;
