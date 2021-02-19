import React from "react";

export default class Image extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style: parseInt(this.props.style),
            clicked: false,
        }
    }

    render(){
        let t = "", it = "";
        switch(this.state.style){
            case 0:
                t = "img-b img-c-n img-ac";
                it = "img-n";
                break;
            case 1:
                t = "img-b img-c-w img-ac";
                it = "img-w";
                break;
        }

        return(
            <span style={{marginTop:"10px", marginBottom:"10px"}}>
                <span className={(this.state.clicked) ? t + " img-clicked" : t }>
                    <img src={this.props.dataURL} className={it} onClick={(e)=>this.props.onClick(e, this)} alt={this.props.alt} style={{height: "auto"}}></img>
                </span>
                <div className="img-caption ta" contentEditable="true" spellCheck="false" placeholder={(this.props.captionText) ? this.props.captionText : "Type some caption"}></div>
            </span>
        )
    }
}