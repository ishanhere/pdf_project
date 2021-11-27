import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
// import { ListItemButton } from '@material-ui/core';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = React.useState(false);
  const [openPdfDrawer, setPdfOpen] = React.useState(true);

  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const changeRoute = (event, href) => {
    if (event.metaKey || event.ctrlKey) return;
    if(!isMdUp) {
        setOpen(!open);
    }
    event.preventDefault();
    window.history.pushState({}, "", href);
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  const handleClick = () => {
      console.log("called")
    setPdfOpen(!openPdfDrawer);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap onClick={(e) => changeRoute(e, '/')}>
            Love U PDF
          </Typography>
        </Toolbar>
      </AppBar>
        <Drawer
            className={classes.drawer}
            variant={isMdUp ? "permanent" : "temporary"}
            classes={{
            paper: classes.drawerPaper
            }}
            anchor="left"
            open={open}
            onClose={toggleDrawer}
        >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button onClick={handleClick}>
                    {/* <ListItemIcon>
                    <InboxIcon />
                    </ListItemIcon> */}
                    <ListItemText primary="Image" />
                    {openPdfDrawer ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openPdfDrawer} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    <ListItem button onClick={(e) => changeRoute(e, '/mergepdfs')}>
                        {/* <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="Merge PDFs" />
                    </ListItem>
                    <ListItem button onClick={(e) => changeRoute(e, '/imgstopdf')}>
                        {/* <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="Images to PDF" />
                    </ListItem>
                    <ListItem button onClick={(e) => changeRoute(e, '/doctopdf')}>
                        {/* <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="Convert Doc To PDF" />
                    </ListItem>
                    <ListItem button onClick={(e) => changeRoute(e, '/ppttopdf')}>
                        {/* <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="Convert PPT To PDF" />
                    </ListItem>
                    <ListItem button onClick={(e) => changeRoute(e, '/contactus')}>
                        {/* <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="Contact US" />
                    </ListItem>
                    <ListItem button onClick={(e) => changeRoute(e, '/aboutus')}>
                        {/* <ListItemIcon>
                        <InboxIcon />
                        </ListItemIcon> */}
                        <ListItemText primary="About US" />
                    </ListItem>
                    </List>
                </Collapse>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={(e) => changeRoute(e, '/imgcompress')}>
                    {/* <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon> */}
                    <ListItemText primary="Compress Image" />
                </ListItem>
            </List>
        </Drawer>
    </div>
  );
}
