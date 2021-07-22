
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'Musíte se nejdříve přihlásit!')
        return res.redirect('/')
    }
    next()
}

module.exports.isAuthorized = async (req, res, next) => {
    if (req.user.isAdmin) {
        next()
    }else{
        req.flash('error', 'Sem nemáte přístup!')
        res.redirect(`/`)
    }
    
}

