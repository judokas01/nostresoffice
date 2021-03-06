const multer = require('multer')
const { storage } = multer({ dest: 'public/uploads/' })
const upload = multer({ storage })
const Task = require('../models/tasks')
const fs = require("fs")
const { deleteFile } = require('../utils/deleteFile')
const filePreview = require('../utils/duplicities')
const { duplicityProcess } = require('../utils/duplicities/duplicitesProcess')
const { sanitizeString } = require('../utils/validators/sanitize')


/**
 * deletes file by filename
 */
module.exports.deleteFile = async (req, res, next) => {
    const filename = req.params.filename
    console.log(`file with name ${filename} is suppose to be deleted`)
    const fileToDelete = await Task.findOne({ "data.filename": filename })
    if (!fileToDelete) {
        res.status(404).send('file not found')
    } else {

        deleteFile(fileToDelete.data)
        const result = await Task.deleteMany({ "_id": fileToDelete._id })
        await res.send(result)
    }



}


/**
 * checks if user is user is
 */

module.exports.renderHintForAnonymousUsers = async (req, res, next) => {
    if(req.user){
        next()
    }else{
       
        req.flash('error', `Pro využití této funkce je potřeba být přihlášený.`)
        res.redirect(`help${req.baseUrl}`)
        

    }

    
    
}