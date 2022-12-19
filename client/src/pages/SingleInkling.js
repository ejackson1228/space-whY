import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_INKLING } from '../utils/queries';

const SingleInkling = (props) => {
    const { id: thoughtId } = useParams();

    const { loading, data } = useQuery(QUERY_INKLING, {
        variables: { id: inklingId }
    });

    const inkling = data?.inkling || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {/* div for card */}
            <div>
                {/* p for card header */}
                <p>
                    <span>
                        {inkling.username}
                    </span>{' '}
                    inked on {inkling.createdAt}
                </p>
                {/* div for card body */}
                <div>
                    <p>{inkling.inklingText}</p>
                </div>
            </div>

            {inkling.commentCount > 0 && (
                <CommentList comments={inkling.comments} />
                )}

            {Auth.loggedIn() && <CommentForm inklingId={inkling._id} />}
        </div>
    );
};

export default SingleInkling;