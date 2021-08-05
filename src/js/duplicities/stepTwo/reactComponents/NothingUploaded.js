import React from 'react';
import './NothingUploaded.scss'


const NothingUploaded = () => {

    return (
        <div className="center-div">
            <h2 className="info">Nejsou nahrány žádné soubory.</h2><br/>
            <p>Pro pokračování se vraťe k <a className='black-link' href="/duplicities">NAHRÁNÍ SOUBORŮ</a> a poté pokračujte. </p>
            
        </div>

    );
};

export default NothingUploaded;