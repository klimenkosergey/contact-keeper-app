import React, { Fragment, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/alertContext';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const ContactList = () => {
  const { error, loadContacts, contacts, filteredContacts } = useContext(
    ContactContext
  );

  const { createAlert } = useContext(AlertContext);

  // Same as componentDidMount
  useEffect(() => {
    loadContacts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      createAlert(error, 'danger');
    }
    // eslint-disable-next-line
  }, [error]);

  if (contacts.length === 0) {
    // Contacts are initial state = empty array
    return <h4>No Contacts</h4>;
  } else if (!filteredContacts) {
    // We have contacts, but no filter was set
    return (
      <Fragment>
        {contacts.map(contact => (
          <ContactItem key={contact._id} contact={contact} />
        ))}
      </Fragment>
    );
  } else {
    // Return filtered contacts
    return (
      <Fragment>
        {filteredContacts.length === 0 ? (
          <h4>No Matches Found</h4>
        ) : (
          filteredContacts.map(contact => (
            <ContactItem key={contact._id} contact={contact} />
          ))
        )}
      </Fragment>
    );
  }
};

export default ContactList;
