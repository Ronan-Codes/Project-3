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
      description
    }
  }
`;

export const ADD_FOLLOWING = gql`
    mutation addFollowing($id: ID!) {
        addFollowing(followingId: $id) {
            _id
            username
            followingCount
            following {
                _id
                username
            }
        }
    }
`;

export const ADD_FOLLOWER = gql`
    mutation addFollower($id: ID!) {
        addFollower(followerId: $id) {
            _id
            username
            followersCount
            followers {
                _id
                username
            }
        }
    }
`;
