import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Paper, Grid, Stack } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Outlet } from "react-router-dom";
// import logo from "../../assets/images/logo-white.png";
import logo from "../assets/images/logo-white.png";
// import "./App.css";

const drawerWidth = 240;
const navItems = ["Logout"];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function App(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Paper
        variant="outlined"
        sx={{
          flexGrow: 1,
          borderWidth: "0px",
          backgroundColor: "#262626",
          paddingTop: "10px",
          borderRadius: "0",
        }}
      >
        <img src={logo} alt="" width={150} />
      </Paper>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [wishlist, setWishlist] = React.useState([1, 2]);
  const deleteItem = (index) => {
    handleClick();
    if (wishlist.length == 1) {
      setWishlist([]);
    } else {
      setWishlist((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems.splice(index, 1);
        return updatedItems;
      });
    }
    //alert(wishlist);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Box sx={{ backgroundColor: "#262626" }}>
      <CssBaseline />
      <AppBar component="nav" style={{ backgroundColor: "#262626" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Paper
            variant="outlined"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", backgroundColor: "#262626" },
              borderWidth: "0px",
              paddingTop: "10px",
            }}
          >
            <img src={logo} alt="" width={150} />
          </Paper>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ p: 1, color: "#fff", width: "100%", height: "100vH" }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default App;
