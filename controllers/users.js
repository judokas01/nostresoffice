
const User = require('../models/users')

/**
 * renders registration form
 */
module.exports.renderRegisterForm =  (req, res) => {
    res.render('users/register')
}

/**
 * renders users page (empty for now)
 */
module.exports.renderUserPage =  (req, res) => {
    res.render('users/index')
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
    try{
        const {email, username, password} = req.body
        const user = new User({email, username})
        const registerUser = await User.register(user, password)
        
        req.login(registerUser, err => {
            if(err){
                return next(err)
            }
        })
        req.flash('success', 'Wellcome !')
        res.redirect('/users')
    } catch(e){
        req.flash('error', e.message) 
        res.redirect('/users/register')
    }
   
}



/**
 * logs out the user
 */
module.exports.logout = (req, res) =>{
    req.logout()
    req.flash('success', 'Odhlášeno !')
    res.redirect('/campgrounds')
}

/**
 * creates login form 
 */
module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
}