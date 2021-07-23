const express = require('express')
const router = express.Router()
const multer = require('multer')
const { storage } = multer({ dest: 'public/uploads/' })
const upload = multer({ storage })
const { canAccessThisFile } = require('../utils/users/authorization')
const duplicities = require('../controllers/duplicities')


router.route('/')
    .get(duplicities.renderWizardStepOne)
    .post(upload.single('file'), duplicities.uploadFileAndStore)




router.route('/stepTwo')
    .get(duplicities.renderWizardStepTwo)


router.route('/stepTwo/:id')
    .get(canAccessThisFile, duplicities.filePreview)



module.exports = router