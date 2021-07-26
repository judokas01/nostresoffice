import preview from './wizard/spresheetPreview'
import './../scss/excelPrevies.scss'



document.querySelectorAll('.card').forEach(el => {
    el.addEventListener('click', preview.preview)
    
})


