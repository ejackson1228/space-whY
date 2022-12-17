import React from 'react';
import { useMutation } from '@apollo/client';


const profileForm = ({ user }) => {


    return (
        <div>
            <h2>Create your Profile</h2>
            <div>
                <form>
                    <div id="age-verification">
                        <p>Are you at least 18 years of age?</p>
                        <input type="radio" id="user-age-yes">Yes</input>
                        <input type="radio" id="user-age-no">No</input>
                    </div>
                    <div id="profile-avatar">
                        
                    </div>
                    <div id="profile-bio-form">
                        <h5>Write something about yourself for your bio:</h5>
                        <textarea id="profile-bio" placeholder='Write something about yourself...'></textarea>
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
}