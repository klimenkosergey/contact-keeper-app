import React, { useContext, useState, useEffect } from 'react';

import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  };

  const [{ name, email, phone, type }, setForm] = useState(initialState);
  const {
    currentContact,
    addContact,
    updateContact,
    clearCurrentContact
  } = useContext(ContactContext);

  useEffect(() => {
    if (currentContact) {
      // If current contact selected fill its values into the form
      setForm(currentContact);
    } else {
      // If current contact was cleared (for example item removed), clear form
      setForm(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentContact]);

  const onSubmit = e => {
    e.preventDefault();
    // If we have current contact selected, update it and clear the form
    if (currentContact) {
      updateContact({ _id: currentContact._id, name, email, phone, type });
      clearCurrentContact();
    } else {
      addContact({ name, email, phone, type });
      // Clear inputs
      setForm(initialState);
    }
  };

  const onChange = e => {
    // Pass in other values, and override the current value
    setForm({ name, email, phone, type, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {currentContact ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email address'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone number'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h4>Contact Type</h4>
      <input
        type='radio'
        name='type'
        value='personal'
        onChange={onChange}
        checked={type === 'personal'}
      />{' '}
      Personal
      <input
        type='radio'
        name='type'
        value='professional'
        onChange={onChange}
        checked={type === 'professional'}
        style={{ marginLeft: '10px' }}
      />{' '}
      Professional
      <div>
        <button type='submit' className='btn btn-primary btn-block'>
          {currentContact ? 'Edit Contact' : 'Add Contact'}
        </button>
        {currentContact && (
          <button
            className='btn btn-danger btn-block'
            style={{ marginTop: '15px' }}
            onClick={() => clearCurrentContact()}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
