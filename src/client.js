
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import { decryptToken } from './Utils/functions';
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createHttpLink({
  // uri: 'http://localhost:3000/graphql'
  uri: import.meta.env.VITE_GRAPHQL_API
});

// const link = createUploadLink({
//   // uri: 'http://localhost:3000/graphql'
//   uri: import.meta.env.VITE_GRAPHQL_API
// })

const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage
  let token;
  const encryptedToken = localStorage.getItem('token');

  if(encryptedToken){
    token = decryptToken(encryptedToken, import.meta.env.VITE_TOKEN_ENCRYPTION_KEY);
  }else{
    token = null
  }

  // Add the token to the request headers
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default client;
