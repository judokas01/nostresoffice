const express = require('express')
const router = express.Router()
const multer = require('multer')
const { storage } = multer({ dest: 'public/uploads/' })
const upload = multer({ storage })
const { canAccessThisFile } = require('../utils/users/authorization')
const duplicities = require('../controllers/duplicityController')
const generalController = require('./../controllers/generalController')


router.route('/')
    .get(generalController.renderHintForAnonymousUsers, duplicities.renderWizardStepOne)
    .post(upload.single('file'), duplicities.uploadFileAndStore)




router.route('/stepTwo')
    .get(duplicities.validateFilesStructure, duplicities.renderWizardStepTwo)


router.route('/stepTwo/:id')
    .get(/* canAccessThisFile, */ duplicities.filePreview)

router.route('/stepThree')
    .post(/* canAccessThisFile, */ duplicities.processFiles)



module.exports = router