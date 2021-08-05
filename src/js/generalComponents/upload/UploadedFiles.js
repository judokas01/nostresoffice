import React from 'react';
import { sendLoader } from './../handlers/handlers'




const UploadedFiles = (props) => {

    return (
        <ul>
            {props.state.map((el,index )=> {
                return (
                    <li key={index}> {el.name} - {`${(Math.round(((el.size) / 1048576) * 10) / 10)} MB`}</li>
                )
            })}
        </ul>

    );
};

export default UploadedFiles;