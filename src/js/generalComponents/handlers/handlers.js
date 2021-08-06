import React from 'react';
import ReactDOM from 'react-dom';
import FormData from 'form-data'
import axios from 'axios';
import LoadingScreen from '../general/LoadingScreen'
import ErrorFlash from './../upload/ErrorFlash'
import 'regenerator-runtime/runtime'

module.exports.sendLoader = () => {
    ReactDOM.render(<LoadingScreen message={'Náhled souboru se připravuje'} />, document.getElementById('root'));
}
const uploadMax = 6

/**
 * handles transer of state and file upload
 */

module.exports.uploadVerifier = async (file, prevState, props, setFlashMessages) => {
    if (prevState.length > uploadMax) {
        setFlashMessages((ps) => { return [...ps, { message: 'Byl překročen maximální počet nahraných souborů' }] })

        return false
    } else {
        const res = await uploadFile(file, props.url)
        return res
    }

   

}



const uploadFile = async (file, url) => {
    var formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`/${url}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res
}