import React from "react";
import { SVGSeparator } from "./SVGs";

function Dummy(){
    return (
        <div className="dummy-container"></div>
    );
}

const HeaderM = ({ styleClass, handleClick, children}) => {
    /* TODO
    handleClick = () => {
        this.node = ReactDOM.findDOMNode(this);
        this.node.className = "-0";
    }
    */
    return (
        <div className={"mHl mr-5 fl-ac " + styleClass} onClick={handleClick}>{children}</div>
    )
}

const Navbar = ({ children }) => {
    return ( 
        <React.Fragment>
            <div className="menu-container">
                <div className="menu-elem-container">
                    <div className="fl-r">
                        {children.map(c => (
                            <React.Fragment>
                                {c}
                                <SVGSeparator/>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <Dummy/>
        </React.Fragment>
     );
}
 
export { Navbar, HeaderM };