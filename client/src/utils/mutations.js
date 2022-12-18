import { gql } from '@apollo/client';

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
    }
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

export const ADD_FRIEND = gql`
mutation addFriend($id: ID!) {
  addFriend(friendId: $id) {
    _id
    username
    friendCount
    friends {
      _id
      username
    }
  }
}
`;

export const REMOVE_FRIEND = gql`
mutation removeFriend($id: ID!) {
  removeFriend(id: $id) {
    _id
    username
    friends {
      _id
      username
    }
  }
}
`;

export const ADD_PROFILE = gql `
mutations addProfile($user: User!) {
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
`