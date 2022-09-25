import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "../styles/SearchBar.css";
import Close from "@mui/icons-material/Close";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";

const NotificationMenu = ({
  anchorEl,
  handleCloseMenu,
  data,
  acceptRequest,
  rejectRequest,
  text,
}) => {
  return (
    <Menu
      sx={{ mt: "5px" }}
      id="notification"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      {data &&
        data.map((username) => (
          <MenuItem key={username}>
            <Typography variant="caption" display="block">
              {username}
              <br></br>
              {text}
            </Typography>
            <Box sx={{ ml: "4px" }}>
              <IconButton
                onClick={() => {
                  acceptRequest(username);
                }}
              >
                <CheckSharpIcon></CheckSharpIcon>
              </IconButton>
              <IconButton
                onClick={() => {
                  rejectRequest(username);
                }}
              >
                <Close></Close>
              </IconButton>
            </Box>
          </MenuItem>
        ))}
    </Menu>
  );
};

export default NotificationMenu;
