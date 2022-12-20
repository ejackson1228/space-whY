import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_INKLING = gql`
  mutation addInkling($inklingText: String!) {
    addInkling(inklingText: $inklingText) {
      _id
      inklingText
      createdAt
      username
      commentCount
      comments {
        _id
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

export const ADD_COMMENT = gql`
  mutation addComment($inklingId: ID!, $commentBody: String!) {
    addComment(inklingId: $inklingId, commentBody: $commentBody) {
      _id
      commentCount
      comments {
        _id
        commentBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_SQUID = gql`
  mutation addSquid($id: ID!) {
    addSquid(squidId: $id) {
      _id
      username
      squidCount
      squids {
        _id
        username
      }
    }
  }
`;

export const REMOVE_SQUID = gql`
  mutation removeSquid($id: ID!) {
    removeSquid(id: $id) {
      _id
      username
      squids {
        _id
        username
      }
    }
  }
`;

export const ADD_PROFILE = gql `
  mutation addProfile($user: User!) {
    addProfile(user: $user) {
      user {
        _id
        username
      }
      avatar
      bio
      song
      links
      categories
      createdAt
    }
  }
`;