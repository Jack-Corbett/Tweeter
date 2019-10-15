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
import ChatIcon from '@material-ui/icons/Chat';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Style from './components/Style'

const useStyles = makeStyles(Style);

function App() {
  // Could also check here if the user is already logged in
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                      <ChatIcon />
                      </ListItemIcon>
                      <ListItemText primary="Timeline" />
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
                  <ListItem button component={Link} to="/profile">
                      <ListItemIcon>
                      <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                  </ListItem>
              </List>
            </>
          ) : (
            <>
              <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                    <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Welcome" />
                </ListItem>
              </List>
            </>  
          )}
      </Drawer>

      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

export default App;
