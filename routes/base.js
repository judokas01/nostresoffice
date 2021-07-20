const express = require('express')
const router = express.Router()

router.route('/')
    .get((req,res) => {
        res.render('homepage')
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
router.route(['/logic','/duplicity','/format','/sculpture'])
    .get((req,res) => {res.render('functions/general')})

module.exports = router