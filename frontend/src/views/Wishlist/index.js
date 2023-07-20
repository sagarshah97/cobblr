import React, { useEffect, useState } from "react";
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
import axios from "axios";
import SimilarProducts from "../SimilarProducts/index";
import Spinner from "../../utils/Spinner";
import Loader from "../../utils/Loader";
import { Alerts } from "../../utils/Alert";
import "../../App.css";
import Footer from "../HomePage/Footer";

const drawerWidth = 240;
const navItems = ["Logout"];
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function WishlistPage() {
  const navigate = useNavigate();

  const userId = "64b813345ab966a0d7cd61a5";

  const [similarIds, setsimilarIds] = useState(null);
  const [similarTags, setsimilarTags] = useState(null);
  const [wishlist, setWishlist] = useState(null);

  // Spinner
  const [spinner, setSpinner] = useState(true);

  // Alert Start
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType,
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };
  // Alert End

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

  const removeWishlistItem = (userId, itemId) => {
    setSpinner(true);
    axios
      .post(`http://localhost:8000/wishlist/removeWishlistItem`, {
        userId: userId,
        itemId: itemId,
      })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          // alert(resp.data.message);
          setWishlist(resp.data);
          setSpinner(false);
          setAlertMessage("Product removed from wishlist!");
          setAlertType("success");
          snackbarOpen();
        }
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.message);
        console.log(error.response);
        setSpinner(false);
        setAlertMessage("Something went wrong, Please try again!");
        setAlertType("error");
        snackbarOpen();
      });
  };

  const getWishlist = (usertId) => {
    setSpinner(true);
    axios
      .post(`http://localhost:8000/wishlist/getWishlist`, {
        _id: usertId,
      })
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          setWishlist(resp.data);

          if (resp.data?.length == 0) {
            setsimilarIds("");
            setsimilarTags(["sneakers"]);
          } else {
            let tags = resp.data.map((item) => item.tags).flat();
            setsimilarTags(tags);
            let ids = resp.data.map((item) => item._id);
            setsimilarIds(ids);
          }
          setTimeout(() => {
            setSpinner(false);
            // alert(false);
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.message);
        console.log(error.response);
        setSpinner(false);
        setAlertMessage("Something went wrong, Please try again!");
        setAlertType("error");
        snackbarOpen();
      });
  };

  useEffect(() => {
    getWishlist(userId);
  }, []);

  return (
    <>
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
                {wishlist?.length > 0 &&
                  wishlist.map((item, index) => (
                    <>
                      <Grid item xs={4} sm={4} md={4} key={index}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <img
                              className="card-image"
                              src={"data:image/png;base64," + item.images.data}
                              alt={item.images.name}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography
                              sx={{ color: "gray", fontSize: "15px" }}
                            >
                              {item.tags[0]}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "18px", marginBottom: "2%" }}
                            >
                              {item.price}
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
                                    navigate(`/productdetail/${item._id}`);
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
                                    //deleteItem(index);
                                    removeWishlistItem(userId, item._id);
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
                {(wishlist?.length == 0 || !wishlist) && (
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
          {/* <Toolbar /> */}
          {/* <Typography variant="h5" sx={{ textAlign: "center" }}>
            You might also like
          </Typography> */}
          <div style={{ marginTop: "30px" }}>
            {/* <Box sx={{ flexGrow: 1 }}>
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
          </Box> */}
            {similarIds && (
              <SimilarProducts tags={similarTags} _id={similarIds[0]} />
            )}
          </div>
        </Box>
        {spinner && <Loader />}

        <Footer />
        {snackbar && (
          <Alerts
            alertObj={alertObj}
            snackbar={snackbar}
            snackbarClose={snackbarClose}
          />
        )}
        {/* <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product removed from wishlist!
          </Alert>
        </Snackbar> */}
      </Box>
    </>
  );
}

export default WishlistPage;
