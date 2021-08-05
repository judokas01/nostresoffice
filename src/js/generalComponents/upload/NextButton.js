import React from 'react';
import {sendLoader} from './../handlers/handlers'




const NextButton = (props) => {

    return (
        <div className="d-grid gap-3">
        <a onClick={sendLoader} href="/duplicities/stepTwo"><button type="button" className="p-2 border btn btn-primary">Další krok</button></a>

    </div>

    );
};

export default NextButton;