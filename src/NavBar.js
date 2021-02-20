import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Dummy(){
    return (
        <div className="dummy-container"></div>
    );
}

class HeaderM extends React.Component{
    /* TODO
    handleClick = () => {
        this.node = ReactDOM.findDOMNode(this);
        this.node.className = "-0";
    }
    */
    render(){
        return (
            <div className={"mHl mr-5 fl-ac " + this.props.styleClass} onClick={this.handleClick}>{this.props.children}</div>
        )
    }
}

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cume: this.props.sm,
        }
        this.props.editor.api.navBar = this;
    }
    render(){
        //if(this.state.cume) console.log(this.state.cume.props.children[2].props.apiName)
        //if(this.state.cume.props.children[2].props.apiName) this.props.editor.api[this.state.cume.props.children[2].props.apiName].setState({activeLabel: this.state.al[0]})
        //this.api.ddTxt.setState({activeLabel: s});
        return (
            <div className="menu-container">
                <div className="menu-elem-container">
                    <div className="fl-r">
                        {this.state.cume}
                    </div>
                </div>
            </div>
        );
    }
}

export {NavBar, HeaderM, Dummy}