import React from 'react';
import ClickableCell from './ClickableCell'


const ClickableRow = (props) => {

    const newData = []
    for (let index = 1; index < props.data.length; index++) {
        const element = props.data[index];
        newData.push(element)
    }


    return (
        <tbody>

        {
            newData.map((row, index) => (

                    <ClickableCell key={index} cell={row}/>

            ))
        }

        </tbody>

    );
};

export default ClickableRow;
