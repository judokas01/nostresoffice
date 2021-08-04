import React from 'react';
import './DownloadFiles.scss'
import { Card, CardGroup, Row, Col } from 'react-bootstrap';


const DownloadFiles = (props) => {
    console.log(props)
    return (
        <div className="center-div">
            <p className="info">Zde jsou Vaše soubory: </p><br />
            <ul>
                {props.data.map(function (name, index) {
                    return (
                        <li>
                            <a href={name} key={index}>

                                <Card  >

                                    <Card.Body>
                                        <Card.Title>{name.replace('/downloads/', '')}</Card.Title>


                                    </Card.Body>
                                </Card>
                            </a>
                        </li>);
                })}

            </ul>
        </div >

    );
};

export default DownloadFiles;