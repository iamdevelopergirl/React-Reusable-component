import React from 'react';
import TestUtils from 'react-dom/test-utils';
import PreviewImageWrapper from '../ui/PreviewImage';

it('should render 2 items when 2 images are sent', (done) => {
    let source = ["1.png", "2.png"];
    let itemsView = TestUtils.renderIntoDocument(
                      <PreviewImageWrapper source={source}/>
                  );
    
    setTimeout(() => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(itemsView, "preview-image").length).toEqual(2);
      done();
    }, 500);
});

it('should render 1 items when 1 image is sent', (done) => {
    let source = ["1.png"];
    let itemsView = TestUtils.renderIntoDocument(
                      <PreviewImageWrapper source={source}/>
                  );
    
    setTimeout(() => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(itemsView, "preview-image").length).toEqual(1);
      done();
    }, 500);
});