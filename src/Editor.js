import React from "react";
import "./index.css";

import {SVGSeparator} from "./SVGs";
import {DropDown} from "./DropDown";
import Txt from "./Txt";
import {Button, FileInputButton} from "./Button";
import {NavBar, HeaderM, Dummy} from "./NavBar";
import View from "./View";
import Image from "./Image";

export default class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selection: null,
            activeElement: null,
        };

        let textStyles=[
            {
                label: "Paragraph",
                onClick: this.handleClickParagraph.bind(this),
                style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
            },
            {
                label: "Title",
                onClick: this.handleClickTitle.bind(this),
                style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
            },
            {
                label: "Headline",
                onClick: this.handleClickHeadline.bind(this),
                style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
            },
            {
                label: "Quote",
                onClick: this.handleClickQuote.bind(this),
                style: {default: "dd-item", clicked: "dd-item dd-item-selected"}
            },
        ]

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
        
        this.api = {
            ddTxt: null,
            ddImg: null,
            ddTxtAL: null,
            ddImgAL: null,
            navBar: null,
            view: null,
        }

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

        this.txtMenu = <>
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
        </>

        this.imageMenu = <>
            <HeaderM>Text</HeaderM>
            <SVGSeparator/>
            <DropDown key={Date.now()*Math.random()} items={imageStyles} editor={this} apiName="ddImg" activeLabel={this.api.ddImgAL}/>
            <SVGSeparator/>
            <div id="2" className="fl-ac ml-5">{imgAlignButtons}</div>
            <SVGSeparator/>
            <div id="3" className="fl-ac ml-5">{removeButton}</div>
        </>

        this.homeMenu = <>
            <HeaderM>Add</HeaderM>
            <SVGSeparator/>
            <div id="2" class="fl-ac ml-5">{addButtons}</div>
        </>
    }

    handleTxtClick = (e, ae) => {
        //if(this.state.activeElement) this.state.activeElement.setState({clicked: false})
        if(this.state.activeElement) if(this.state.activeElement.state.clicked !== undefined) this.state.activeElement.setState({clicked: false})
        this.setState({activeElement: ae});
        let aes, s;
        aes = ae.state.style;
        if(aes === 0) s = "Paragraph";
        else if(aes === 1) s = "Title";
        else if(aes === 2) s = "Headline";
        else s = "Quote";
        this.api.ddTxtAL = s;
        this.api.navBar.setState({cume: this.txtMenu, al: [s]});
        if(this.api.ddTxt) {
            this.api.ddTxt.setState({activeLabel: s});
        }

        
    }

    handleImageClick = (e, ae) => {
        if(this.state.activeElement) if(this.state.activeElement.state.clicked !== undefined) this.state.activeElement.setState({clicked: false})
        this.setState({activeElement: ae});
        ae.setState({clicked: true});
        let aes, s;
        aes = ae.state.style;
        if(aes === 0) s = "Normal";
        else if(aes === 1) s = "Wide";
        this.api.ddImgAL = s;
        this.api.navBar.setState({cume: this.imageMenu});
        if(this.api.ddImg) {
            this.api.ddImg.setState({activeLabel: s});
        }
    }

    handleBold = event => {
        document.designMode = "on";
        document.execCommand("bold");
        console.log(window.getSelection());
    }
    handleItalic = event => {
        document.designMode = "on";
        document.execCommand("italic");
    }
    handleUnderline = event => {
        document.designMode = "on";
        document.execCommand("underline");
    }

    handleUL = e => {
        (this.state.activeElement.state.type !== 1) ? this.state.activeElement.setState({type: 1}) : this.state.activeElement.setState({type: 0});
        this.state.activeElement.node.focus();
    }
    handleOL = e =>{
        (this.state.activeElement.state.type !== 2) ? this.state.activeElement.setState({type: 2}) : this.state.activeElement.setState({type: 0});
        this.state.activeElement.node.focus();
    }

    handleTALeft = e => {
        this.state.activeElement.setState({txtAlign: 0});
    }
    handleTACenter = e => {
        this.state.activeElement.setState({txtAlign: 1});
    }
    handleTARight = e => {
        this.state.activeElement.setState({txtAlign: 2});
    }
    handleTAJustify = e => {
        this.state.activeElement.setState({txtAlign: 3});
    }

    handleClickParagraph (e, de) {
        de.setState({
            activeLabel: e.target.innerText,
        });
        if (this.state.activeElement) this.state.activeElement.setState({style: 0});
    }
    handleClickTitle (e, de) {
        de.setState({
            activeLabel: e.target.innerText,
        });
        if (this.state.activeElement) this.state.activeElement.setState({style: 1});
    }
    handleClickHeadline (e, de) {
        de.setState({
            activeLabel: e.target.innerText,
        });
        if (this.state.activeElement) this.state.activeElement.setState({style: 2});
    }
    handleClickQuote (e, de) {
        de.setState({
            activeLabel: e.target.innerText,
        });
        if (this.state.activeElement) this.state.activeElement.setState({style: 3});
    }

    handleClickINormal (e, de) {
        de.setState({
            activeLabel: e.target.innerText,
        });
        if (this.state.activeElement) this.state.activeElement.setState({style: 0});
    }
    handleClickIWide (e, de) {
        de.setState({
            activeLabel: e.target.innerText,
        });
        if (this.state.activeElement) this.state.activeElement.setState({style: 1});
    }

    handleClickBoard (e) {
        if(e.target.id === "board"){ 
            this.openHM();
            if(this.state.activeElement) if(this.state.activeElement.state.clicked !== undefined) this.state.activeElement.setState({clicked: false})
        }
    }

    handleInput (e) {
        let file = e.target.files[0];
        let oURL = URL.createObjectURL(file);
        this.addImage(oURL);
    }

    handleKey = (e) => {
        if(e.key === "Backspace"){
            //console.log(e.target.children[0].innerHTML, e.target.children[0].tagName)
            if(e.target.children[0].innerHTML === "<br>" || e.target.children[0].innerHTML === ""){
                e.preventDefault();
                e.target.children[0].innerHTML = "";
            } else if (e.target.children[0].tagName === "UL" && (e.target.children[0].children[0].innerHTML === "" || e.target.children[0].children[0].innerHTML === "<br>")){
                e.preventDefault();
                e.target.children[0].children[0].innerHTML = "";
            }
        } else if(e.key === "Enter" && this.state.activeElement.state.type !== 1){
            e.preventDefault();
            this.addTxt();
        }
    }

    openHM(){
        this.api.navBar.setState({cume: this.homeMenu})
    }

    addTxt(){
        this.api.view.setState({content: this.api.view.state.content.concat(<Txt key={this.api.view.state.content.length+1} id={this.api.view.state.content.length+1} style="0" type="0" text="Type something" onClick={this.handleTxtClick} onKeyDown={this.handleKey.bind(this)}/>)})
    }

    addImage(dataURL){
        this.api.view.setState({
            content: this.api.view.state.content.concat(
                <Image key={this.api.view.state.content.length+1} id={this.api.view.state.content.length+1} style="0" editor={this} onClick={this.handleImageClick} dataURL={dataURL}/>
            )});
    }

    handleDelete(e){
        console.log(this.state.activeElement.props.id, this.api.view.state.content.filter(t=>t!==this.state.activeElement.props.id))
        this.api.view.setState({content: this.api.view.state.content.filter(t=>t.props.id!==this.state.activeElement.props.id)});
        this.openHM();
    }

    render(){
        return (
            <>
                <NavBar sm={this.homeMenu} editor={this}/>
                <Dummy/>
                <View onClick={this.handleClickBoard.bind(this)} editor={this}>
                    <Txt key="1" id="1" style="1" type="0" text="Title" onClick={this.handleTxtClick} onKeyDown={this.handleKey.bind(this)}/>
                    <Txt key="2" id="3" style="0" type="0" text="Type something" onClick={this.handleTxtClick} onKeyDown={this.handleKey.bind(this)}/>
                </View>
            </>
        );
    }
}