import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Auth from "../utils/auth";

// After signup go right to ProfileEdit.js

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

                        <Card className="col-md-10 mx-auto">
                            <Card.Header as="h4">Sign Up </Card.Header>
                            {/* div to set up card body */}

                            <div>
                                <Form onSubmit={handleFormSubmit}>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>  Username: </Form.Label>
                                    <Col sm={7}>
                                    <Form.Control
                                        className="form-input"
                                        placeholder="Your username"
                                        name="username"
                                        type="username"
                                        id="username"
                                        value={formState.username}
                                        onChange={handleChange}
                                    />
                                    </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-4" >
                                    <Form.Label column sm={3}>Email:</Form.Label>
                                    <Col sm={7}>
                                    <Form.Control
                                        className="form-input"
                                        placeholder="Your email"
                                        name="email"
                                        type="email"
                                        id="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                    />
                                    </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm={3}>Password:</Form.Label>
                                    <Col sm={7}>
                                    <Form.Control
                                        className="form-input"
                                        placeholder="******"
                                        name="password"
                                        type="password"
                                        id="password"
                                        value={formState.password}
                                        onChange={handleChange}
                                    />
                                    </Col>
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