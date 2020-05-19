import React from "react";
import GroupIcon from "@material-ui/icons/Group";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

const TopBar = props => {
  const onIconClicked = () => props.viewDialog();
  return (
    <AppBar position="fixed" style={{ flex: 1, flexDirection: "row" }}>
      <Toolbar color="primary" title="Sample Toolbar">
        <Typography
          variant="h6"
          color="inherit"
          style={{ marginTop: 20, paddingLeft: 10 }}
        >
          Chat it Up - Kiet Nguyen
        </Typography>
        {props.showIcon && (
          <section style={{ height: 90, width: 90, marginLeft: "auto" }}>
            <IconButton onClick={onIconClicked}>
              <GroupIcon
                color="secondary"
                style={{
                  fontSize: 70,
                  paddingLeft: 60
                }}
              />
            </IconButton>
          </section>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default TopBar;
