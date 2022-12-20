import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_INKLING } from '../../utils/mutations';
import { QUERY_INKLINGS, QUERY_ME } from '../../utils/queries';

//try react-dropbox to implement image viewing before upload


const InklingForm = () => {
    const [inklingText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [selectedImage, setSelectedImage] = useState("");

    const [addInkling, { error }] = useMutation(ADD_INKLING, {
        update(cache, { data: { addInkling } }) {

            // could not exist yet so wrap in a try/catch
            try {
                // update me array's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, inklings: [...me.inklings, addInkling] } },
                });
            } catch (e) {
                console.warn('First thought insertion by user!')
            }

            // update inkling array's cache
            const { inklings } = cache.readQuery({ query: QUERY_INKLINGS });
            cache.writeQuery({
                query: QUERY_INKLINGS,
                data: { inklings: [addInkling, ...inklings] },
            });
        }
    });


    // update state based on form input changes
    const handleChange = (event) => {
        if (event.target.value.length <= 400) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', "space-why-iu");

        const response = await axios.post(`https://api.cloudinary.com/v1_1/dgyhfumot/image/upload`, formData);

        console.log(response);

        try {
            await addInkling({
                variables: { 
                inklingText: inklingText,
                image: response.data.public_id // this is a string returned from cloudinary to identify the image stored
                },                             // we will render the image by fetching via <Image> component from cloudinary
            });

            // clear form value
            setText('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p
                className={`${characterCount === 400 || error ? 'text-error' : ''}`}
            >
                {characterCount}/400
                {error && <span>Something went wrong...</span>}
            </p>
            <form
                onSubmit={handleFormSubmit}
            >
                <input type="file" onChange={(e) => {setSelectedImage(e.target.files[0])}} />
                <textarea
                    placeholder='Spread some ink...'
                    value={inklingText}
                    onChange={handleChange}
                ></textarea>
                <button type='submit'>
                    {/* Maybe replace button text with an icon/symbol? */}
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InklingForm;