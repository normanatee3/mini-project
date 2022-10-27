import React from 'react';
import { useState } from 'react';
import * as usersService from '../utilities/users-service';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LogInForm({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState('');


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (event) => {
        // Prevent form from being submitted to the server
        event.preventDefault();

        try {
            
            // The promise returned by signUp service method will resolve to user object included in the payload of JSON Web Token (JWT)
            const user = await usersService.login({email, password});
            setUser(user.data);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => {
                                return handleEmailChange(e);
                            }}
                            value={email}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                return handlePasswordChange(e);
                            }}
                            value={password}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Log In
                    </Button>
                </form>
            </div>
            <p className="error-message">{error}</p>
        </div>
    )
}

export default LogInForm