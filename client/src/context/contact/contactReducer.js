const contactReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CONTACTS':
      return {
        ...state,
        contacts: action.payload
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        )
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        )
      };
    case 'SET_CURRENT_CONTACT':
      return { ...state, currentContact: action.payload };
    case 'CLEAR_CURRENT_CONTACT':
      return { ...state, currentContact: null };
    case 'CLEAR_CONTACTS':
      return { ...action.payload };
    case 'FILTER_CONTACTS':
      return {
        ...state,
        filteredContacts: state.contacts.filter(contact => {
          const re = new RegExp(action.payload, 'gi');
          return re.test(contact.name) || re.test(contact.email);
        })
      };
    case 'CLEAR_FILTER':
      return { ...state, filteredContacts: null };
    case 'CONTACT_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default contactReducer;
