import React from 'react';
import './filelist.scss'
import axios from 'axios';

const deleteReq = async (filename) => {
    const request = await axios.delete(`/${filename}`)
    console.log(request)

}


const UploadedFiles = (props) => {

    const removeElement = async (index, filename) => {
        //přidat axios call to delete/*  */
        props.onChange(async (prevState) => {
            prevState.splice(index, 1)
            await deleteReq(filename)
            return [...prevState]
        })
    }

    return (
        <ul className="file-list">
            {console.log(props)}
            {props.state.map((el, index) => {
                return (
                    <li key={index}><button onClick={() => removeElement(index, el.filename)}>SMAZAT</button> {el.name} - {`${(Math.round(((el.size) / 1048576) * 10) / 10)} MB`}</li>
                )
            })}
        </ul>

    );
};

export default UploadedFiles;