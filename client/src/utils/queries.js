import { gql } from '@apollo/client';

export const QUERY_INKLINGS = gql`
  query inklings($username: String) {
    inklings(username: $username) {
      _id
      inklingText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
      likes {
        username
        user_id
      }
      likeCount
      image
    }
  }
`;

export const QUERY_INKLING = gql`
  query inkling($id: ID!) {
    inkling(_id: $id) {
      _id
      inklingText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      inklings {
        _id
        inklingText
        createdAt
        commentCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      inklings {
        _id
        inklingText
        createdAt
        commentCount
        comments {
          _id
          createdAt
          commentBody
          username
        }
      }
      inklingCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;