import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

export default class Txt extends React.Component{
    constructor(props){
        super(props);
        /* style:
            0 - Paragraph
            1 - Title
            2 - Headline
            3 - Quote
        */
        this.state = {
            style: parseInt(this.props.style),
            type: parseInt(this.props.type),
            txtAlign: parseInt(this.props.txtAlign),
        }

        this.content = [];
    }

    componentDidMount(){
        this.node = ReactDOM.findDOMNode(this);
        this.node.focus();
        this.props.onClick(null, this); //uncomment to open text menu on focus
    }

    

    getContent = () => {
        this.node = ReactDOM.findDOMNode(this);
        if(this.node){
            for(const i of this.node.children){
                if(i !== "") return i.innerText;
                else return null;
            }
        }
    }

    render(){
        document.designMode = "on";
        document.execCommand("defaultParagraphSeparator", false, "p");

        let t, ph;
        switch(this.state.style){
            case 0:
                t = "taParagraph";
                ph = "Type something...";
                break;
            case 1:
                t = "taH1";
                ph = "Title";
                break;
            case 2:
                t = "taH2";
                ph = "Headline"
                break;
            case 3:
                t = "taQuote";
                ph = "Inspiring...";
                break;
            default:
                t = this.props.type;
                ph = this.props.text;
                break;
        }

        let tt, c;
        console.log(this.state.type)
        if(this.state.type !== undefined && this.state.type !== null && this.state.type !== NaN){
            c = this.getContent();
            if(this.state.type === 0){
                if(c) tt=<p className="pa" placeholder={ph}>{c}</p>
                else tt=<p className="pa" placeholder={ph}></p>
            } else if (this.state.type === 1){
                if(c) tt=<ul><li className="pa" placeholder={ph}>{c}</li></ul>
                else tt=<ul><li className="pa" placeholder={ph}></li></ul>
            } else if (this.state.type === 2){
                if(c) tt=<ol><li className="pa" placeholder={ph}>{c}</li></ol>
                else tt=<ol><li className="pa" placeholder={ph}></li></ol>
            }
        } else {
            tt = <p className="pa" placeholder={ph}></p>;
        }

        let ta;
        if(this.state.txtAlign){
            if(this.state.txtAlign === 0){
                ta={textAlign: "left"}
            } else if (this.state.txtAlign === 1){
                ta={textAlign: "center"}
            } else if (this.state.txtAlign === 2){
                ta={textAlign: "right"}
            } else if (this.state.txtAlign === 3){
                ta={textAlign: "justify", textJustify: "auto"}
            }
        } else {
            ta={textAlign: "left"};
        }

        return (
            <span className={"ta "+ t} style={ta} contentEditable="true" spellCheck="false" onKeyDown={this.props.onKeyDown} onClick={(e) => this.props.onClick(e, this)}>{tt}</span>
        );
    }
}
