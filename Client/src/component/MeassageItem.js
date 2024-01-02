import React from "react";

const MeassageItem = (props) => {
  return (
    <div className="meassageitem owner">
      <div className="meassageInfo">
        <img src={props.userImages} alt="" />
        <span>{props.timeDifference}</span>
      </div>

      <div
        className="meassagecontent"
      >
        <p style={{ backgroundColor: `${props.color ? "" : "white"}`, color:`${props.color ? "":"#5d5d8d" }`}}> 
        {props.message}</p>
        {/* <img src='Images/pintu.jpeg' alt=''/> */}
      </div>
    </div>
  );
};

export default MeassageItem;
