import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

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

    return(
        <main>
        <div>
            {/* div to set up column */}
            <div>
                {/* div to set up card */}
                <div>
                    <h4>Sign Up</h4>
                    {/* div to set up card body */}
                    <div>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className="form-input"
                                placeholder="Your username"
                                name="username"
                                type="username"
                                id="username"
                                value={formState.username}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="Your email"
                                name="email"
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                className="form-input"
                                placeholder="******"
                                name="password"
                                type="password"
                                id="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button className="btn" type="submit">
                                Submit
                            </button>
                        </form>

                        {error && <div>Signup failed</div>}
                    </div>
                </div>
            </div>
            </div>
        </main>
        );
};

export default Signup;