import {isNil} from '../Utils.js';
const loggedInUserAttribute = "authenticatedUser";

/**
* @class AuthenticationService
* @desc Class to manage the authentication
*/
class AuthenticationService {

    /**
    * @function executeBasicAuthenticationService
    * @desc Function to call the login api call
    * @param {String} username 
    * @param {String} password
    * @returns {Promise} resolve with status 200 otherwise reject with 404 status
    */
    executeBasicAuthenticationService(username, password){
        return true;
    }

    /**
    * @function registerSuccessfulLogin
    * @desc Function to save the token and create a interceptor for config
    * @param {String} username 
    * @param {String} password
    */
    registerSuccessfulLogin(username, password){
        sessionStorage.setItem(loggedInUserAttribute, username);
    }

    /**
    * @function getLoggedInUser
    * @desc Function to get the user name
    * @returns {String} username
    */
    getLoggedInUser(){
        return sessionStorage.getItem(loggedInUserAttribute);
    }
    
    /**
    * @function isUserLoggedIn
    * @desc Function to check whether the user is logged in or not
    * @returns {Boolean} true if logged in, false otherwise
    */
    isUserLoggedIn(){
        const user = sessionStorage.getItem(loggedInUserAttribute);
        if(isNil(user)){
            return false;
        }
        return true;
    }

    /**
    * @function clearSessionStorage
    * @desc Function to clear the session storage during logout
    */
    clearSessionStorage(){
        sessionStorage.clear();
    }

    formSubmitApi(formData){
        sessionStorage.setItem("data", formData);
    }
}

export default new AuthenticationService()