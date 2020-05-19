import React, { useEffect, useRef } from "react";
import "../App.css";
import { ListItem } from "@material-ui/core";

const ChatMsg = props => {
  let msg = props.msg;
  const msgRef = useRef(null);
  useEffect(() => {
    msgRef.current.scrollIntoView(true);
  }, []);
  return (
    <ListItem ref={msgRef} style={{ textAlign: "left" }}>
      <div
        className="chatBubble"
        style={{ backgroundColor: msg.colour, left: `${msg.chatBubbleCSS}` }}
      >
        <p>
          {msg.time} - Room: {msg.room}
        </p>
        <p>{msg.from} says:</p>
        <p style={{ fontSize: 17, fontWeight: "bold", fontStyle: "normal" }}>
          {msg.text}
        </p>
      </div>
      <div
        className="triangle"
        style={{
          content: "" /* triangle */,
          position: "absolute",
          bottom:
            "-15px" /* value = - border-top-width - border-bottom-width */,
          left: `${msg.triangleCSS}` /* controls horizontal position */,
          borderWidth:
            "15px 15px 0" /* vary these values to change the angle of the vertex */,
          borderStyle: "solid",
          borderColor: `${msg.colour} transparent`
        }}
      />
    </ListItem>
  );
};
export default ChatMsg;
