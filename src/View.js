import React from "react";
import "./index.css";

export default class View extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: this.props.children
        }
        this.props.editor.api.view = this;
    }
    render(){
        return (
            <div id="board" contentEditable="false" onClick={this.props.onClick}>
                {this.state.content}
            </div>
        )
    }
}