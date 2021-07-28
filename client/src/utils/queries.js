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