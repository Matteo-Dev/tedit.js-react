import React, {useEffect, useRef, useState} from "react";
import "./index.css";
import { HeaderM, Navbar } from "./Navbar";
import {SVGSeparator} from "./SVGs";
import {DropDown, DropDownTest} from "./DropDown";
import Txt from "./Txt";
import {Button, FileInputButton} from "./Button";
import View from "./View";
import Image from "./Image";

/*
let imageStyles=[
    {
        label: "Normal",
        onClick: this.handleClickINormal.bind(this),
        style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
    },
    {
        label: "Wide",
        onClick: this.handleClickIWide.bind(this),
        style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
    },
]

let txtStyleButtonsObj = [
    {
        type: 0,
        img: "format_bold",
        listener: this.handleBold,
    },
    {
        type: 0,
        img: "format_italic",
        listener: this.handleItalic, 
    },
    {
        type: 0,
        img: "format_underline",
        listener: this.handleUnderline, 
    }
]
let listButtonsObj = [
    {
        type: 0,
        img: "format_list_bulleted",
        listener: this.handleUL.bind(this),
    },
    {
        type: 0,
        img: "format_list_numbered",
        listener: this.handleOL.bind(this),
    },
]
let addButtonsObj = [
    {
        type: 0,
        img: "title",
        listener: this.addTxt.bind(this),
    },
    {
        type: 1,
        img: "insert_photo",
        listener: this.handleInput.bind(this),
    },
]

const createButtons = obj => {
    if(obj.type === 0) return <Button key={i+=1} style="i-btn material-icons-outlined" onClick={(e)=>obj.listener(e)}>{obj.img}</Button>;
    else return <FileInputButton key={i+=1} style="i-btn material-icons-outlined" onInput={(e)=>obj.listener(e)}>{obj.img}</FileInputButton>
}
let i=0;
let txtStyleButtons = txtStyleButtonsObj.map(createButtons);
let listButtons = listButtonsObj.map(createButtons);
let addButtons = addButtonsObj.map(createButtons);
let removeButton = [
    {
        type: 0,
        img: "delete",
        listener: this.handleDelete.bind(this),
    },
].map(createButtons);

let imgAlignButtons = [
    {
        type: 0,
        img: "vertical_align_bottom",
        listener: (()=>{}).bind(this),
    },
    {
        type: 0,
        img: "vertical_align_center",
        listener: (()=>{}).bind(this),
    },
    {
        type: 0,
        img: "vertical_align_top",
        listener: (()=>{}).bind(this),
    },
].map(createButtons)

let txtAlignButtons = [
    {
        type: 0,
        img: "format_align_left",
        listener: this.handleTALeft.bind(this),
    },
    {
        type: 0,
        img: "format_align_center",
        listener: this.handleTACenter.bind(this),
    },
    {
        type: 0,
        img: "format_align_right",
        listener: this.handleTARight.bind(this),
    },
    {
        type: 0,
        img: "format_align_justify",
        listener: this.handleTAJustify.bind(this),
    },
].map(createButtons)

let txtLineSpacingButton = [
    {
        type: 0,
        img: "format_line_spacing",
        listener: (()=>{}).bind(this),
    },
].map(createButtons)

let txtLinkButton = [
    {
        type: 0,
        img: "link",
        listener: (()=>{}).bind(this),
    },
].map(createButtons);

/*
let txtMenu = <React.Fragment>
    <HeaderM>Text</HeaderM>
    <SVGSeparator/>
    <DropDown key={Date.now()*Math.random()} items={textStyles} editor={this} apiName="ddTxt" activeLabel={this.api.ddTxtAL}/>
    <SVGSeparator/>
    <div id="2" className="fl-ac ml-5">{txtStyleButtons}</div>
    <SVGSeparator/>
    <div id="2" className="fl-ac ml-5">{txtLinkButton}</div>
    
    <SVGSeparator/>
    <div id="2" className="fl-ac ml-5">{txtAlignButtons}</div>
    <SVGSeparator/>
    <div id="2" className="fl-ac ml-5">{txtLineSpacingButton}</div>
    <SVGSeparator/>
    <div id="3" className="fl-ac ml-5">{removeButton}</div>

    <HeaderM styleClass="ml-20">Convert</HeaderM>
    <SVGSeparator/>
    <div id="2" className="fl-ac ml-5">{listButtons}</div>
</React.Fragment>
*/

/*
let imageMenu = <React.Fragment>
    <HeaderM>Text</HeaderM>
    <SVGSeparator/>
    <DropDown key={Date.now()*Math.random()} items={imageStyles} editor={this} apiName="ddImg" activeLabel={this.api.ddImgAL}/>
    <SVGSeparator/>
    <div id="2" className="fl-ac ml-5">{imgAlignButtons}</div>
    <SVGSeparator/>
    <div id="3" className="fl-ac ml-5">{removeButton}</div>
</React.Fragment>


let homeMenu = <React.Fragment>
    <HeaderM>Add</HeaderM>
    <SVGSeparator/>
    <div id="2" class="fl-ac ml-5">{addButtons}</div>
</React.Fragment>
*/

const Editor = () => {
    const [activeElement, setActiveElement] = useState({id: null, style: 0, node: null});
    const [isTxt, setIsTxt] = useState(false);
    const [isImage, setIsImage] = useState(false);
    const [content, setContent] = useState([]);
    const contentRef = useRef(content);
    const activeNode = useRef();

    const handleTxtClick = (id) => {
        let con = contentRef.current;
        setIsTxt(true);
        console.log("### C L I C K ###")
        console.log("CONTENT: ", con)
        console.log("ACTIVE: ", activeElement)
        console.log("STYLE: " + con[id-1].props.style)
        let s;
        switch(parseInt(con[id-1].props.style)){
            case 0:
                s = "Paragraph";
                break;
            case 1:
                s = "Title";
                break;
            case 2:
                s = "Headline";
                break;
            default:
                break;
        }
        setActiveElement({ id: parseInt(id), style: s, node: activeNode.current});
    }
    const handleKey = (e) => {

    }

    let init = [
        <Txt ref={activeNode} key="1" id="1" style="1" type="0" text="Title" handleClick={handleTxtClick} onKeyDown={handleKey}/>,
        <Txt key="2" id="2" style="0" type="0" text="Type something" handleClick={handleTxtClick} onKeyDown={handleKey}/>
    ]

    const handleClickTxtStyle = (t) => {
        console.log("### [DD] C L I C K ###")
        console.log(t);
        switch(t){
            case 0:
                console.log("Element to be changed: ", content[activeElement.id-1])
                setContent(content.map(c=>{ 
                    if(parseInt(c.props.id) === activeElement.id) return <Txt ref={activeNode} key={content.length+1} id={activeElement.id} style="0" type="1" text="Type something..." handleClick={handleTxtClick} onKeyDown={handleKey}/>
                    else return c
                }));
                setActiveElement({id: activeElement.id, style: "Paragraph", node: activeNode.current});
                break;
            case 1:
                setContent(content.map(c=>{ 
                    if(parseInt(c.props.id) === activeElement.id) return <Txt key={content.length+1} id={activeElement.id} style="1" type="1" text="Title" handleClick={handleTxtClick} onKeyDown={handleKey}/>
                    else return c
                }))
                setActiveElement({id: activeElement.id, style: "Title", node: activeNode.current});
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    const handleBoardClick = (e) => {
        if(e.target.id === "board"){ 
            openHM();
            //if(activeElement) if(activeElement.clicked !== undefined) this.state.activeElement.setState({clicked: false})
        }
    }

    useEffect(()=>{
        console.log("### R E N D E R ###");
        contentRef.current = content;
        if(activeElement.node) activeElement.node.focus();
        console.log("CONTENT: ", content)
        console.log("ACTIVE: ", activeElement)
        console.log("ISTXT: ", isTxt)
    });

    useEffect(()=>{
        setContent(init);
    }, [])

    const openHM = () => {
        setIsTxt(false);
        setIsImage(false);
    }

    const textStyles=[
        {
            label: "Paragraph",
            onClick: handleClickTxtStyle,
            style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
        },
        {
            label: "Title",
            onClick: handleClickTxtStyle,
            style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
        },
        {
            label: "Headline",
            onClick: handleClickTxtStyle,
            style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
        },
        {
            label: "Quote",
            onClick: handleClickTxtStyle,
            style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
        },
    ]

    return(
        <React.Fragment>
            {isTxt && <Navbar>
                <HeaderM>Text</HeaderM>
                <DropDown key={Date.now()*Math.random()} items={textStyles} al={activeElement.style}/>
            </Navbar>}
            {!isTxt && <Navbar>
                <HeaderM>Add</HeaderM>
                <div id="2" class="fl-ac ml-5"></div>
            </Navbar>} 
            
            <View handleClick={handleBoardClick}>
                {content}
            </View>
        </React.Fragment>    
    );
}

export default Editor;