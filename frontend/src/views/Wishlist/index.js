// Author: Aayush Yogesh Pandya (B00939670)

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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SimilarProducts from "../SimilarProducts/index";
import Loader from "../../utils/Loader";
import { Alerts } from "../../utils/Alert";
import "../../App.css";
import Footer from "../HomePage/Footer";

const drawerWidth = 240;
const navItems = ["Logout"];
function WishlistPage() {
  const navigate = useNavigate();

  let runOnce = true;
  const [userId, setUserId] = useState(null);
  const [similarIds, setsimilarIds] = useState(null);
  const [similarTags, setsimilarTags] = useState(["Casual"]);
  const [wishlist, setWishlist] = useState(null);

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
  };

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
      .post(
        `/wishlist/removeWishlistItem`,
        {
          userId: userId,
          itemId: itemId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        if (resp.status === 200) {
          getWishlist(userId);
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
      .post(
        `/wishlist/getWishlist`,

        {
          _id: usertId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        if (resp.status === 200) {
          setWishlist(resp.data);

          if (resp.data?.length == 0) {
            setsimilarIds("null");
          } else {
            let tags = resp.data.map((item) => item.tags).flat();
            setsimilarTags(tags);
            let ids = resp.data.map((item) => item._id);
            setsimilarIds(ids);
          }
          setSpinner(false);
        }
        setSpinner(false);
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
  const id = window.sessionStorage.getItem("userId");
  const token = window.sessionStorage.getItem("token");
  useEffect(() => {
    if (id) {
      setUserId(id);
      if (runOnce) {
        getWishlist(id);
      }
    } else {
      navigate("/login");
    }
  }, [id]);

  return (
    <>
      <Box sx={{ backgroundColor: "#0F0F0F" }}>
        <Box
          component="main"
          sx={{
            paddingLeft: "5%",
            paddingRight: "5%",
            color: "#fff",
            width: "100%",
          }}
        >
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
                      <Grid item xs={8} sm={6} md={4} key={index}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div class="image-container">
                              <img
                                className="image"
                                src={
                                  "data:image/png;base64," + item.images.data
                                }
                                alt={item.images.name}
                                style={{
                                  borderRadius: "15px",
                                }}
                              />
                            </div>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={6}
                            style={{ paddingLeft: "3%" }}
                          >
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography
                              sx={{ color: "gray", fontSize: "15px" }}
                            >
                              {item.tags[0]}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "18px", marginBottom: "2%" }}
                            >
                              ${item.price}
                            </Typography>
                            <Grid container>
                              <Grid
                                item
                                sx={{ marginBottom: "2%", marginRight: "2%" }}
                              >
                                <Button
                                  variant="outlined"
                                  sx={{
                                    borderColor: "#38B5FF",
                                    color: "#38B5FF",
                                  }}
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
                                  sx={{
                                    borderColor: "#38B5FF",
                                    color: "#38B5FF",
                                  }}
                                  onClick={() => {
                                    removeWishlistItem(userId, item._id);
                                  }}
                                >
                                  Remove
                                </Button>
                              </Grid>
                            </Grid>
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
          <div style={{ marginTop: "30px" }}>
            {similarIds && (
              <>
                <SimilarProducts tags={similarTags} _id={similarIds} />
              </>
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
      </Box>
    </>
  );
}

export default WishlistPage;
