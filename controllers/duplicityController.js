const multer = require('multer')
const { storage } = multer({ dest: 'public/uploads/' })
const upload = multer({ storage })
const Task = require('../models/tasks')
const fs = require("fs")
const { deleteFile } = require('../utils/deleteFile')
const filePreview = require('../utils/duplicities')
const { duplicityProcess } = require('../utils/duplicities/duplicitesProcess')
const { sanitizeString } = require('../utils/validators/sanitize')
const History = require('./../models/histories')



const allowedUploads = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

]
/**
 * handles the uploading of files and making them into usersession, and database
 */
module.exports.uploadFileAndStore = async (req, res, next) => {

    if (allowedUploads.includes(req.file.mimetype)) {
        if (!req.user) {
            //console.log('does not exists')
            res.status(403).send('user is not loged in')

        } else {
            const data = {
                author: req.user._id,
                timestamp: Date.now(),
                sessionId: req.sessionID,
                data: req.file,
                finished: false
            }
            const result = new Task(data)
            await result.save()
            await res.send(result)
        }

    } else {
        //deletes unsuported files
        deleteFile(req.file)
        res.status(400).send(
            'Nepodporovaný typ souboru!'
        )
    }

}


/**
 * renders the upload - files site aka wizard step one
 */
module.exports.renderWizardStepOne = async (req, res, next) => {
    const filesToDelete = await Task.find({ "sessionId": req.sessionID })
    filesToDelete.forEach(el => { deleteFile(el.data) })
    await Task.deleteMany({ "sessionId": req.sessionID })
    const functionType = 'duplicities'
    const user = req.user
    res.render('wizard/duplicities/stepOne', { functionType,user })

}

/**
 * renders the second step for duplicities
 */
module.exports.renderWizardStepTwo = async (req, res, next) => {
    const files = await Task.find({ "sessionId": req.sessionID })
    res.render('wizard/duplicities/stepTwo', { files })

}


/**
 * this returns first 5 lines of excel file
 */

module.exports.filePreview = async (req, res, next) => {
    const { id } = req.params
    const file = await Task.findOne({
        'data.filename': id
    })

    const result = await filePreview.getPreview(file, 6)
    res.send(result)

}


/**
 * validates if file structure is all the same, if not returns site with hints how to format the file, else next()
 */

module.exports.validateFilesStructure = async (req, res, next) => {


    const files = await Task.find({ "sessionId": req.sessionID })

    const result = await filePreview.compareStructure(files)


    if (result.next) {
        const previewData = result.data
        req.session.files = files

        res.render('wizard/duplicities/stepTwo', { previewData })
    } else {
        req.flash('error', `Chyba zpracování: ${result.message}`)
        res.redirect('/duplicities')
    }



}


module.exports.processFiles = async (req, res, next) => {
    const parameters = req.body

    const data = {
        files: req.session.files,
        params: parameters
    }
    if (!req.user.username) req.user = { username: anonymous }
    const result = await duplicityProcess(data, req.user.username)


    const dbData = {
        author: req.user._id,
        timestamp: Date.now(),
        files: [...result],
        type: 'duplicity'
    }

    const dbUpload = new History(dbData)
    await dbUpload.save()




    res.send(result)
}

