import React, { Fragment } from "react";
import MessageIcon from "@material-ui/icons/Message";
import {
  Card,
  CardHeader,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Button
} from "@material-ui/core";

const SignInCard = props => {
  const handleSelectRoom = room => {
    props.selectRoom(room);
  };
  return (
    <Card>
      <MessageIcon
        color="primary"
        style={{
          fontSize: 60,
          marginLeft: "45%",
          marginTop: 80
        }}
      />
      <CardHeader
        title="Sign In"
        color="inherit"
        style={{ textAlign: "center", paddingTop: "2vh" }}
      />
      <Fragment>
        <TextField
          onChange={props.onNameChange}
          placeholder="Chat Name"
          autoFocus={true}
          required
          value={props.chatName}
          error={props.status !== ""}
          helperText={props.status}
        />
        <p></p>
        <Typography variant="h6" color="inherit">
          Join Existing or Enter Room Name
        </Typography>
        <p></p>
        <RadioGroup value={props.roomName}>
          {props.rooms.map(room => (
            <FormControlLabel
              control={
                <Radio
                  color="primary"
                  onChange={() => handleSelectRoom(room)}
                />
              }
              label={room}
              value={room}
              key={room}
            />
          ))}
        </RadioGroup>
        <p></p>
        <TextField
          onChange={props.onRoomChange}
          placeholder="Room Name"
          autoFocus={true}
          required
          value={props.roomName}
          error={props.statusRoom !== ""}
          helperText={props.statusRoom}
        />
        <p></p>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "3%" }}
          onClick={props.handleJoin}
          disabled={props.chatName === "" || props.roomName === ""}
        >
          Join
        </Button>
      </Fragment>
    </Card>
  );
};
export default SignInCard;
