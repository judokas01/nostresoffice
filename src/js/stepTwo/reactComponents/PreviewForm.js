import React from 'react';
import axios from 'axios';
var qs = require('qs');

import './PreviewForm.scss';

const PreviewForm = (props) => {

    const formSubmitHandler = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const formProps = Object.fromEntries(formData);
        axios.post('/duplicities/stepThree', qs.stringify(formProps), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(function (response) {
                console.log(response.data);
            })
        //const formData = new FormData(document.querySelector('form'))


    }



    return (
        <form className='submit-group form-in' onSubmit={formSubmitHandler}>
            {
                props.data.map((row, index) => (
                    <input type="checkbox" name={`column-${index}`} key={`cl-${index}`} hidden />
                ))
            }
            <label>Co uděláme se soubory?</label><br />



            <select name="files" id='files'>
                <option value="all-in-one">Vše v jednom souboru</option>
                <option value="in-one-sheets">Vše v jednom souboru, každý list odpovídá vstupnímu souboru </option>
                <option value="like-input">Stejná struktura jako vstupní soubory</option>
                <option value="all-sheets">Každý list vstupních souborů do souboru se jménem listu</option>
            </select>
            <br /><br />
            <label>Rozvržení: </label><br />
            <select name="mode" id='mode'>
                <option value="unique-only">Zůstanou pouze unikátní hodnoty</option>
                <option value="mark-duplicities">Duplicitní hodnoty budou označeny</option>
                <option value="cut-duplicities">Duplicitní hodnoty do extra souboru</option>
            </select>
            <br /><br />
            <button type="submit">Další</button>

        </form>

    );
};

export default PreviewForm;
