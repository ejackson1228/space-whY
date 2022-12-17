import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import ImageUploading from 'react-images-uploading';


const profileForm = ({ user }) => {
    const [addProfile, { error }] = useMutation(/*add_profile*/);
    const [characterCount, setCharacterCount] = useState(0);
    const [bioBody, setBioBody] = useState("");
    const [avatar, setAvatar] = useState(src="");

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setBioBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleSubmit = async (event) => {
        
        try {
            await addProfile({
                variables: { }
            })
        } catch(e) {
            console.error(e)
        };
    };

    const [image, setImage] = useState();
    const maxNumber = 69;
    const onChange = (image) => {
        console.log(image)
        setImage(image);
    }

 

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
                        <ImageUploading
                        value={image}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey='data_url'
                        acceptType={"jpg"}
                        >
                            {({
                                image,
                                onImageUpload,
                                onImageRemove,
                                onImageUpdate,
                                isDragging,
                                dragProps
                            }) => (

                                <div className='upload__image-wrapper'>
                                    <button style={ isDragging ? { color: "red" } : null }
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    >
                                        Click or Drop Here
                                    </button>
                                    &nbsp;
                                    <button onClick={onImageRemove}>Remove Image</button>
                                    {image && 
                                    <div key={image} className="image-item">
                                        <img src={image.data_url} alt="" width="100" />
                                        <div className='image-item__btn-wrapper'>
                                            <button onClick={() => onImageUpdate(image)}>Update</button>
                                            <button onClick={() => onImageRemove(image)}>Remove</button>
                                        </div>
                                    </div>
                                    }
                                </div>
                            )}
                        </ImageUploading>
                        
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

export default profileForm;


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