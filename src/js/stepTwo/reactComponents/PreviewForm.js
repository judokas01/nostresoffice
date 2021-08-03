import React from 'react';

import './PreviewForm.scss';

const PreviewForm = (props) => {
    return (
        <form className='submit-group form-in'>
            {
                props.data.map((row, index) => (
                    <input type="checkbox" name={`column-${index}`} key={`cl-${index}`} hidden />
                ))
            }
            <label>Soubory: </label>
            <select name="files" id='files'>
                <option value="all-in-one">Vše v jednom souboru</option>
                <option value="in-one-sheets">Vše v jednom souboru, každý list odpovídá vstupnímu souboru </option>
                <option value="like-input">Stejná struktura jako vstupní soubory</option>
                <option value="all-sheets">Každý list vstupních souborů do souboru se jménem listu</option>
            </select>
            <br></br>
            <label>Rozvržení: </label>
            <select name="mode" id='mode'>
                <option value="unique-only">Zůstanou pouze unikátní hodnoty</option>
                <option value="mark-duplicities">Duplicitní hodnoty budou označeny</option>
                <option value="cut-duplicities">Duplicitní hodnoty do extra souboru</option>
            </select>
            <br></br>
            <button type="submit">Další</button>

        </form>

    );
};

export default PreviewForm;
