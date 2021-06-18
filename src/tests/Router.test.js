import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mount } from 'enzyme';

import Router from '../Router.js';
import {reducer} from '../Router.js';

it("should render dom with main classname", () => {
  let appView = mount(<Router />);
  expect(appView.find('.App')).not.toBeNull();
});

it("should render dom with login class initially classname", () => {
  let appView = mount(<Router />);
  expect(appView.find('.App')).not.toBeNull();
  expect(appView.find('.login-container')).not.toBeNull();
});

it('returns new state for "LOGIN" type', () => {
  const initialState = {isAuthenticated : false, user : null};
  const updateAction = {type: 'LOGIN', payload : {
    username : "test"
  }};
  const updatedState = reducer(initialState, updateAction);
  expect(updatedState).toStrictEqual({isAuthenticated : true, user : "test"});
});

it('returns new state for LOGOUT type', () => {
  const initialState = {isAuthenticated : false, user : null};
  const updateAction = {type: 'LOGOUT'}
  const updatedState = reducer(initialState, updateAction);
  expect(updatedState).toStrictEqual(initialState);
});

it('returns new state for neither login nor logout type', () => {
  const initialState = {isAuthenticated : false, user : null};
  const updateAction = {type: ""}
  const updatedState = reducer(initialState, updateAction);
  expect(updatedState).toStrictEqual(initialState);
});



