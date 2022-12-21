import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';

const CommentList = ({ comments }) => {
    return (
        <Card className='mx-5 mt-5'>
            <Card.Header>
                <h3>Comments</h3>
            </Card.Header>
            <Card.Text className='p-3'>
                {comments &&
                    comments.map(comment => (
                        <>
                            <p key={comment._id}>{comment.commentBody}</p>
                            <p>
                                <Link to={`/profile/${comment.username}`} style={{ fontWeight: 650, fontSize: '13px' }} className='text-muted'>
                                {comment.username} on {comment.createdAt}
                                </Link>
                            </p>
                        </>
                    ))}
                </Card.Text>
            </Card>
    );
};

export default CommentList;