import React from 'react';
import { Link } from 'react-router-dom';

const InklingList = ({ inklings, title }) => {
    if (!inklings.length) {
        return <h3>No ink yet.</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {inklings &&
                inklings.map(inkling => (
                    <div key={inkling._id}>
                        <p>
                            <Link to={`/profile/${inkling.username}`}>
                                {inkling.username}
                            </Link>{' '}
                            inked on {inkling.createdAt}
                        </p>
                        <div>
                            <Link to={`/inkling/${inkling._id}`}>
                                <p>{inkling.inklingText}</p>
                                <p>
                                    Comments: {inkling.commentCount}
                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default InklingList;