import './handlers.scss'

module.exports.hoverEnterHandler = (ev) => {
    const column = ev.target.getAttribute('column')
    const cells = document.querySelectorAll(`.column-${column}`)
    cells.forEach(element => {
        element.classList.add('highligted-cell')
    });

}

module.exports.hoverLeaveHandler = (ev) => {
    const column = ev.target.getAttribute('column')
    const cells = document.querySelectorAll(`.column-${column}`)
    cells.forEach(element => {
        element.classList.remove('highligted-cell')
    });
}


module.exports.markColumnHandler = (ev) => {
    const column = ev.target.getAttribute('column')
    const cells = document.querySelectorAll(`.column-${column}`)
    const classes = ev.target.classList
    const checkbox = document.querySelector(`input[name="column-${column}"]`)
    console.log(checkbox.checked)

    if (!classes.contains('marked-cell')) {
        checkbox.checked = true
        formVisibilityControl()
        cells.forEach(element => {
            element.classList.add('marked-cell')
        })
    } else {
        checkbox.checked = false
        formVisibilityControl()
        cells.forEach(element => {
            element.classList.remove('marked-cell')
        })
    }


}



/**
 * controls visibility of next step form
 */
const formVisibilityControl = () => {
    let any = false
    console.log('called')
    const checkboxes = document.querySelectorAll(`input[type="checkbox"]`)
    checkboxes.forEach(element => {
        console.log('loop')
        if (element.checked) {
            any = true

        }
    });

    if (any === true) {
        document.querySelector('.form-in').classList.remove('submit-group')
    } else {
        document.querySelector('.form-in').classList.add('submit-group')
    }
}