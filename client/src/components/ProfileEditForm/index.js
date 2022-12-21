import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import axios from 'axios';
// import {Image} from 'cloudinary-react';
import { ADD_PROFILE } from '../../utils/mutations';

//importing react bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


const ProfileForm = () => {
    const [addProfile, { error }] = useMutation(ADD_PROFILE);
    const [characterCount, setCharacterCount] = useState(0);
    const [bioBody, setBioBody] = useState("");
    const [selectedImage, setSelectedImage] = useState("");

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setBioBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleSubmit = async (event) => {
        const formData = new FormData()
        formData.append('file', selectedImage);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
        
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, formData);

        console.log(response);

        try {
            await addProfile({
                variables: { 
                    avatar: response.data.public_id,// this data from the response is the string identifier for the image hosted on cloudinary
                    bio: bioBody,
                    
                }
            })
        } catch(e) {
            console.error(e)
        };
    };
 

    return (
        <Card  style={{ width: '35rem' }}>
            <Card.Header>Create your Profile</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="age-verification">
                        <Form.Label>Are you at least 18 years of age?</Form.Label><br/>
                        <Button type="radio" id="user-age-yes" size="sm"> Yes</Button> {'  '}
                        <Button type="radio" id="user-age-no" size="sm">No</Button>
                    </Form.Group>
                    <Form.Group className='image-upload'>
                        <Form.Label> Upload a picture to display as your avatar! </Form.Label> {'  '}
                        <Button size="sm" type="file" onChange={(e) => {setSelectedImage(e.target.files[0])}} > Upload Image </Button>
                    </Form.Group>
                    <Form.Group id="profile-bio-form">
                        <br/>
                        <p className={`${characterCount === 280 ? 'text-error' : ''}`}>Character Count: {characterCount}/280</p>
                        <Form.Label>Write a short bio:</Form.Label>
                        <Form.Control 
                        as="textarea" 
                        placeholder='Write something about yourself...'
                        onChange={handleChange}
                        value={bioBody}
                        >      
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Form.Group id="profile-linktree">
                        <Form.Label>If there are links you'd like to share on your profile, please paste the URL here:</Form.Label>
                        <br/>
                        <Form.Control as="textarea" id="profile-twitter" placeholder='your twitter url here...'></Form.Control>
                        <br/>
                        <Form.Control as="textarea" id="profile-facebook" placeholder='your facebook url here...'></Form.Control>
                        <br/>
                        <Form.Control as="textarea" id="profile-github" placeholder='your github url here...'></Form.Control>
                        <br/>
                        <Form.Control as="textarea" id="profile-instagram" placeholder='your instagram url here...'></Form.Control>
                        <br/>
                        <Form.Control as="textarea"id="profile-linkedin" placeholder='your linkedin url here...'></Form.Control>
                    </Form.Group>
                    <br/>
                    <Button type="submit">Save Changes</Button>
                    {/* 
                        **Iceboxed Feature**
                    <div id='profile-song'>
                        <h5>If there is a song you'd like to feature on your profile, select one here:</h5>
                        
                    </div> */}
                </Form>
            </Card.Body>
        </Card>
    )
};

// considering integrating spotify playback api so that users can enter a song url from spotify and then have the music player on their profilePage



// const imgUpload = ({ onChange, src }) => {
    //     <label htmlFor='photo-upload' className='custom-img-upload'>
    //         <div className='img-wrap img-upload'>
    //             <img htmlFor="img-upload" src={src} />
    //         </div>
    //         <input id='img-upload' type='file' onChange={onChange} />
    //     </label>
    // };

    // state = {
    //     file: '',
    //     imagePreviewUrl: '',
    //     active: 'edit'
    // }

    // const photoUpload = e => {
    //     e.preventDefault();

    //     const reader = new FileReader();
    //     const file = e.target.files[0];
    //     reader.onloadend = () => {
    //         this.setState({
    //             file: file,
    //             imagePreviewUrl: reader.result
    //         });
    //     }
    //     reader.readAsDataURL(file);
    // }

export default ProfileForm;