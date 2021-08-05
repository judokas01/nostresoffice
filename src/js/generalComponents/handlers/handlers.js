import React from 'react';
import ReactDOM from 'react-dom';
import FormData from 'form-data'
import axios from 'axios';
import LoadingScreen from '../general/LoadingScreen'
import ErrorFlash from './../upload/ErrorFlash'

module.exports.sendLoader = () => {
    ReactDOM.render(<LoadingScreen message={'Náhled souboru se připravuje'} />, document.getElementById('root'));
}
const uploadMax = 6

/**
 * handles transer of state and file upload
 */

module.exports.uploadVerifier = (file, prevState, props ,setFlashMessages) => {
    console.log(prevState.length)
    if (prevState.length > uploadMax) {
      setFlashMessages( (ps) => { return [...ps,{message: 'Byl překročen maximální počet nahraných souborů'}]})

        return false
    } else {
        uploadFile(file, props.url)
        return true
    }

    /*     file.map((el, index) => {
            setAcceptedFiles((prevState) => {
                // přidat check množství souborů console.log(prevState)
                console.log(el)
                uploadFile(el)
                return [...prevState, { name: el.name, size: el.size }]
            })
        }) */

}



const uploadFile = (file, url) => {
    var formData = new FormData();
    formData.append("file", file);
    axios.post(`/${url}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}