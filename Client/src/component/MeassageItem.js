import React from "react";

const MeassageItem = (props) => {
  const isUser = props.color;

  return (
    <div className={`meassageitem ${isUser ? "owner" : "receiver"}`}>
      <div className="meassageInfo">
        <img src={props.userImages} alt="User" />
        <span>{props.timeDifference}</span>
      </div>

      <div className="meassagecontent">
        <p
          style={{
            backgroundColor: isUser ? "#5d5d8d" : "white",
            color: isUser ? "white" : "#5d5d8d",
          }}
        >
          {props.message}
        </p>
      </div>
    </div>
  );
};

export default MeassageItem;
