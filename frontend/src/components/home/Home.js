import React, { useState } from "react";
import Axios from "axios";
import clsx from "clsx";
import { Link, Switch, useHistory, useRouteMatch } from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import InputIcon from "@material-ui/icons/Input";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import HomeRoute from "../routes/HomeRoute";
import BasicButton from "../common/BasicButton";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory()

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    Axios.post("/api/auth/logout")
    .then(() => history.push('/'))
    .catch((err) => {
      console.log('Logout failed', err)
    })
  };

  const [pageTitle, setPageTitle] = useState("Home");
  const [openLogout, setOpenLogout] = useState(false);

  const { path, url } = useRouteMatch();

  return (
    <div className={classes.root}>
      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Apakah anda yakin untuk logout?
        </DialogTitle>
        <DialogActions>
          <BasicButton onClick={() => setOpenLogout(false)} color="default">
            Batal
          </BasicButton>
          <BasicButton onClick={handleLogout} color="secondary" autoFocus>
            Logout
          </BasicButton>
        </DialogActions>
      </Dialog>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Home" component={Link} to={url}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            key="input-barang"
            component={Link}
            to={`${url}/input-barang`}
          >
            <ListItemIcon>
              <InputIcon />
            </ListItemIcon>
            <ListItemText primary="Input Barang" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => setOpenLogout(true)}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <HomeRoute
            exact
            path={path}
            setPageTitle={setPageTitle}
            title="Home"
            component={() => <h3>test home</h3>}
          />
          <HomeRoute
            path={`${path}/input-barang`}
            setPageTitle={setPageTitle}
            title="Input Barang"
            component={() => <h3>test input barang</h3>}
          />
        </Switch>
      </main>
    </div>
  );
};

export default Home;
