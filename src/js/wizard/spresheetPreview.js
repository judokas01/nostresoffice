import axios from 'axios'
import excelPreview from './excelPreview/excelPreview.js'

module.exports.preview = (ev) => {
    document.querySelectorAll('.modal-dialog-popup').forEach(el =>
        el.remove()
    )
    const element = ev.target.offsetParent
    const filename = element.getAttribute('filename')
    axios.get(`/duplicities/stepTwo/${filename}`)
        .then(function (response) {
            const fileId = excelPreview.spredSheetClickablePreview(response.data, element)
            excelPreview.closeEventListener(fileId)
            excelPreview.markColumnListener()
        })


    ev.stopPropagation();

}