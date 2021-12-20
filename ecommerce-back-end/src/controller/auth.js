const User = require('../models/user');
const jwt = require('jsonwebtoken');
const shortid = require("shortid");
const { validationResult } = require('express-validator');

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email }).exec((error, user) => {
        if (user) {
            return res.status(400).json({ message: 'User already registered' })
        }
    });

    const {
        firstName,
        lastName,
        email,
        password,

    } = req.body;

    const _user = new User({
        firstName,
        lastName,
        email,
        password,
        username: shortid.generate(),
    });

    _user.save((error, data) => {
        if (error) {
            return res.status(400).json({
                message: "Something went wrong",
            });
        }
        if (data) {
            return res.status(201).json({
                message: "User created Successfully..!",
            });
        }
    });
}
const maxAge = 7 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net coderthanhson secret', {
        expiresIn: maxAge
    })
}
const generateJwtToken = (_id, role) => {
    return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    });
};
exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
            const isPassword = await user.authenticate(req.body.password);
            if (isPassword && user.role === "user") {

                const token = generateJwtToken(user._id, user.role);
                // createToken(user._id);
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge + 1000 });
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName },
                });
            } else {
                return res.status(400).json({
                    message: "Something went wrong",
                });
            }

        } else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    });
};