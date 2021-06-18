import React from 'react';
import '../styles/shared.css';

/**
* @class InputBox
* @desc Component to display Text input 
*/
export default class InputBox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            values : props.values,
            allowOnlyNumber : props.allowOnlyNumber,
            currentState : "",
            highlightStyle : {},
        }
        this._onMaxLengthReached = this._onMaxLengthReached.bind(this);
    }

    _onMaxLengthReached = (e) => {
        e.preventDefault();
    }

    _handleChange = (e) => {
        this.setState({
            values : e.target.value
        });
        if(this.props.maxLength &&
            e.target.value.length >= parseInt(this.props.maxLength)) {
            this._onMaxLengthReached(e);
        }
    }

    _onClick = () => {
        this.input.focus();
    }

    _onFocus = (e) => {
        let val = e.target.value;
        e.target.value = '';
        e.target.value = val;
        this.setState({ 
            currentState : "focussed" 
        });
    }

    _onBlur = (e) => {
        this.setState({
            currentState: "",
        });
    }

    _onKeyPress = (e) => {
        if(this.state.allowOnlyNumber === true){
            const re = /[0-9]+/g;
            if (!re.test(e.key)) {
                e.preventDefault();
            }
        }
    }

    _onDrop = (e) => {
        console.log(e.target);
        let style  = {'backgroundColor': 'rgb(255, 255, 199)'};
        this.setState({
          highlightStyle : style
        })
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    _onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    render() {
        let className = "text-input";
        if(this.state.currentState !== ""){
            className = `${className} ${this.state.currentState}`;
        }
        return (
          <section className={className} style={this.state.highlightStyle} onFocus={this._onFocus} onClick={this._onClick} onBlur={this._onBlur} onDrop={this._onDrop} onDragOver={this._onDragOver}>
            <div className="name-container">{this.props.name}</div>
            <input type={this.props.type || "text"} className="value-container" style={this.state.highlightStyle} value={this.state.values}
              ref={(input) => this.input=input} onChange={this._handleChange} maxLength={this.props.maxLength}
              onKeyPress={this._onKeyPress} multiple={this.props.multiple}/>
          </section>
        );
    }
}