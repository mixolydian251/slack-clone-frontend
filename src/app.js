import './styles/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost'
import AppRouter from './routers/AppRouter'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
});

const jsx = (
  <ApolloProvider client={client}>
    <AppRouter/>
  </ApolloProvider>
);

ReactDOM.render(jsx, document.getElementById('app'));

