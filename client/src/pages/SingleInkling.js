import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_INKLING } from '../utils/queries';
// import { ADD_LIKE } from '../utils/mutations';
// import AuthService from '../utils/auth';

const SingleInkling = (props) => {
    // const [addLike, { error }] = useMutation(ADD_LIKE);

    const { id: inklingId } = useParams();

    const { loading, data } = useQuery(QUERY_INKLING, {
        variables: { id: inklingId }
    });

    const inkling = data?.inkling || {};

    if (loading) {
        return <div>Loading...</div>
    }

    

    // const HandleLikeSubmit = async (event) => {
    //     event.preventDefault();

    //     const user = AuthService.getProfile();
        
    //     const { id: inklingId } = useParams();

    //     try {
    //         await addLike({
    //             variables: {
    //                 inklingId: inklingId
    //             }
    //         })
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    return (
      <div>
        {/* div for card */}
        <Card className="m-5">
          {/* p for card header */}
          <Card.Header>
            <span style={{ fontWeight: "bold" }}>{inkling.username}</span> inked
            on {inkling.createdAt}
          </Card.Header>
          {/* div for card body */}
          <Card.Body>
            <p>{inkling.inklingText}</p>
            <div style={{ fontSize: "13px" }}>
              This post has: {inkling.likeCount} like(s)
            </div>
            <Button type="submit" variant="dark" className="my-2">
              Like
            </Button>
          </Card.Body>
        </Card>
        {inkling.commentCount > 0 && (
          <CommentList comments={inkling.comments} />
        )}

        {Auth.loggedIn() && <CommentForm inklingId={inkling._id} />}
      </div>
    );
};

export default SingleInkling;