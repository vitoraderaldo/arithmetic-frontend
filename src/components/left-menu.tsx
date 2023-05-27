import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import { NavLink, useMatch } from "react-router-dom";
import CalculateIcon from "@mui/icons-material/Calculate";

export const LeftMenu = () => {
  const isHome = !!useMatch('/');
  const isRecords = !!useMatch('/records');
  return (
    <Drawer variant="permanent" anchor="left" PaperProps={{
      sx: {
        position: 'static',
        height: '100vh',
        width: '100%'
      }
    }}>
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
    </Drawer>
  );
};
