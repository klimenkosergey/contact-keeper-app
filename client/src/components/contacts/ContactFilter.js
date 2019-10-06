import React, { useContext, useRef, useEffect } from 'react';

import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
  const { contacts, filterContacts, clearFilter } = useContext(ContactContext);
  const text = useRef('');

  useEffect(() => {
    // In case contacts array changes (item added / removed)
    // call onChange to update filteredContacts to up-to-date data
    onChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts]);

  const onChange = e => {
    if (text.current.value === '') {
      clearFilter();
    } else {
      filterContacts(text.current.value);
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;
