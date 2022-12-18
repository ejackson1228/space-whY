import React from "react";
import InklingList from "../components/InklingList";
import InklingForm from "../components/InklingForm";

import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_INKLINGS } from "../utils/queries";

const Feed = () => {
    const { loading, data } = useQuery(QUERY_INKLINGS);
    const inklings = data?.inklings || [];

    const loggedIn = Auth.loggedIn();

    return(
        <main>
            <div>
                <h1>Feed</h1>
                {loggedIn && (
                    <div>
                    <InklingForm></InklingForm>
                    </div>
                )}
                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <InklingList
                            inklings={inklings}
                            title="Feed"
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Feed;