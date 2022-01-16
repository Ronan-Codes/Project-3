import gql from 'graphql-tag';

export const ADD_PHOTO = gql`
mutation addPhoto($photo: Upload!, $userId: String){
    addPhoto(photo: $photo, userId: $userId)
}
`
export const ADD_PROFILE_PHOTO = gql`
mutation addProfilePhoto($photo: Upload!, $userId: String){
    addProfilePhoto(photo: $photo, userId: $userId)
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

export const UPDATE_USER = gql`
  mutation updateUser($description: String) {
    updateUser(description: $description) {
      user
    }
  }
`;

