import React from "react";
import { Navigate, useParams } from 'react-router-dom';

import InklingForm from "../components/InklingForm";
import InklingList from "../components/InklingList";

// Where have we decided to implement the squids list?
import Squids from "../components/Squids";

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { ADD_SQUID } from "../utils/mutations";
import Auth from '../utils/auth';

const Profile = (props) => {
    const [addSquid] = useMutation(ADD_SQUID);

    // userParams hook retrieves username from URL
    const { username: userParam } = useParams();
    // and passes it to this useQuery hook
        // value of parameter is checked and runs either user or me query based on result
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });
    // user object is then used to populate JSX below
    const user = data?.me || data?.user || {};

    // navigate to personal profile page if username is the logged-in user's
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile:username" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this page.
            </h4>
        );
    }

    // click handler to add friend
    const handleClick = async () => {
        try {
            await addSquid({
                variables: { id: user._id },
            });
        } catch (e) {
            console.error(e);
        }
    };

    // click handler to view squids
    // const handleSquidsView = async () => {
    //    try {

    //    }
    // }

    return(
        <div>
            <div>
                {/* !!!!! ASK about profile model being including inside User model in order to deconstruct correct data here !!!!! */}
                {/* Avatar icon grabbed from user.image ?? */}
                {/* user bio */}
                {/* spotify music player */}

                {userParam ? (
                    <button className="btn" onClick={handleClick}>
                        Add Squid
                    </button>
                ) : (
                    <button className="btn" onClick={handleSquidsView}>
                        //Squids
                    </button>
                )}
            </div>
            <div>
                <InklingList
                    inklings={user.inklings}
                    title={`${user.username}'s ink.`}
                />
            </div>
            <div>{!userParam && <InklingForm />}</div>
            <p>The Dead Zone Lies Beyond</p>
        </div>
    );
};
export default Profile;