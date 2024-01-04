import { createStore } from 'redux';

const initialState = {
  isAuthenticated: false,
  user: null,
  // other state properties related to authentication
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.payload);
      return { ...state, isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const store = createStore(authReducer);

export default store;