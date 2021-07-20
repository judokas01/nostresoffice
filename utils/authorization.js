const Campground = require("../../yelp_camp/models/campground")


module.exports.isLoggedIn = (req, res, next )=> {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error','You need to be signed in first!')
        return res.redirect('/users/login')
    }
    next()
}

module.exports.isAuthor = async (req, res, next )=> {
    const { id } = req.params 
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user._id)){
        req.session.returnTo = req.originalUrl
        req.flash('error','You dont have permission to do that!')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}