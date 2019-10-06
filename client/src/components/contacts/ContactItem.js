import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact: { _id, name, email, phone, type } }) => {
  const {
    currentContact,
    deleteContact,
    setCurrentContact,
    clearCurrentContact
  } = useContext(ContactContext);

  const onSetCurrentContact = contact => {
    setCurrentContact(contact);
  };

  const onDelete = () => {
    // If currentContact is the one being deleted, clear current contact
    if (currentContact && currentContact._id === _id) clearCurrentContact();
    deleteContact(_id);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
          style={{ float: 'right', textTransform: 'capitalize' }}
        >
          {type}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => {
            onSetCurrentContact({ _id, name, email, phone, type });
          }}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
