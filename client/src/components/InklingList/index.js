import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

const InklingList = ({ inklings, title }) => {
    if (!inklings.length) {
        return <h3>No ink yet.</h3>;
    }
    // use the above import to render images conditionally (if they have a validd image property) on Inklings like so: 
    // <Image cloudName={process.env.CLOUDINARY_NAME} publicId={inkling.image} />
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
                        <div className='inkling-image'>
                            <Image cloudName={process.env.CLOUDINARY_NAME} publicId={inkling.image} /> 
                        </div>
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