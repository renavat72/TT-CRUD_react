import gql from 'graphql-tag';

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      email
      }
  }
`;

export const GET_USERS = gql`
  query($skip: Int, $limit: Int) {
    users(skip:$skip, limit:$limit) {
      id
      name
      email
      }
  }
`;

export const CREATE_USER = gql`
  mutation($email: String!, $name: String!) {
    createUser(input:{email:$email, name:$name}) {
      name
      email
    }
  }
`;
export const UPDATE_USER = gql`
  mutation($id: ID!, $email: String!, $name: String!) {
    updateUser(id: $id, input:{email:$email, name:$name}) {
      name
      email
    }
  }
`;
export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

