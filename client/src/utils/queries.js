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
        photos{
            _id
        }
    }
}
`