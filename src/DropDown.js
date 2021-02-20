import React from "react";
import "./index.css";

import {SVGArrowDown} from "./SVGs";
import {Button} from "./Button";

class DropDown extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.activeLabel)
        this.state = {
            isOpen: false,
            activeLabel: (this.props.activeLabel) ? this.props.activeLabel : this.props.items[0].label,
        }
        if(this.props.editor) this.props.editor.api[this.props.apiName] = this;
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        console.log(this.props.editor.api[this.props.apiName], this.props.activeLabel)
        if(this.props.apiName) this.setState({activeLabel: this.props.editor.api[this.props.apiName+"AL"]});
    }

    handleClick = (e) => {
        (this.state.isOpen) ? this.setState({isOpen: false}) : this.setState({isOpen: true});
    }

    render(){
        let c = this.props.items.map(o => {
            return (
                <DropDownItem key={o.label} className={(o.label === this.state.activeLabel) ? o.style.clicked : o.style.default} onClick={(e)=>o.onClick(e, this)}>{o.label}</DropDownItem>
            )
        })

        return (
            <div className="dd-container ml-5" onClick={this.handleClick}>
                <Button style={(this.state.isOpen) ? "itemID-pressed" : "itemID"} onClick={this.handleClick}>{this.state.activeLabel} <SVGArrowDown/></Button>
                <div className={(this.state.isOpen) ? "dd-container-i" : "dd-container-i unvisible"}>
                    {c}
                </div>
            </div>
        );
    }
}

class DropDownItem extends React.Component{
    render(){
        return (
            <div className={this.props.className} onClick={this.props.onClick}>{this.props.children}</div>
        );
    }
}

export {DropDown, DropDownItem}