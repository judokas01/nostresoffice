import React,{ useState } from 'react';
import axios from 'axios';
import { request } from 'https';
import * as FormData  from 'form-data'
import Dropzone from 'react-dropzone'


import { sendLoader } from './../../../generalComponents/handlers/handlers'
import { useDropzone } from 'react-dropzone';


const StepOne = (props) => {

	const [acceptedFilesArray, setAcceptedFiles] = useState([]);
	const [rejectedFilesArray, seRrejectedFiles] = useState([]);



	/**
	 * translates into czech
	 */
	const czechError = (message) =>{
		if(message.search('File is larger than') >= 0){
			return 'Soubor je větší než 2.5 MB'
		}else if(message.search('File type must be') >= 0){
			return 'Nepovolený formát souboru'
		}else{
			return message
		}
	}




	const {
		acceptedFiles,
		fileRejections,
		getRootProps,
		getInputProps
	} = useDropzone({
		accept: '.csv,.xlsx',
		maxSize: 2621440,
		multiple: true,
		onDropAccepted : files => console.log(files)
	});

	const acceptedFileItems = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} -  {(Math.round(((file.size)/1058576)*100)/100)} MB
		</li>
	));

	const uploadHandler = (onDropAccepted) =>{
		console.log(onDropAccepted)
	}


	const files = acceptedFiles.map(file => (
		<li key={file.path}>
		  {file.path} - {file.size} bytes
		</li>
	  ));

	  function onDrop(acceptedFiles) {
		const req = request.post('/upload')
		acceptedFiles.forEach(file => {
		  req.attach(file.name, file)
		})
		req.end(callback)
	  }


	const fileRejectionItems = fileRejections.map(({ file, errors }) => (
		<li key={file.path}>
			{file.path} - {(Math.round(((file.size)/1048576)*10)/10)} MB : 
				{errors.map(e => (
					<b key={e.code}>{czechError(e.message)}</b>
				))}
		</li>
	));



	return (
		<section className="container">
			<div {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />
				<p>Sem přetáhněte své soubory</p>
				<em>(povolené formáty jsou xlsx a csv)</em>
			</div>
			<div className="d-grid gap-3">
				<a onClick={sendLoader} href="/duplicities/stepTwo"><button type="button" className="p-2 border btn btn-primary">Další krok</button></a>

			</div>
			<aside>
				<h4>Přijaté soubory</h4>
				<ul>{acceptedFileItems}</ul>
				<h4>Odmítnuté soubory</h4>
				<ul>{fileRejectionItems}</ul>
			</aside>

			
		</section>
		
	);
}

export default StepOne;
