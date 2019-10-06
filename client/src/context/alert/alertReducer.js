const alertReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_ALERT':
      return [...state, action.payload];
    case 'REMOVE_ALERT':
      return state.filter(alert => alert.id !== action.payload);
    case 'CLEAR_ALERTS':
      return [];
    default:
      return state;
  }
};

export default alertReducer;
