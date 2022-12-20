import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [addUser, { error }] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main>
            <div>
                {/* div to set up column */}
                <div>
                    {/* div to set up card */}
                    <div>

                        <Card>
                            <Card.Header as="h4">Sign Up </Card.Header>
                            {/* div to set up card body */}

                            <div>
                                <Form onSubmit={handleFormSubmit}>

                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        placeholder="Your username"
                                        name="username"
                                        type="username"
                                        id="username"
                                        value={formState.username}
                                        onChange={handleChange}
                                    />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        placeholder="Your email"
                                        name="email"
                                        type="email"
                                        id="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                    />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        className="form-input"
                                        placeholder="******"
                                        name="password"
                                        type="password"
                                        id="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    />
                                    </Form.Group>

                                    <Button variant="dark" type="submit">
                                        Submit
                                    </Button>
                                </Form>


                                {error && <div>Signup failed</div>}

                            </div>
                            <Card.Footer className="text-muted">
                                Have an account yet?
                                <Link to="/login"> Login</Link>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;