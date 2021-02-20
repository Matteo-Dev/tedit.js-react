import React from "react";

const Button = ({ style, handleClick, children}) => {
    return (
        <span className={style} onClick={handleClick}>{children}</span>
    );
}

const FileInputButton = ({ children , handleInput }) => {
    let id = Date.now();

    return (
        <React.Fragment>
            <label for={id} className="fl-ac">
                <span className="i-btn material-icons-outlined">{children}</span>
            </label>
            <input id={id} type="file" onChange={handleInput}/>
        </React.Fragment>
    );
}

export {Button, FileInputButton}