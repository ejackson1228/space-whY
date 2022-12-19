import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from '../utils/mutations';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: ''
        });
    };

    return (
        // set up flex-row in main
        <main>
            {/* div to set up column */}
            <div>
                {/* div to set up card */}
                <div>
                    {/* // Login Form: This will be the default page unless logged in // */}
                    <Card>
                        <Card.Header as="h4">Login </Card.Header>
                        {/* div to set up card body */}


                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className="form-input"
                                placeholder="******"
                                name="password"
                                type="password"
                                id="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <Button variant="dark" type="submit">
                                {/* cute icon instead of submit text? */}
                                Submit
                            </Button>
                        </Form>

                        {error && <div>Login failed</div>}

                        {/* Link to Signup */}
                        <Card.Footer className="text-muted">
                        Don't have an account yet?
                        <Link to="/signup">Sign Up</Link>
                        </Card.Footer>
                    </Card>
                </div>
            </div>

        </main>
    );
};

export default Login;