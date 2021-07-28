import gql from 'graphql-tag';

export const ADD_PHOTO = gql`
mutation addPhoto($photo: Upload!){
    addPhoto(photo: $photo)
}
`
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username:$username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

