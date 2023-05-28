import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import { NavLink, useMatch } from "react-router-dom";
import CalculateIcon from "@mui/icons-material/Calculate";
import LogoutIcon from "@mui/icons-material/Logout";
import { LogoutDialog } from "./logout-dialog";
import { Fragment, useState } from "react";

export const LeftMenu = () => {
  const isHome = !!useMatch('/');
  const isRecords = !!useMatch('/records');

  const [showLogout, setShowLogout] = useState(false);

  return (
    <Fragment>
      <Drawer variant="permanent" anchor="left" PaperProps={{
        sx: {
          position: 'static',
          height: '100vh',
          width: '100%'
        }
      }}>

        <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
          <List>
            <ListItemButton to="/" component={NavLink} selected={isHome}>
              <ListItemIcon>
                <CalculateIcon   />
              </ListItemIcon>
              <ListItemText primary="Calculator" />
            </ListItemButton>
            <ListItemButton to="/records" component={NavLink} selected={isRecords}>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary="Records" />
            </ListItemButton>
          </List>
          <List style={{borderTop: '1px solid #0000001F'}}>
            <ListItemButton onClick={() => setShowLogout(true)} >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
      <LogoutDialog 
        isOpened={showLogout}
        onCancel={() => setShowLogout(false)}
      />
    </Fragment>
  );
};
