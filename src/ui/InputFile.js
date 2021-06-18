import { prettyDOM } from '@testing-library/react';
import React from 'react';
import '../styles/shared.css';
import PreviewImageWrapper from './PreviewImage';

/**
* @class InputBox
* @desc Component to display Text input 
*/
export default class InputFile extends React.Component{
    render() {
        return (
          <section className="text-input">
            <div className="name-container">{this.props.name}</div>
            <input 
                type="file" 
                className="upload" 
                onChange={this.props.fileSelectHandler}
                accept=".png, .jpg, .jpeg, .svg"
                data-max-size="1024"
                multiple={this.props.multiple}
            />
            <PreviewImageWrapper source={this.props.previewImage}/>
          </section>
        );
    }
}