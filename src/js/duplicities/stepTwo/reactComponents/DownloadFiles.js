import React from 'react';
import './DownloadFiles.scss'
import { Card, CardGroup, Row, Col } from 'react-bootstrap';
import NextOrHome from './../../../generalComponents/general/NextOrHome';


const DownloadFiles = (props) => {
    console.log(props)
    return (
        <div className="center-div">
            <p className="info">Zde jsou Vaše soubory: </p><br />
            <ul>
                {props.data.map(function (name, index) {
                    return (

                        <li key={`dw-${index}`}>
                            <a href={name} >

                                <Card bg='light' >

                                    <Card.Body>
                                        <Card.Title>{name.replace('/downloads/', '')}</Card.Title>


                                    </Card.Body>
                                </Card>
                            </a>
                        </li>);
                })}

            </ul>
            <NextOrHome url='duplicities' text='duplicity' />
            
        </div >

    );
};

export default DownloadFiles;