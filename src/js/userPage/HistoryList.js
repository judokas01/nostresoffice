import React from 'react';
import './HistoryList.scss'


const HistoryList = (props) => {

    const removeElement = (index, filename) => {
        //přidat axios call to delete/*  */
        props.onChange((prevState) => {
            prevState.splice(index, 1)
            deleteReq(filename)
            return [...prevState]
        })
    }

    return (
        <ul className="file-list">
            {console.log(props)}
            {props.historyItems.map((el, index) => {
                console.log(el)
                return (
                    <li key={index}><button onClick={() => removeElement(index, el.filename)}>SMAZAT</button> {el.files[0].replace('/downloads/','')}</li>
                )
            })}
        </ul>

    );
};

export default HistoryList;