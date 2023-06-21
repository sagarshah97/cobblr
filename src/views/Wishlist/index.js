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
import { useNavigate } from "react-router-dom";
// import logo from "./assets/images/logo-white.png";
import "../../App.css";
import Footer from "../HomePage/Footer";

const drawerWidth = 240;
const navItems = ["Logout"];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function WishlistPage() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = React.useState([1]);
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
  //   const container =
  //     window !== undefined ? () => window().document.body : undefined;

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
    <Box sx={{ backgroundColor: "#0F0F0F" }}>
      <Box component="main" sx={{ p: 3, color: "#fff", width: "100%" }}>
        <Toolbar />
        <Typography variant="h5">Wishlist</Typography>
        <div style={{ marginTop: "30px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 3, md: 4 }}
              columns={{ xs: 4, sm: 8, md: 8 }}
              sx={{ p: 0 }}
            >
              {wishlist.length > 0 &&
                wishlist.map((index) => (
                  <>
                    <Grid item xs={4} sm={4} md={4} key={index}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <img
                            className="card-image"
                            alt=""
                            src="https://secure-images.nike.com/is/image/DotCom/CW2288_111?align=0,1&amp;cropN=0,0,0,0&amp;resMode=sharp&amp;fmt=jpg&amp;bgc=f5f5f5"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6">Nike Air Force 1</Typography>
                          <Typography sx={{ color: "gray", fontSize: "15px" }}>
                            Sneakers
                          </Typography>
                          <Typography
                            sx={{ fontSize: "18px", marginBottom: "2%" }}
                          >
                            $150
                          </Typography>
                          {/* <Stack spacing={2} direction="column"> */}
                          <Grid container>
                            <Grid
                              item
                              sx={{ marginBottom: "2%", marginRight: "2%" }}
                            >
                              <Button
                                variant="outlined"
                                sx={{ width: "6rem" }}
                                onClick={() => {
                                  navigate("/productdetail");
                                }}
                              >
                                View
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                variant="outlined"
                                sx={{ width: "6rem" }}
                                onClick={() => {
                                  deleteItem(index);
                                }}
                              >
                                Remove
                              </Button>
                            </Grid>
                          </Grid>
                          {/* </Stack> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ))}
              {wishlist.length == 0 && (
                <>
                  <Typography variant="h6" sx={{ p: 5 }}>
                    Products added to your Wishlist will be saved here.
                  </Typography>
                </>
              )}
            </Grid>
          </Box>
        </div>
      </Box>

      <Box component="main" sx={{ p: 3, color: "#fff", width: "100%" }}>
        <Toolbar />
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          You might also like
        </Typography>
        <div style={{ marginTop: "30px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              // spacing={{ xs: 3, md: 4 }}
              columns={{ xs: 3, sm: 9, md: 12, lg: 12 }}
              sx={{ p: 0, textAlign: "center" }}
            >
              <Grid item xs={3} sm={3} md={3} key={1}>
                <div
                  onClick={() => {
                    navigate("/productdetail");
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <img
                        //width={300}
                        className="card-image"
                        alt=""
                        src="https://secure-images.nike.com/is/image/DotCom/CW2288_111?align=0,1&amp;cropN=0,0,0,0&amp;resMode=sharp&amp;fmt=jpg&amp;bgc=f5f5f5"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h6">Nike Air Force 1</Typography>
                      <Typography sx={{ color: "gray", fontSize: "15px" }}>
                        Sneakers
                      </Typography>
                      <Typography sx={{ fontSize: "18px", marginBottom: "2%" }}>
                        $150
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} key={1}>
                <div
                  onClick={() => {
                    navigate("/productdetail");
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <img
                        className="card-image"
                        alt=""
                        src="https://secure-images.nike.com/is/image/DotCom/CW2288_111?align=0,1&amp;cropN=0,0,0,0&amp;resMode=sharp&amp;fmt=jpg&amp;bgc=f5f5f5"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h6">Nike Air Force 1</Typography>
                      <Typography sx={{ color: "gray", fontSize: "15px" }}>
                        Sneakers
                      </Typography>
                      <Typography sx={{ fontSize: "18px", marginBottom: "2%" }}>
                        $150
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} key={2}>
                <div
                  onClick={() => {
                    navigate("/productdetail");
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <img
                        className="card-image"
                        alt=""
                        src="https://secure-images.nike.com/is/image/DotCom/CW2288_111?align=0,1&amp;cropN=0,0,0,0&amp;resMode=sharp&amp;fmt=jpg&amp;bgc=f5f5f5"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h6">Nike Air Force 1</Typography>
                      <Typography sx={{ color: "gray", fontSize: "15px" }}>
                        Sneakers
                      </Typography>
                      <Typography sx={{ fontSize: "18px", marginBottom: "2%" }}>
                        $150
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} key={3}>
                <div
                  onClick={() => {
                    navigate("/productdetail");
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <img
                        className="card-image"
                        alt=""
                        src="https://secure-images.nike.com/is/image/DotCom/CW2288_111?align=0,1&amp;cropN=0,0,0,0&amp;resMode=sharp&amp;fmt=jpg&amp;bgc=f5f5f5"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h6">Nike Air Force 1</Typography>
                      <Typography sx={{ color: "gray", fontSize: "15px" }}>
                        Sneakers
                      </Typography>
                      <Typography sx={{ fontSize: "18px", marginBottom: "2%" }}>
                        $150
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
      <Footer />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product removed from wishlist!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default WishlistPage;
