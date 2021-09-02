import React from 'react';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { render } from '@testing-library/react';


const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
  <App />
</ApolloProvider>
)
document.getElementById('root')
