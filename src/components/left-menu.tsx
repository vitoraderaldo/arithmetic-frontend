import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import { NavLink, useMatch } from "react-router-dom";

export const LeftMenu = () => {
  const isHome = !!useMatch('/');
  const isRecords = !!useMatch('/records');
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItemButton to="/" component={NavLink} selected={isHome} style={{width: 200}}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton to="/records" component={NavLink} selected={isRecords}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Records" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};
