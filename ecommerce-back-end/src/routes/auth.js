const express = require('express');
const { signup, signin } = require('../controller/auth');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');

const router = express.Router();

// const User = require('../models/user');


// router.get('/signin', (req, res) => {
//     return res.json({ message: 'signin' });
// });



router.post('/signup', [validateSignupRequest], isRequestValidated, signup);
router.post('/signin', [validateSigninRequest], isRequestValidated, signin);


module.exports = router;