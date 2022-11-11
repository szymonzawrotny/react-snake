import React from 'react';

const Food = (props) => {
    const style = {
        position: "relative",
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`,
        width: "2%",
        height: "2%",
        border: "2px solid white",
        backgroundColor: "red"
    };

    return ( 
        <div className="snake-food" style={style}></div>
     );
}
 
export default Food;