const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const User = require('../models/users')
const passport = require('passport')
const { isLoggedIn, isAuthorized } = require('../utils/users/authorization')
const users = require('../controllers/users')
const { validateRegistration } = require('../utils/validators/validateRegistration')







router.route('/')
    .get(isLoggedIn, users.renderUserPage)
    .post(/* validateRegistration, */catchAsync(users.registerUser))




router.route('/register')
    .get(users.renderRegisterForm)



router.route('/forgot')
    .get(users.renderForgotPasswordForm)
    .post(users.sendForgotenPasswordEmail)


router.route('/forgot/:id')
    .get(users.validateForgottenPassword, users.newPassword)
    .post(users.changeForgottenPassword)


router.get('/verifyemail/:id', users.verificateUser)


router.route('/verifyemail')
    .get(users.sendVerificationEmail)


router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: 'Nesprávné uživatelské jméno nebo heslo!', failureRedirect: '/users/login' }), users.loginUser)

router.get('/logout', users.logout)

router.route('/newpassword')
    .get(users.newPassword)
    .post(isLoggedIn, isAuthorized, users.currentPassword, users.changePassword)

router.route('/forgotten')
    .post(isLoggedIn, isAuthorized, users.currentPassword, users.changePassword)



router.route('/:id')
    .get(isLoggedIn, isAuthorized, users.editUserForm)
    .post(isLoggedIn, isAuthorized, users.editUser)


module.exports = router