import React from 'react';
import Main from './ui/Main.js';
import Login from './ui/Login.js';
import AuthenticationService from './ui/AuthenticationService.js';
export const AuthContext = React.createContext();


const initialState = {
  isAuthenticated: false,
  user: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.username
      };
    case "LOGOUT":
      sessionStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};


/**
* @function App
* @desc App component that routes the login page or main page
*/
function Router() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  if(AuthenticationService.isUserLoggedIn()){
    state.user = AuthenticationService.getLoggedInUser();
    state.isAuthenticated = true; 
  }
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}>
      <div className="App">
        <div className="App">{!state.isAuthenticated ? <Login/> : <Main/>}</div>
      </div>
    </AuthContext.Provider>
  );
}

export default Router;
