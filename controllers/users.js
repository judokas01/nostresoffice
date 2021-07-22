const { authmail } = require('../utils/emails/authemail')
const { forgotmail } = require('../utils/emails/forgotmail')
const User = require('../models/users')
const escape = require('escape-html');
const sanitize = require('../utils/validators/sanitize')
const randomstring = require("randomstring")
const { passwordStrength } = require('check-password-strength');


/**
 * renders registration form
 */
module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}


/**
 * renders form to reset password
 */
module.exports.renderForgotPasswordForm = (req, res) => {
    res.render('users/forgottenPassword')
}


/**
 * validates if user can reset password by token and than redirects to reset form
 */
module.exports.validateForgottenPassword = async (req, res, next) => {
    const string = sanitize.sanitizeString(req.params.id)
    if (!string) {

        req.flash('error', 'Potvrzovací kód není platný.')
        res.redirect(`/`)
    } else {
        const user = await User.findOne({ verifyCode: string })
        if (user) {
            req.resetUser = user
            next()
        } else {
            req.flash('error', 'Potvrzovací kód není platný.')
            res.redirect(`/`)
        }

    }
}



/**
 * renders users page (empty for now)
 */
module.exports.renderUserPage = async (req, res) => {
    if (req.user.isAdmin) {
        const user = req.user
        const users = await User.find({})

        res.render('users/index', { user, users })
    } else {
        const users = []
        const user = req.user
        res.render('users/index', { user, users })
    }
}



/**
 * logs in the user
 */
module.exports.loginUser = (req, res) => {
    req.flash('success', 'Úspěšné přihlášení, tak se do toho dáme!')
    const redirectUrl = req.session.returnTo || '/'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

/**
 * registers the user
 */
module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password, firstname, lastname } = req.body
        const user = new User({ email, username, firstname, lastname })
        const registerUser = await User.register(user, password)
        const result = await authmail(registerUser)
        req.login(registerUser, err => {
            if (err) {
                return next(err)
            }
        })
        req.flash('success', 'Děkujeme za registraci. Na váš email Vám přišel email s verifikačním kódem.')
        res.redirect('/users')
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/users/register')
    }

}



/**
 * logs out the user
 */
module.exports.logout = (req, res) => {
    req.logout()
    req.flash('success', 'Odhlášeno !')
    res.redirect('/')
}

/**
 * creates login form 
 */
module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
}

/**
 * sends veritification email if needed, otherwise just redirects to users
 */
module.exports.sendVerificationEmail = async (req, res, next) => {
    if (req.user.active) {
        res.redirect(`/users`)
    } else {
        const result = await authmail(req.user)
        // result.catch(console.error)
        console.log(req.user.email)
        req.flash('success', 'Váš potvrzovací email byl odeslán.')
        res.redirect(`/users`)
    }

}

/**
 * 
 */
module.exports.sendForgotenPasswordEmail = async (req, res, next) => {
    const { email } = req.body
    const sanitized = sanitize.sanitizeMail(email)

    if (!sanitized) {
        req.flash('error', 'Neplatný formát emailu.')
        res.redirect(`/users/forgot`)
    }

    if (sanitized) {
        const result = await User.findOne({ email: sanitized })

        if (!result) {
            req.flash('error', 'Tento email není přiřazen k žádnému uživateli.')
            res.redirect(`/users/forgot`)
        } else {
            result.verifyCode = `${randomstring.generate(85)}`
            const newUser = await result.save({ new: true })
            await forgotmail(newUser)
            req.flash('success', `Odkaz k resetování hesla byl odeslán na mail ${email}.`)
            res.redirect(`/`)
        }

    }

}


/**
 * it does the user verification and change active to true
 */

module.exports.verificateUser = async (req, res, next) => {
    const authToken = req.params.id
    const sanitized = escape(authToken);
    if (authToken != sanitized) {
        req.flash('error', 'Potvrzovací kód není platný.')
        res.redirect(`/`)
    } else {
        const result = await User.findOne({ verifyCode: sanitized })
        if (result) {
            result.verifyCode = ''
            result.active = true
            const userUpdate = await result.save()
            //relogs user
            req.logout()
            req.login(userUpdate, err => {
                if (err) {
                    return next(err)
                }
            })
            req.flash('success', 'Email potvrzen, Váš účet je nyní plně aktivní.')
            res.redirect(`/`)
        } else {
            req.flash('error', 'Potvrzovací kód není platný.')
            res.redirect(`/`)
        }

    }
}

module.exports.newPassword = async (req, res) => {
    if (req.resetUser) {
        const user = req.resetUser
        res.render('users/newpassword', { user })
    } else if (req.user) {
        const oldUser = await User.findById(req.user._id)
        oldUser.verifyCode = ''
        const user = oldUser.save({ new: true })
        res.render('users/newpassword', { user })
    } else {
        req.flash('error', 'Prosím registrujte se.')
        res.redirect('/users/register')
    }

}



/**
 * renders site with form to edit user
 */
module.exports.editUserForm = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.render('users/editUser', { user })
}


/**
 * does the updating
 */
module.exports.editUser = async (req, res) => {
    const userid = req.params.id
    !req.body.isAdmin ? req.body.isAdmin = false : req.body.isAdmin = true
    if (!req.body.active) {
        req.body.active = false
        req.body.verifyCode = `${randomstring.generate(85)}`
    } else {
        req.body.active = true
        req.body.verifyCode = ""
    }
    const updated = req.body
    !req.body.active ? req.body.active = false : req.body.active = true
    const user = await User.findByIdAndUpdate(userid, updated, { new: true })
    console.log(user)
    req.flash('error', 'Upraveno.')
    res.render('users/editUser', { user })
}

/**
 * validates and changes password
 */
module.exports.changePassword = async (req, res) => {
    const { password, password1, password2 } = req.body

    if (password1 != password2) {
        req.flash('error', 'Nová hesla musí být stejná.')
        res.redirect('/users/newpassword')
    }
    const score = passwordStrength(password1).id

    if (score < 1) {
        req.flash('error', 'Nové heslo je příliš jednoduché.')
        res.redirect('/users/newpassword')
    } else {
        const user = await User.findById(req.user._id)
        await user.setPassword(password1)
        const userUpdate = await user.save({ new: true })
        req.logout()
        req.login(userUpdate, err => {
            if (err) {
                return next(err)
            }
        })
        req.flash('success', 'Heslo bylo změněno.')
        res.redirect('/users')

    }

}


/**
 * checks if user provides correct password
 */
module.exports.currentPassword = async (req, res, next) => {
    const user = await User.authenticate()(req.user.username, req.body.password)
    if (user.user) {
        next()
    } else {
        req.flash('error', 'Nesprávné stávanící heslo.')
        res.redirect('/users/newpassword')
    }

}


module.exports.changeForgottenPassword = async (req, res, next) => {
    const id = req.params.id
    const { password1, password2 } = req.body
    const score = passwordStrength(password1).id

    if (password1 != password2) {
        req.flash('error', 'Nová hesla musí být stejná.')
        res.redirect(`/users/forgot/${id}`)
    }

    if (score < 1) {
        req.flash('error', 'Nové heslo je příliš jednoduché.')
        res.redirect(`/users/forgot/${id}`)
    }

    const user = await User.findOne({ "verifyCode": id })
    if (!user) {
        req.flash('error', 'Token není platný!.')
        res.redirect(`/`)
    } else {
        await user.setPassword(password1)
        user.verifyCode = ''
        await user.save()
        req.flash('success', 'Heslo bylo změněno, přihlašte se prosím.')
        res.redirect('/users/login')
    }



}