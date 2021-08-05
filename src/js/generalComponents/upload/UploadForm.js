import React, { useState } from 'react';
import Dropzone from 'react-dropzone'
import NextButton from './NextButton'
import RejectedFiles from './RejectedFiles'
import UploadedFiles from './UploadedFiles'
import ErrorFlash from './ErrorFlash'
import { sendLoader, uploadVerifier } from './../handlers/handlers'
import { useDropzone } from 'react-dropzone';
import './dropzone.min.css'


const StepOne = (props) => {

	const [acceptedFilesArray, setAcceptedFiles] = useState([]);
	const [rejectedFilesArray, setRejectedFiles] = useState([]);
	const [flashMessages, setFlashMessages] = useState([]);



	const {
		getRootProps,
		getInputProps
	} = useDropzone({
		accept: '.csv,.xlsx',
		maxSize: 2621440,
		multiple: true,
		maxFiles: 5,
		onDropAccepted: files => uploadHandler(files),
		onDropRejected: files => rejectionHandler(files)
	});


	/**
	 * handles transer of state and file upload
	 */

	const uploadHandler = (onDropAccepted) => {
		onDropAccepted.map((el, index) => {
			setAcceptedFiles((prevState) => {
				// upload limit checker
				if (uploadVerifier(el, prevState, props, setFlashMessages) === true) {
					return [...prevState, { name: el.name, size: el.size }]
				} else {
					//setFlashMessages( (ps) => { return [...ps,{message: 'Byl překročen maximální počet nahraných souborů'}]})
					return [...prevState]
				}

			})
		})

	}




	/**
	 * 
	 */
	const rejectionHandler = (onDropRejected) => {
		onDropRejected.map((el, index) => {
			setRejectedFiles((prevState) => {
				return [...prevState, { name: el.file.name, size: el.file.size, error: el.errors[0] }]
			})
		})

	}



	return (
		<section className="container">
			<ErrorFlash state={flashMessages} />
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p>Sem přetáhněte své soubory</p>
				<em>(povolené formáty jsou xlsx a csv)</em>
			</div>
			<NextButton url={props.url} />

			<aside>
				<h4>Přijaté soubory</h4>
				<UploadedFiles state={acceptedFilesArray} />
				<h4>Odmítnuté soubory</h4>
				<RejectedFiles state={rejectedFilesArray} />
			</aside>


		</section>

	);
}

export default StepOne;
