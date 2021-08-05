import React from 'react';

import { sendLoader } from '../../../generalComponents/handlers/handlers'
import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone';


const StepOne = (props) => {


	return (
		<>



			<form action="/duplicities" method="post" encType="multipart/form-data" className="dropzone"
				accept=".csv,.xlsx">
				<div className="fallback">
				<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</div>
					</section>
				)}
			</Dropzone>
					
				</div>
			</form>
			<div className="d-grid gap-3">
				<a onClick={sendLoader} href="/duplicities/stepTwo"><button type="button" className="p-2 border btn btn-primary">Další krok</button></a>

			</div>

	

		</>


	);
};

export default StepOne;
