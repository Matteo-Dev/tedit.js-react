import React from "react";
import "./index.css";

class SVGArrowDown extends React.Component{
    render(){
        return (
            <span class="material-icons">expand_more</span>
        );
    }
}

class SVGSeparator extends React.Component{
    render(){
        return(<svg width="2" height="43" viewBox="0 0 2 35" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="4.37114e-08" x2="0.999998" y2="35" stroke="#D9D9D9" stroke-opacity="0.5" stroke-width="2"></line></svg>);
    }
}

export {SVGArrowDown, SVGSeparator}