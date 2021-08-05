import React from 'react';
import { Card, CardGroup, Row, Col } from 'react-bootstrap';
import './NextOrHome.scss'


const NextOrHome = (props) => {

    return (
        <Row xs={1} md={2} className="g-4">
            <a key='l-1' href='/'>
                <Col >
                    <Card bg='light' className="nav-icons" >
                        <Card.Img variant="top" src="/images/home.png" />
                        <Card.Body>
                            <Card.Title>Domů</Card.Title>
                            <Card.Text>
                                Vyberte si další funkci, nebo se podívejte do svého profilu.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </a>

            <a key='l-2' href={`/${props.url}`}>
                <Col>
                    <Card bg='light' className="nav-icons" >
                        <Card.Img variant="top" src="/images/again.png" />
                        <Card.Body>
                            <Card.Title>Vyřešit další {props.text}</Card.Title>
                            <Card.Text>
                                Až si vše stáhnete můžeme se vrhout rovnou na další {props.text}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </a>

        </Row>

    );
};

export default NextOrHome;