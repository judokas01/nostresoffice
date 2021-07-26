import { func } from 'joi'
import randomString from 'randomstring'
import preview from './../spresheetPreview'



module.exports.spredSheetClickablePreview = (dataObject, bodyElement) => {
    const fileId = dataObject[0].fileid
    let output = `<div id=${fileId} class="modal-dialog-popup"><div class="choose center">Zvolte sloupec, podle kterého budeme duplicity hledat</div><div class="close"></div>`
    for (let index = 0; index < dataObject.length; index++) {
        const element = dataObject[index];
        output += renderOneSheet(element)

    }
    output += '</div>'
    bodyElement.insertAdjacentHTML('afterend', output)
    return fileId

}








/**
 * renders one sheet table
 * @param {*} sheetObject 
 * @returns 
 */
const renderOneSheet = (sheetObject) => {
    let head = `<table class="table"><thead>
    <tr class='table-dark'>`

    for (let index = 0; index < sheetObject.data[0].length; index++) {
        const element = sheetObject.data[0][index];
        head += `<th class="column-${index}" scope="col">${element}</th>
        `
    }

    let body = `<tbody>`
    for (let index = 1; index < 5; index++) {
        const row = sheetObject.data[index];
        body += `<tr class="table-light">`
        for (let index = 0; index < row.length; index++) {
            const element = row[index];
            body += `<td class="column-${index}">${element}</td>`
        }
        body += `</tr>`

    }
    body += `</tbody></table>`
    return `${head}${body}`

}

/**
 * does the event listeners for new window
 * @param {*} fileId 
 */
module.exports.closeEventListener = (fileId) => {
    const div = document.getElementById(fileId)
    const closeButton = div.querySelector('.close')
    closeButton.addEventListener('click', closeWindowListener)
    console.log(closeButton)
}


/**
 * closes the popup window
 * @param {*} ev 
 */
const closeWindowListener = (ev) => {
    ev.srcElement.parentElement.remove()
    document.querySelectorAll('.card').forEach(el =>
        el.removeEventListener('click', preview.preview)
    )

    document.querySelectorAll('.card').forEach(el =>

        el.addEventListener('click', preview.preview)
    )
}


/**
 * makes the 'higlight option' for table
 */
module.exports.markColumnListener = () => {
    /* const cells = document.querySelectorAll("[class^='column-']")
    cells.forEach(cell =>
        cell.addEventListener('mouseover', function (ev) {
            const columntNodes = document.querySelectorAll(`.${cell.classList.value}`)
            columntNodes.forEach(cell => cell.classList.add('highlight'))
        }))
    cells.forEach(cell =>
        cell.addEventListener('mouseout', function (ev) {
            const columntNodes = document.querySelectorAll(`.${cell.classList.value}`)
            columntNodes.forEach(cell => cell.classList.remove('highlight'))
        })) */


}
