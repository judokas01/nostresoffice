import React from 'react';
import ReactDOM from 'react-dom';

import ClickablePreview from './duplicities/stepTwo/reactComponents/ClickablePreview';
import NothingUploaded from './duplicities/stepTwo/reactComponents/NothingUploaded';

if (userFromServer) {
    ReactDOM.render(<ClickablePreview Obj={userFromServer} />, document.getElementById('root'));
    
} else {

    ReactDOM.render(<NothingUploaded />, document.getElementById('root'));

}