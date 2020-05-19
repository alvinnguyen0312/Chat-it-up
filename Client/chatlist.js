import React from "react";
import ChatMsg from "./chatmsg";
import { TextField, List, Typography } from "@material-ui/core";

const ChatList = props => {
  const handleSendMessage = e => {
    props.sendMessage(e);
  };
  return (
    <div className="chat-container">
      <div className="chatList">
        <List>
          {props.messages.map((message, index) => (
            <ChatMsg msg={message} key={index} />
          ))}
        </List>
      </div>
      <div className="chatInput">
        {!props.showjoinfields && (
          <TextField
            onChange={props.onMessageChange}
            placeholder="type something here"
            autoFocus={true}
            value={props.message}
            onKeyPress={e => (e.key === "Enter" ? handleSendMessage() : null)}
          />
        )}
      </div>
      <Typography variant="caption" color="primary">
        {props.typingMsg}
      </Typography>{" "}
    </div>
  );
};
export default ChatList;
