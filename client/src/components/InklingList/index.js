import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import Card from 'react-bootstrap/Card';

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
                <Card style={{margin: '10px', border: 'solid black 3px'}}>
                    <Card.Body key={inkling._id}>
                        <p>
                            <Link to={`/profile/${inkling.username}`} style={{textDecoration: 'none', color: 'black', fontWeight: 'bold'}}>
                                {inkling.username}
                            </Link>{' '}
                            inked on {inkling.createdAt}
                        </p>
                        { inkling.image && 
                        <div className='inkling-image'>
                            <Image cloudName={`${process.env.REACT_APP_CLOUDINARY_NAME}`} publicId={inkling.image} /> 
                        </div>
                        }
                        <div>
                            <Link to={`/inkling/${inkling._id}`} style={{textDecoration: 'none', color: 'black'}}>
                                <p>{inkling.inklingText}</p>
                                <p>
                                    Comments: {inkling.commentCount}
                                </p>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            ))}
    </div>
);
};

export default InklingList;