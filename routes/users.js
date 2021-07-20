const express = require('express')
const router = express.Router({mergeParams:true})
const catchAsync = require('../utils/catchAsync')
const User = require('../models/users')
const passport = require('passport')
const {isLoggedIn,isAuthor} = require('../utils/authorization')
const users = require('../controllers/users')
const {validateRegistration} = require('../utils/validators/validateRegistration')

router.route('/')
    .get( isLoggedIn ,users.renderUserPage)
    .post(validateRegistration,catchAsync(users.registerUser))


router.route('/register')
    .get(users.renderRegisterForm)

router.route('/forgot')
    .get(users.renderRegisterForm)

router.route('/test')
    .get((req,res) => {
        console.log('yup')
        res.send('ou yeah')
    })

router.route('/login')
    .get(users.renderLoginForm)
    .post( passport.authenticate('local', { failureFlash: 'Nesprávné uživatelské jméno nebo heslo!', failureRedirect: '/users/login' }), users.loginUser)





router.get('/logout',users.logout)


module.exports = router