import React from "react";
import InklingList from "../components/InklingList";
import InklingForm from "../components/InklingForm";

import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_INKLINGS } from "../utils/queries";

import Card from 'react-bootstrap/Card';
import logo from '../assets/images/1.png'

const Feed = () => {
    const { loading, data } = useQuery(QUERY_INKLINGS);
    const inklings = data?.inklings || [];
    console.log(inklings);
    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div>
                <h1>Weekly Ink</h1>
                {loggedIn && (
                    <div>
                        <InklingForm />
                        <InklingList
                            inklings={inklings}
                            title="Weekly Ink"
                        />
                    </div>
                )}
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div>

                            <Card style={{ width: '30rem' }}>
                                <Card.Img variant="top" src={logo} />
                                <Card.Text>
                                    Uh Oh! You are not logged in! In order to checkout this Weeks Ink please login.
                                </Card.Text>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Feed;