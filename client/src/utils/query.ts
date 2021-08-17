import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(data: { name: $username, email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      id
      name
      email
    }
  }
`;
