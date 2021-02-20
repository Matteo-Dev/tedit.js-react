import {SVGArrowDown} from "./SVGs";
import {Button} from "./Button";
import { useEffect, useState } from "react";

const DropDown = ({ items, defaultLabel, al }) => {
    const [activeLabel, setActiveLabel] = useState(al);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e) => {
        setIsOpen(!isOpen);
    }

    useEffect(()=>{
        //console.log(activeLabel)
    });

    return ( 
        <div className="dd-container ml-5" onClick={handleClick}>
            <Button style={(isOpen) ? "itemID-pressed" : "itemID"} onClick={handleClick}>{activeLabel} <SVGArrowDown/></Button>
            <div className={(isOpen) ? "dd-container-i" : "dd-container-i unvisible"}>
                {
                    items.map(o => <DropDownItem key={o.label} className={(o.label === activeLabel) ? o.style.clicked : o.style.default} handleClick={(e)=>o.onClick(items.indexOf(o))}>{o.label}</DropDownItem>)
                }
            </div>
        </div>
     );
}

const DropDownItem = ({ className, handleClick, children}) => {
    return (
        <div className={className} onClick={handleClick}>{children}</div>
    );
}

export {DropDown, DropDownItem}