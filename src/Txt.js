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
    }

    handleDelete = (e) => {
        if(e.key === "Backspace"){
            console.log(e.target.children[0].innerHTML, e.target.children[0].tagName)
            if(e.target.children[0].innerHTML === "<br>" || e.target.children[0].innerHTML === ""){
                e.preventDefault();
                e.target.children[0].innerHTML = "";
            } else if (e.target.children[0].tagName === "UL" && (e.target.children[0].children[0].innerHTML === "" || e.target.children[0].children[0].innerHTML === "<br>")){
                e.preventDefault();
                e.target.children[0].children[0].innerHTML = "";
            }
        }
    }

    getContent = () => {
        this.node = ReactDOM.findDOMNode(this);
        console.log(this.node, this.node.children)
        for(const i of this.node.children){
            this.content.push(i);
        }
        return this.content;
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

        let tt, li;
        if(this.state.type){
            if(this.state.type === 0){
                tt=<p className="pa" placeholder={ph}></p>
            } else if (this.state.type === 1){
                li=[]
                this.getContent();
                for(let i=0; i<this.content.length; i++){
                    li.push(<li className="pa" placeholder={ph}>{this.content[i].innerHTML}</li>);
                }
                console.log(this.content, li);
                tt=<ul>{li}</ul>
            } else if (this.state.type === 2){
                tt=<ol><li className="pa" placeholder={ph}></li></ol>
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
            <span className={"ta "+ t} style={ta} contentEditable="true" spellCheck="false" onKeyDown={this.handleDelete} onClick={(e) => this.props.onClick(e, this)}>{tt}</span>
        );
    }
}
