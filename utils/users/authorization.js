const sanitize = require('./../validators/sanitize')
const History = require('../../models/histories')

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
    } else {
        req.flash('error', 'Sem nemáte přístup!')
        res.redirect(`/`)
    }
}

module.exports.canAccessThisFile = async (req, res, next) => {
    const { id } = req.params
    const sanitized = sanitize.sanitizeString(id)
    if (sanitized != id) {
        res.status(400).send('invalid pameter')
    }
    if(!req.user){
        req.user = {_id : 'anonymous',
        isAdmin : false}
    }

    const result = await History.findOne({
        'data.filename': id
    })

    if(result.author == req.user._id || result.sessionId == req.sessionID || req.user.isAdmin == true){
        next()  
    }else{
        res.status(403).send('You do not have permission')
       
    }


}

