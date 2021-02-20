import React from "react";
import "./index.css";

class Button extends React.Component{
    render(){
        return (
            <span className={this.props.style} onClick={this.props.onClick}>{this.props.children}</span>
        )
    }
}

class FileInputButton extends React.Component{
    constructor(props){
        super(props);
        this.id = Date.now();
    }

    render(){
        return (
            <>
                <label for={this.id} className="fl-ac">
                    <span className="i-btn material-icons-outlined">{this.props.children}</span>
                </label>
                <input id={this.id} type="file" onChange={this.props.onInput}/>
            </>
        );
    }
}

export {Button, FileInputButton}