import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_INKLING } from '../../utils/mutations';
import { QUERY_INKLINGS, QUERY_ME } from '../../utils/queries';

const InklingForm = () => {
    const [inklingText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

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

        try {
            await addInkling({
                variables: { inklingText },
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