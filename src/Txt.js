import { useEffect, useRef } from "react";

const Txt = ({ style, type, id, text, txtAlign, handleClick, handleKey }) => {
    const nodeRef = useRef();

    document.designMode = "on";
    document.execCommand("defaultParagraphSeparator", false, "p");

    let t, ph;
    switch(parseInt(style)){
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
            t = type;
            ph = text;
            break;
    }
    let ta;
    if(parseInt(txtAlign)){
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

    useEffect(()=>{
        nodeRef.current.focus();
        setTimeout(()=>handleClick(id), 1)
    }, [])

    return (
        <span 
            ref={nodeRef}
            className={"ta "+ t} 
            style={ta} 
            contentEditable="true" 
            spellCheck="false" 
            onKeyDown={handleKey} 
            onClick={() => {
                handleClick(id);
            }}
        ><p className="pa" placeholder={ph}></p></span>

    );
}
 
export default Txt;