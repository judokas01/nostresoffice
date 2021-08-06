import React from 'react';
import {sendLoader} from './../handlers/handlers'




const RejectedFiles = (props) => {
    
    
	/**
	 * translates into czech
	 */
	const czechError = (message) => {
		if (message.message.search('File is larger than') >= 0) {
			return 'Soubor je větší než 2.5 MB'
		} else if (message.message.search('File type must be') >= 0) {
			return 'Nepovolený formát souboru'
		} else {
			return message
		}
	}



    return (
        <ul className="file-list">
            {props.state.map((el,index )=> {
                return (
                    <li key={index}> {el.name} - {`${(Math.round(((el.size) / 1048576) * 10) / 10)} MB`} - {czechError(el.error)}</li>
                )
            })}
        </ul>

    );
};

export default RejectedFiles;