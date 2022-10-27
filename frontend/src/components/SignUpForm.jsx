import React from "react";
import { useState } from "react";
import { signUp } from "../utilities/users-service";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignUpForm({ setUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    // password does not match confirmation
    const disable = password !== confirm;

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmChange = (e) => {
        setConfirm(e.target.value);
    };
    const handleErrorChange = (e) => {
        setError(e.target.value);
    };

    const handleFormSubmission = async (e) => {
        // stop submit
        e.preventDefault();

        // retrieve collective user object state
        const state = { name, email, password, confirm, error };

        try {
            // duplicate state to formdata
            const formData = { ...state };
            // purge unneeded properties
            delete formData["confirm"];
            delete formData["error"];

            const user = await signUp(formData);

            console.log(user);
            setUser(user.data);
        } catch (error) {
            setError("Sign up Failed - Try Again");
        }
    };

    return (
        <div>
            <div className="form-container">
                <form
                    autoComplete="off"
                    onSubmit={(e) => {
                        return handleFormSubmission(e);
                    }}
                >
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            onChange={(e) => {
                                return handleNameChange(e);
                            }}
                            value={name}
                            required
                        />
                    </Form.Group>

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

                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
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

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => {
                                return handleConfirmChange(e);
                            }}
                            value={confirm}
                            required
                        />
                    </Form.Group>

                    
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                </form>


            </div>
            <p className="error-message">&nbsp;{error}</p>
        </div>
    );
}

export default SignUpForm;
