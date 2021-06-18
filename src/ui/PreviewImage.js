import React from 'react';
import '../styles/shared.css';

export class PreviewImage extends React.Component{
    
    render(){
        return(
            <main>
                <img className="preview-image" src={this.props.source}></img>
            </main>
        )
    }
}

export default class PreviewImageWrapper extends React.Component {
    render(){
        return(
            <div>
                {Array.isArray(this.props.source) ? 
                    this.props.source.map((item, index) => 
                    <PreviewImage source={item} key={index}/>
                    ) : <PreviewImage source={this.props.source}/>
                 }
            </div> 
        )
    }
}

