import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
var qs = require('qs');
import ClickablePreview from './ClickablePreview'
import './PreviewForm.scss';
import LoadingScreen from './LoadingScreen'
import DownloadFiles from './DownloadFiles'



const PreviewForm = (props) => {

    const formSubmitHandler = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        // renders loading page
        ReactDOM.render(<LoadingScreen />, document.getElementById('root'));
        //
        axios.post('/duplicities/stepThree', qs.stringify(formProps), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

            .then(function (response) {
                ReactDOM.render(<DownloadFiles data={response.data} />, document.getElementById('root'));
                console.log(response.data);
            })




    }



    return (
        <form className='submit-group form-in' onSubmit={formSubmitHandler}>
            {
                props.data.map((row, index) => (
                    <input type="checkbox" name={`column-${index}`} key={`cl-${index}`} hidden />
                ))
            }

            <label>Rozvržení: </label><br />
            <select name="mode" id='mode'>
                <option value="unique-only">Zůstanou pouze unikátní hodnoty</option>
                <option value="duplicities-extra-file">Duplicitní hodnoty do extra souboru</option>
            </select>
            <br /><br />
            <button type="submit">Další</button>

        </form>

    );
};

export default PreviewForm;
