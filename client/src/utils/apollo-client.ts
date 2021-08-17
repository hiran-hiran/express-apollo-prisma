import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  let token;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('auth-token');
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
