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
      <Card className="m-5">
        <Card.Header as="h1">Weekly Ink</Card.Header>
        <div>
          {loading ? (
            <Card.Text>Loading...</Card.Text>
          ) : (
            <div>
              {loggedIn ? (
                <Card.Text className="m-3 p-3">
                  <InklingForm />
                  <InklingList inklings={inklings} />
                </Card.Text>
              ) : (
                <>
                  <Card style={{ width: "30rem" }}>
                    <Card.Img variant="top" src={logo} />
                    <Card.Text>
                      Uh Oh! You are not logged in! Please login in order to
                      check out this Week's Ink.
                    </Card.Text>
                  </Card>
                </>
              )}
            </div>
          )}
        </div>
      </Card>
    </main>
  );
};

export default Feed;