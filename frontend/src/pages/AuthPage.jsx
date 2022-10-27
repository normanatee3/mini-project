import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react'
import LogInForm from '../components/LogInForm'
import SignUpForm from '../components/SignUpForm'
import { useState } from 'react';

function AuthPage({ setUser }) {
    const [showLogin, setShowLogin] = useState(true);
    return (
        <div>
            <Container style={{backgroundColor: "slategrey"}} fluid>
                <Row>
                    <Col  as="h1" >MERNMOVIES</Col>
                </Row>
            </Container>
            {showLogin ?
                <LogInForm setUser={setUser} />
                :
                <SignUpForm setUser={setUser} />
                }
            <h3 onClick={() => setShowLogin(!showLogin)}>
                {showLogin ?
                    'GO TO LOG IN'
                    :
                    'GO TO SIGN UP'}
            </h3>
        </div>
    )
}

export default AuthPage