import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import AddImage from './components/AddImage';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile/Profile';
import Photographer from './pages/Photographer/Photographer'

import "./index.css"

const httpLink = createUploadLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/photographer/:id" component={Photographer} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/add" component = {AddImage}/>
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
