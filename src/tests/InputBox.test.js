import React from 'react';
import TestUtils from 'react-dom/test-utils';
import InputBox from '../ui/InputBox.js';

it('should change state as the value changes', () => {
    let textValue = "test1";
    let textInput = TestUtils.renderIntoDocument(
                    <InputBox values={textValue}/>
                  );
    let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    text.value="test2";
    TestUtils.Simulate.change(text);
    let newText = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(newText.value).toEqual("test2");
});

it("should set the type property for the input when it is passed as a prop", () => {
    let textValue = "test1";
    let textInput = TestUtils.renderIntoDocument(
                    <InputBox values={textValue} type="date"/>
                  );
    let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(text.getAttribute("type")).toEqual("date");
});

it("should set type property to text when no prop is sent", () => {
    let textValue = "test1";
    let textInput = TestUtils.renderIntoDocument(
                    <InputBox values={textValue} maxLength="100"/>
                  );
    let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(text.value).toEqual("test1");
    expect(text.getAttribute("type")).toEqual("text");
});

it("should set the max length property for the input when it is passed as a prop", () => {
    let textValue = "test1";
    let textInput = TestUtils.renderIntoDocument(
                    <InputBox values={textValue} maxLength="100"/>
                  );
    let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(text.value).toEqual("test1");
    expect(text.getAttribute("maxlength")).toEqual("100");
});

it("should add focussed class when text input is focussed", (done) => {
    let textValue = "";
    let textInput = TestUtils.renderIntoDocument(<InputBox values={textValue}/>);
    TestUtils.Simulate.focus(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input focussed")).not.toBeNull();
      done();
    }, 10);
});

it("should remove focussed class when text input is blurred", (done) => {
    let textValue = "";
    let textInput = TestUtils.renderIntoDocument(<InputBox values={textValue}/>);
    TestUtils.Simulate.focus(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
    setTimeout(() => {
      expect(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input focussed")).not.toBeNull();
      TestUtils.Simulate.blur(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
      setTimeout(() => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(textInput, "text-input focussed").length).toEqual(0);
        done();
      }, 10);
    }, 10);
});

it("should call focus on input when clicked", (done) => {
    let textValue = "";
    let textInput = TestUtils.renderIntoDocument(<InputBox values={textValue}/>);
    spyOn(textInput.input, "focus");
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
    setTimeout(() => {
      expect(textInput.input.focus).toHaveBeenCalled();
      done();
    }, 10);
});

it("should change the style when something is dropped over the inputBox", () => {
    let textValue = "";
    let textInput = TestUtils.renderIntoDocument(<InputBox values={textValue}/>);
    let style  = {'backgroundColor': 'rgb(255, 255, 199)'};
    TestUtils.Simulate.drop(TestUtils.findRenderedDOMComponentWithClass(textInput, "text-input"));
});

it("should call preventDefault when alphabet is pressed with allowOnlyNumber prop set to true ", () => {
  let textValue = "test1";
    let textInput = TestUtils.renderIntoDocument(
                    <InputBox maxLength="5" allowOnlyNumber={true}/>
                  );
    let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(text.getAttribute("maxlength")).toEqual("5");
    let spy = jasmine.createSpy("spy");
    TestUtils.Simulate.keyPress(text, {key: "a", preventDefault: spy} );
    expect(spy).toHaveBeenCalled();
});

it("should not call preventDefault when alphabet is pressed with allowOnlyNumber prop set to true ", () => {
  let textValue = "test1";
    let textInput = TestUtils.renderIntoDocument(
                    <InputBox maxLength="5" allowOnlyNumber={true}/>
                  );
    let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(text.getAttribute("maxlength")).toEqual("5");
    let spy = jasmine.createSpy("spy");
    TestUtils.Simulate.keyPress(text, {key: "1", preventDefault: spy} );
    expect(spy).not.toHaveBeenCalled();
});

it("should not call preventDefault when number is pressed with allowOnlyNumber prop set to false ", () => {
  let textValue = "test1";
    let textInput = TestUtils.renderIntoDocument(
                    <InputBox maxLength="5" allowOnlyNumber={false}/>
                  );
    let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    expect(text.getAttribute("maxlength")).toEqual("5");
    let spy = jasmine.createSpy("spy");
    TestUtils.Simulate.keyPress(text, {key: "1", preventDefault: spy} );
    expect(spy).not.toHaveBeenCalled();
});

it("should call onMaxLengthReached when maxLength is reached", () => {
    let textInput = TestUtils.renderIntoDocument(<InputBox maxLength="5"/>);
    spyOn(textInput, "_onMaxLengthReached");
    let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
    text.value="112234";
    TestUtils.Simulate.change(text);
    expect(textInput._onMaxLengthReached).toHaveBeenCalled();
});

it("should call not onMaxLengthReached when maxLength is not reached", () => {
  let textInput = TestUtils.renderIntoDocument(<InputBox maxLength="5"/>);
  spyOn(textInput, "_onMaxLengthReached");
  let text = TestUtils.findRenderedDOMComponentWithClass(textInput, "value-container");
  text.value="1122";
  TestUtils.Simulate.change(text);
  expect(textInput._onMaxLengthReached).not.toHaveBeenCalled();
});



