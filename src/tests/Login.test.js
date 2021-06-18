import React from 'react';
import Login from '../ui/Login.js';
import TestRender from 'react-test-renderer';
import { AuthContext } from '../Router.js';
import AuthenticationService from '../ui/AuthenticationService.js';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
configure({ adapter: new Adapter() });



it("should render dom with correct elements", ()=>{
    let dispatch = jest.fn();
    let loginView = new TestRender.create(
        <AuthContext.Provider value={{dispatch}}>
            <Login />
        </AuthContext.Provider>
        )
    expect(loginView.root.findByProps({className : "login-container"})).not.toBeNull();
    expect(loginView.root.findByProps({name : "username"}).props.placeholder).toEqual("Username")
    expect(loginView.root.findByProps({name : "password"}).props.placeholder).toEqual("Password")
    expect(loginView.root.findByProps({className : "signin"})).not.toBeNull();
});

it("login button should be in enabled state initially", ()=> {
    let dispatch = jest.fn();
    let loginView = new TestRender.create(
        <AuthContext.Provider value={{dispatch}}>
            <Login />
        </AuthContext.Provider>
        )
    expect(loginView.root.findByProps({className : "signin"}).props.disabled).toEqual(false);
});

it("should call authentication service when sign in button is clciked", ()=> {
    let dispatch = jest.fn();
    let loginView;
    let container = document.createElement("div");
    document.body.appendChild(container);

    loginView = mount(
        <AuthContext.Provider value={{dispatch}}>
                <Login />
        </AuthContext.Provider>
    );
    spyOn(AuthenticationService, "executeBasicAuthenticationService").and.returnValue(true);
    let button = loginView.find('.signin')
    button.simulate('click');
    expect(AuthenticationService.executeBasicAuthenticationService).toBeCalled();
});


