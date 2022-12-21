
//import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

//importing header and footer
import Header from './components/Header';
import Footer from './components/Footer';
import ProfileForm from './components/ProfileEditForm';

//importing pages for page changes
import Feed from './pages/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import SingleInkling from './pages/SingleInkling';
import NoMatch from './pages/NoMatch';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <Container className="d-flex justify-content-center">
            <Row>
              <Col>
                <Routes>
                  <Route
                    path="/"
                    element={<Feed />}
                  />
                  <Route
                    path="/login"
                    element={<Login />}
                  />
                  <Route
                    path="/signup"
                    element={<Signup />}
                  />
                  <Route
                    path="/profile"
                    element={<Profile />}
                  />
                  <Route
                    path="/profileform"
                    element={<ProfileForm />}
                  />
                  <Route
                    path="/inkling/:id"
                    element={<SingleInkling />}
                  />
                  <Route
                    path="*"
                    element={<NoMatch />}
                  />

                </Routes>
              </Col>
            </Row>
          </Container>

          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
