import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from "@material-ui/core";

const DialogPopUp = props => {
  return (
    <Dialog
      open={props.openDialog}
      onClose={props.closeDialog}
      style={{ margin: 20 }}
    >
      <DialogTitle style={{ textAlign: "center" }}>Who's On?</DialogTitle>
      <List>
        {props.clients.map(client => (
          <ListItem key={client}>
            <ListItemAvatar>
              <PersonIcon />
            </ListItemAvatar>
            <ListItemText>
              {client} is in room {props.room}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};
export default DialogPopUp;
