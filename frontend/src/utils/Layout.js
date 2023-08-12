// Author: Aayush Yogesh Pandya (B00939670)

import React, { useEffect } from "react";
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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-white.png";
import axios from "axios";
import UnauthorizedModal from "./UnauthoizedModal";

const drawerWidth = 240;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function App(props) {
  const { window } = props;
  const id = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [unauthorizedModal, setUnauthorizedModal] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const decodeJwt = (token) => {
    alert(token);
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
  const location = useLocation();
  let navItems = [
    { text: "Search", link: "/productlisting" },
    { text: "Store", link: "/stores" },
  ];

  if (id) {
    navItems = [
      ...navItems,
      { text: "Profile", link: "/profile" },
      { text: "Wishlist", link: "/wishlist" },
      { text: "Cart", link: "/cart" },
      { text: "Orders", link: "/orders" },
      { text: "Logout", link: "/login" },
    ];
  } else {
    navItems = [...navItems, { text: "Login", link: "/login" }];
  }
  if (location.pathname.includes("admin")) {
    navItems = [{ text: "Logout", link: "/login" }];
  }
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
        onClick={() => {
          navigate("/homepage");
        }}
      >
        <img src={logo} alt="" width={150} />
      </Paper>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                if (item.text === "Logout" || item.text === "Login") {
                  sessionStorage.clear();
                  navigate("/login");
                } else {
                  navigate(item.link);
                }
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          setUnauthorizedModal(true);
        }
        return error;
      }
    );
  }, []);
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
            onClick={() => {
              navigate("/homepage");
            }}
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", backgroundColor: "#262626" },
              borderWidth: "0px",
              paddingTop: "10px",
              cursor: "pointer",
            }}
          >
            <img src={logo} alt="" width={150} />
          </Paper>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => {
                  if (item.text === "Logout" || item.text === "Login") {
                    sessionStorage.clear();
                    navigate("/login");
                  } else {
                    navigate(item.link);
                  }
                }}
              >
                {item.text}
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
        sx={{
          p: 1,
          color: "#fff",
          width: "100%",
          minHeight: "100vH",
          backgroundColor: "#0f0f0f",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      {unauthorizedModal && <UnauthorizedModal />}
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
