import React from 'react';
import { Link } from 'react-router-dom';

const Squids = ({ squidCount, username, squids }) => {
    if (!squids || !squids.length) {
        return <p>{username}, go catch some squids!</p>;
    }

    return (
        <div>
            <h5>
                {squidCount} {squidCount === 1 ? 'squid' : 'squids'}
            </h5>
            {squids.map(squid => (
                <button className="btn" key={squid._id}>
                    <Link to={`/profile/${squid.username}`}>{squid.username}</Link>
                </button>
            ))}
        </div>
    );
};

export default Squids;