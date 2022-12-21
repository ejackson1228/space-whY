import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CommentForm = ({ inklingId }) => {
  const [commentBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 400) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentBody, inklingId },
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card className='m-5 p-3'>
      <p
        className={`${characterCount === 400 || error ? 'text-error' : ''}`}
      >
        {characterCount}/400
        {error && <span>Something went wrong...</span>}
      </p>
      <Form
        onSubmit={handleFormSubmit}
      >
        <Form.Group>
          <Form.Control as="textarea" rows={1}
            placeholder="Let's hear it!"
            value={commentBody}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant='dark' className='my-2'>
            {/* maybe replace text with icon */}
          Submit
        </Button>
      </Form>

      {error && <div>Something went wrong...</div>}
    </Card>
  );
};

export default CommentForm;
