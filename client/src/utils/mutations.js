import gql from 'graphql-tag';

export const ADD_PHOTO = gql `
mutation addPhoto($photo: Upload!){
    addPhoto(photo: $photo)
}
`