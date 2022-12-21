import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import axios from 'axios';
// import {Image} from 'cloudinary-react';
import { ADD_PROFILE } from '../../utils/mutations';


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
        <div>
            <h2>Create your Profile</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <div id="age-verification">
                        <p>Are you at least 18 years of age?</p>
                        <input type="radio" id="user-age-yes">Yes</input>
                        <input type="radio" id="user-age-no">No</input>
                    </div>
                    <div className='image-upload'>
                        <p> Upload a picture to display as your avatar! </p>
                        <input type="file" onChange={(e) => {setSelectedImage(e.target.files[0])}} />
                    </div>
                    <div id="profile-bio-form">
                        <p className={`${characterCount === 280 ? 'text-error' : ''}`}>Character Count: {characterCount}/280</p>
                        <h5>Write a short bio:</h5>
                        <textarea 
                        id="profile-bio" 
                        placeholder='Write something about yourself...'
                        onChange={handleChange}
                        value={bioBody}
                        ></textarea>
                    </div>
                    <div id="profile-linktree">
                        <h5>If there are links you'd like to share on your profile, please paste the URL here:</h5>
                        <input type="url" id="profile-twitter" placeholder='your twitter url here...'></input>
                        <input type="url" id="profile-facebook" placeholder='your facebook url here...'></input>
                        <input type="url" id="profile-github" placeholder='your github url here...'></input>
                        <input type="url" id="profile-instagram" placeholder='your instagram url here...'></input>
                        <input type="url" id="profile-linkedin" placeholder='your linkedin url here...'></input>
                    </div>
                    <div id='profile-song'>
                        <h5>If there is a song you'd like to feature on your profile, select one here:</h5>
                        
                    </div>
                </form>
            </div>
        </div>
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