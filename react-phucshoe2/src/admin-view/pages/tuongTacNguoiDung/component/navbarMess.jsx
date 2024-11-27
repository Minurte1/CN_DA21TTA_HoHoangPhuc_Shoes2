import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const SidebarMess = ({ selectedUser, setSelectedUser, users }) => {
  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        bgcolor: "#f5f5f5",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{ textAlign: "center", py: 2, bgcolor: "#1976d2", color: "#fff" }}
      >
        Admin Panel
      </Typography>
      <List>
        {users.map((user) => (
          <ListItemButton
            key={user.ID_NGUOI_DUNG}
            selected={selectedUser?.ID_NGUOI_DUNG === user.ID_NGUOI_DUNG}
            onClick={() => setSelectedUser(user)}
          >
            <ListItemText primary={user.HO_TEN} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SidebarMess;
