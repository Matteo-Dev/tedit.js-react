import { useEffect } from "react";

const View = ({ handleClick, children }) => {
    useEffect(()=>{
        console.log("CHILDREN: ", children)
    }, []);

    return (
        <div id="board" contentEditable="false" onClick={handleClick}>
            {children}
        </div>
    );
}
 
export default View;