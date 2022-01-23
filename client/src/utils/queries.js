import gql from 'graphql-tag'

export const ALL_PHOTOS = gql `
    {
        photos {
            _id
            photoName
            mimetype
            encoding
        }
    }
`
export const USER_PHOTOS = gql `
query userPhotos($userId: ID!){
    userPhotos(userId: $userId){
        _id
        username
        description
        email
        profilePhoto{
            _id
        }
        photos{
            _id
        }
        following {
            _id
            username
        }
        followers {
            _id
            username
        }
        followingCount
        followersCount
    }
}
`
export const USERS = gql `
    {
        users{
            _id
            description
            username
            profilePhoto{
                _id
            }
            photos{
                _id
            }
            following {
                _id
                username
            }
            followers {
                _id
                username
            }
            followingCount
            followersCount
        }
    }
`