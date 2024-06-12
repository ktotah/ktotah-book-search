import { gql } from '@apollo/client';

// Query to get the logged-in user's data
export const GET_ME = gql`
  query getMe {
    getMe {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
