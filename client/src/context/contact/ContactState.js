import React, { useReducer } from 'react';
import axios from 'axios';

import ContactContext from './contactContext';
import contactReducer from './contactReducer';

const ContactState = props => {
  const initialState = {
    contacts: [],
    currentContact: null,
    filteredContacts: null,
    error: null
  };

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Load User Contacts
  const loadContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: 'LOAD_CONTACTS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: 'Error loading contacts' });
    }
  };

  // Add Contact
  const addContact = async contact => {
    try {
      const res = await axios.post('/api/contacts', contact, axiosConfig);
      dispatch({ type: 'ADD_CONTACT', payload: res.data });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: 'Error adding contact' });
    }
  };

  // Delete Contact
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: 'Error removing contact' });
    }
  };

  // Set Current Contact
  const setCurrentContact = contact => {
    dispatch({ type: 'SET_CURRENT_CONTACT', payload: contact });
  };

  // Clear Current Contact
  const clearCurrentContact = () => {
    dispatch({ type: 'CLEAR_CURRENT_CONTACT' });
  };

  // Update Contact
  const updateContact = async contact => {
    try {
      await axios.put(`/api/contacts/${contact._id}`, contact, axiosConfig);
      dispatch({ type: 'UPDATE_CONTACT', payload: contact });
    } catch (error) {
      dispatch({ type: 'CONTACT_ERROR', payload: 'Error updating contact' });
    }
  };

  // Filter Contacts
  const filterContacts = text => {
    dispatch({ type: 'FILTER_CONTACTS', payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: 'CLEAR_CONTACTS', payload: initialState });
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filteredContacts: state.filteredContacts,
        error: state.error,
        loadContacts,
        addContact,
        deleteContact,
        updateContact,
        setCurrentContact,
        clearCurrentContact,
        filterContacts,
        clearFilter,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
