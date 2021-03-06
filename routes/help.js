const express = require('express')
const router = express.Router()
const general = require('../controllers/generalController')
const { canAccessThisFile } = require('../utils/users/authorization')

router.route('/')
    .get((req, res) => {
        res.render('homepage')
    })

router.route('/:site')
    .get((req, res) => {
        const { site } = req.params
        const data = 'Duplicity umožňují zpracovat duplicity.'
        res.render(`general/help`,{data})
    })


/* .post(isLoggedIn, upload.array('images'),  catchAsync(campgrounds.createCampground))
 .post( upload.array('images'), (req,res) => {

    console.log(req.body)
    res.send( req.body)
})  
/* 
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
.get( catchAsync(campgrounds.showCampground) )
.put(isLoggedIn, isAuthor ,upload.array('images'), /* Validators.validateCampground , catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn, isAuthor,catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn , isAuthor,catchAsync(campgrounds.editForm))

*/


module.exports = router