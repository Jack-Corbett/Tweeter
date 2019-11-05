import React, { useState } from 'react';
import Routes from './Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Dashboard';
import ChatIcon from '@material-ui/icons/Chat';
import LockIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/AccountBox';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Style from './components/Style'

const useStyles = makeStyles(Style);

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(0);

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
      setOpen(true);
  };
  const handleDrawerClose = () => {
      setOpen(false);
  };

  function handleLogout() {
    userHasAuthenticated(false);
    setAuthenticatedUser(0);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
            <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Tweeter
        </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
          variant="permanent"
          classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
      >
          <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
          </IconButton>
          </div>
          <Divider />
          {isAuthenticated ? (
            <>
              <List>
                  <ListItem button component={Link} to="/timeline">
                      <ListItemIcon>
                      <TimelineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Timeline" />
                  </ListItem>
                  <ListItem button component={Link} to="/post">
                      <ListItemIcon>
                      <ChatIcon />
                      </ListItemIcon>
                      <ListItemText primary="Post" />
                  </ListItem>
                  <ListItem button component={Link} to="/following">
                      <ListItemIcon>
                      <PersonAddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Following" />
                  </ListItem>
                  <ListItem button component={Link} to="/followers">
                      <ListItemIcon>
                      <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Followers" />
                  </ListItem>
              </List>
              <Divider />
              <List>
                  <ListItem button onClick={handleLogout} component={Link} to="/">
                      <ListItemIcon>
                      <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                  </ListItem>
              </List>
            </>
          ) : (
            <>
              <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                    <LockIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/register">
                    <ListItemIcon>
                    <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                </ListItem>
              </List>
            </>  
          )}
      </Drawer>

      <main className={classes.content}>
      <div className={classes.appBarSpacer} />
        <Routes appProps={{ isAuthenticated, userHasAuthenticated, authenticatedUser, setAuthenticatedUser }} />
      </main>
    </div>
  );
}

export default App;
