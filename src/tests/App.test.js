import React from 'react';
import TestUtils from 'react-dom/test-utils';
import App from '../App.js';

it("clicking on save should call the appropriate handler", () => {
  let appView = TestUtils.renderIntoDocument(<App />);
  expect(appView).not.toBeNull();
  spyOn(appView, "_handleSave");
  let saveButton = TestUtils.findRenderedDOMComponentWithClass(appView, "save-button");
  expect(saveButton).not.toBeNull();
  TestUtils.Simulate.click(saveButton);
  expect(appView.state.saveClicked).toBe(true); 
});

it("clicking on toggle highlighter should call the appropriate handler", () => {
  let appView = TestUtils.renderIntoDocument(<App />);
  expect(appView).not.toBeNull();
  spyOn(appView, "_handleToggleHighlighter");
  let saveButton = TestUtils.findRenderedDOMComponentWithClass(appView, "toggle-highligher-button");
  expect(saveButton).not.toBeNull();
  TestUtils.Simulate.click(saveButton);
  expect(appView.state.highlightFeatureEnabled).toBe(false); 
});

it("highlighter button should be toggled based on the highlighter button", () => {
  let appView = TestUtils.renderIntoDocument(<App />);
  expect(appView).not.toBeNull();
  spyOn(appView, "_handleToggleHighlighter");
  let toggleHighlighterButton = TestUtils.findRenderedDOMComponentWithClass(appView, "toggle-highligher-button");
  let highlightbutton = TestUtils.findRenderedDOMComponentWithClass(appView, "highlighter-button");
  expect(toggleHighlighterButton).not.toBeNull();
  TestUtils.Simulate.click(toggleHighlighterButton);
  expect(highlightbutton.disabled).toBe(true); 
});

