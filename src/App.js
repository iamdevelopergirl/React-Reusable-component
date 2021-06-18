import React from 'react';
import './App.css';
import './styles/shared.css';
import InputBox from './ui/InputBox';
import InputFile from './ui/InputFile';
import {isNil, isString} from './Utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHighlighter } from '@fortawesome/free-solid-svg-icons'
import AuthenticationService from './ui/AuthenticationService.js'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      saveClicked : false,
      selectedFileFromInput1 : null,
      selectedFilesFromInput2 : null,
      highlightStyle : {},
      highlightFeatureEnabled : true,
    }
    this.formData = new FormData();
    this._handleSave = this._handleSave.bind(this);
    this._handleToggleHighlighter = this._handleToggleHighlighter.bind(this);
  }

  _onDrag = (e) => {
    e.preventDefault();
  }

  _handleSave = () => {
    this.formData.append("field1", this.field1input.state.values);
    this.formData.append("field2", this.field2input.state.values);
    this.formData.append("field3", this.field3input.state.values);
    this.formData.append("field4", this.field4input.state.values);

    if(!isString(this.state.selectedFileFromInput1)){
      this.formData.append("fileInput1", this.state.selectedFileFromInput1);  
    }
    if(!isString(this.state.selectedFilesFromInput2)){
      this.formData.append("fileInput2", this.state.selectedFilesFromInput2);  
    }
    
    this.setState({
      saveClicked : !this.state.saveClicked
    });

    AuthenticationService.formSubmitApi(this.formData);
  }

  _singleFileSelectHandler = (e) => {
    this.setState({
      selectedFileFromInput1 : URL.createObjectURL(e.target.files[0])
    });
  }

  _multiFileSelectHandler = (e) => {
    let fileArray = [];
    let filesFromEvent = e.target.files;
    for(let i = 0; i < filesFromEvent.length; i++){
      fileArray.push(URL.createObjectURL(filesFromEvent[i]));
    }
    this.setState({
      selectedFilesFromInput2 : fileArray
    });
  }

  _handleToggleHighlighter = () => {
    this.setState({
      highlightFeatureEnabled : !this.state.highlightFeatureEnabled
    });
  }

  render(){
    return (
      <div className="App">
        <div className="inner-container">
        <main>
          <header className="App-header">
            Form
          </header>
          <section className="container">
            <InputBox 
              type="text" 
              name="Field 1 - Text"
              ref={(input) => {
                  this.field1input = input;
              }}
            />
            <InputBox 
              type="date" 
              name="Field 2 - Date"
              ref={(input) => {
                  this.field2input = input;
              }}
            />
            <InputBox 
              allowOnlyNumber={true} 
              name="Field 3 - Only Number without max length"
              ref={(input) => {
                  this.field3input = input;
              }}
            />
            <InputBox 
              allowOnlyNumber={true} 
              maxLength="10" 
              name="Field 4 - Only Number with max length 10"
              ref={(input) => {
                  this.field4input = input;
              }}
            />
            <InputFile
              type="file" 
              name="Field 5 - Single File" 
              multiple={false}
              fileSelectHandler={this._singleFileSelectHandler}
              previewImage={isNil(this.state.selectedFileFromInput1) ? "" : this.state.selectedFileFromInput1}
            />
            <InputFile 
              type="file" 
              name="Field 6 - Multiple Files" 
              multiple={true}
              fileSelectHandler={this._multiFileSelectHandler}
              previewImage={isNil(this.state.selectedFilesFromInput2) ? "" : this.state.selectedFilesFromInput2}
            />
  
          </section>
          <section>
            <button className="save-button" name="Save" onClick={this._handleSave}>Save</button>
          </section>
        </main>
        <main className="highlighter-container">
          <section className="toggle-highligher">
              <button className="toggle-highligher-button" name="Toggle Highlighter" onClick={this._handleToggleHighlighter}>Toggle Highlighter</button>
          </section>

          <section className="highlighter">
              <button className="highlighter-button" draggable={this.state.highlightFeatureEnabled} disabled={!this.state.highlightFeatureEnabled} onDrag={this._onDrag}>
                <FontAwesomeIcon icon={faHighlighter} size='2x'/>
              </button>
          </section>
        </main>
        </div>
      </div>
    );
  }
}

