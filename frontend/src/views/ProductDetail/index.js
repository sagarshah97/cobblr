import { React, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import {
  Grid,
  Card,
  Select,
  MenuItem,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  IconButton,
  Badge,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import Footer from "../HomePage/Footer";
import SimilarProducts from "../SimilarProducts/index";
import Spinner from "../../utils/Spinner";
import "../../App.css";
import axios from "axios";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetail = () => {
  const loggedInUserId = "64b813345ab966a0d7cd61a5"; //todo: get from session storage
  const location = useLocation();
  const navigate = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    const currentId = location.pathname.split("/").pop();
    if (currentId !== window.sessionStorage.getItem("prevId")) {
      window.location.reload();
    }
    window.sessionStorage.setItem("prevId", currentId);
  }, [_id]);

  const [isMethodExecuted, setIsMethodExecuted] = useState(false);
  const [bagCount, setBagCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [disableBag, setDisableBag] = useState(false);
  const [disableWishlist, setDisableWishlist] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [bagLabel, setBagBtnLabel] = useState("Add to Bag");
  const [wishBtnLabel, setWishBtnLabel] = useState("Add to Wishlist");
  const [inventoryCheck, setInventoryCheck] = useState([]);
  const [productDetails, setProductDetails] = useState();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    getProductDetail();
    getUserWishlistCart();
    if (isMethodExecuted) {
      const timer = setTimeout(() => {
        hideAlert();
        setIsMethodExecuted(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isMethodExecuted]);

  useEffect(() => {
    getProductDetail();
  }, [_id]);

  const getProductDetail = () => {
    axios
      .post(`/shoes/getShoe`, { _id })
      .then((res) => {
        setProductDetails(res.data);
        checkForOutOfStock(res.data.availableQuantity);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserWishlistCart = () => {
    axios
      .post(`/users/getWishlistCart`, { _id: loggedInUserId })
      .then((res) => {
        if (res?.data?.userDetails) {
          setUserDetails(res.data.userDetails);
          const details = res.data.userDetails;
          setBagCount(details.cart.items.length);
          setWishlistCount(details.wishlist.length);
          if (details.wishlist.includes(_id)) {
            setWishBtnLabel("wishlisted");
            setDisableWishlist(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkForOutOfStock = (data) => {
    let sizeQuantity = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].quantity > 0) {
        sizeQuantity.push(data[i]);
      }
    }
    setInventoryCheck(sizeQuantity);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const handleAddToBag = async () => {
    if (selectedSize && selectedSize !== "Select size") {
      const resp = await checkForAlreadyInBag();
      if (!resp) {
        updateUserCart();
      } else {
        setAlertMsg("Item already in the bag!");
        setShowAlert(true);
      }
    } else {
      window.alert("Please select a size");
    }
  };

  const checkForAlreadyInBag = () => {
    if (userDetails.cart?.items?.length < 1) {
      return false;
    } else {
      return userDetails.cart.items.find(
        (ele) => ele.shoeId === _id && ele.size === selectedSize
      );
    }
  };

  const updateUserCart = () => {
    axios
      .post(`/users/addToCart`, {
        _id: loggedInUserId,
        selectedItem: { shoeId: _id, size: selectedSize, quantity: 1 },
      })
      .then((res) => {
        if (res?.data?.message.toLowerCase().includes("added to cart")) {
          setDisableBag(true);
          setAlertMsg("Item added to the bag successfully!");
          setAlertVariant("success");
          setShowAlert(true);
          setBagCount(bagCount + 1);
          setBagBtnLabel("Added to Bag");
          setIsMethodExecuted(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddToWishlist = () => {
    updateUserWishlist();
  };

  const updateUserWishlist = () => {
    axios
      .post(`/users/addToWishlist`, {
        _id: loggedInUserId,
        wishlistedItem: _id,
      })
      .then((res) => {
        if (res?.data?.message.toLowerCase().includes("added to wishlist")) {
          setDisableWishlist(true);
          setAlertMsg("Item added to the wishlist successfully!");
          setAlertVariant("success");
          setShowAlert(true);
          setWishlistCount(wishlistCount + 1);
          setWishBtnLabel("Wishlisted");
          setIsMethodExecuted(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {productDetails ? (
        <>
          <div>
            <Snackbar
              open={showAlert}
              autoHideDuration={6000}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <SnackbarContent
                message={alertMsg}
                style={{
                  backgroundColor: "green",
                }}
              ></SnackbarContent>
            </Snackbar>
          </div>

          <div
            style={{
              maxHeight: "auto",
              backgroundColor: "#0f0f0f",
            }}
          >
            <Grid container style={{ margin: "0" }}>
              <Grid
                item
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "2%",
                  paddingTop: "1%",
                }}
                lg={12}
                md={4}
              >
                <div>
                  <IconButton aria-label="cart">
                    <Badge
                      badgeContent={bagCount}
                      color="primary"
                      style={{ color: "white" }}
                    >
                      <ShoppingBagOutlinedIcon
                        style={{ height: "30px", width: "30px" }}
                      />
                    </Badge>
                  </IconButton>
                </div>
                <div>
                  <IconButton
                    aria-label="cart"
                    onClick={() => {
                      navigate("/wishlist");
                    }}
                  >
                    <Badge
                      badgeContent={wishlistCount}
                      color="primary"
                      style={{ color: "white" }}
                    >
                      <FavoriteBorderOutlinedIcon
                        style={{ height: "30px", width: "30px" }}
                      />
                    </Badge>
                  </IconButton>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              style={{ padding: "3%" }}
            >
              <Grid item xs={12} lg={6} style={{ padding: 0 }}>
                <div>
                  <Carousel>
                    {productDetails.images.map((image, index) => (
                      <img
                        src={"data:image/png;base64," + image.data}
                        alt={image.name}
                      />
                    ))}
                  </Carousel>
                </div>
              </Grid>
              <Grid item xs={12} lg={6} style={{ padding: "3%" }}>
                <Card
                  style={{ border: "none", boxShadow: "none" }}
                  className="full-width-div"
                >
                  <CardContent
                    style={{
                      backgroundColor: "#0f0f0f",
                      color: "white",
                    }}
                  >
                    <Typography
                      style={{ fontSize: "xxx-large", paddingBottom: "2%" }}
                    >
                      {productDetails.name}
                    </Typography>
                    <Typography style={{ paddingBottom: "5%" }}>
                      {productDetails.subText}
                    </Typography>
                    <Typography
                      style={{ fontSize: "large", paddingBottom: "8%" }}
                    >
                      {productDetails.price}
                    </Typography>
                    <Typography style={{ color: "black" }}>
                      <FormControl fullWidth>
                        <InputLabel style={{ color: "white" }}>
                          Select size
                        </InputLabel>
                        <Select
                          label="Select size"
                          value={selectedSize}
                          onChange={(e) => {
                            setSelectedSize(e.target.value);
                          }}
                          style={{
                            backgroundColor: "transparent",
                            borderColor: "white",
                            color: "white",
                            width: "20rem",
                            marginBottom: "5%",
                          }}
                          className="select-size"
                          MenuProps={{
                            PaperProps: {
                              style: {
                                backgroundColor: "#3b3b3b",
                                color: "white",
                              },
                            },
                          }}
                        >
                          {inventoryCheck.map((product) => (
                            <MenuItem value={product.size}>
                              {product.size}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Typography>
                    <Typography>{productDetails.shortDescription}</Typography>
                    <Typography>
                      <Button
                        className="view-details"
                        variant="link"
                        style={{
                          padding: "0",
                          marginTop: "6%",
                        }}
                        onClick={() =>
                          navigate("/details", { state: { productDetails } })
                        }
                      >
                        View product details
                      </Button>
                    </Typography>
                    <div
                      style={{
                        marginTop: "6%",
                      }}
                    >
                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "#38B6FF",
                          borderColor: "#38B6FF",
                          borderRadius: "17px",
                          padding: "3%",
                          marginRight: "3%",
                          marginBottom: "3%",
                        }}
                        onClick={handleAddToBag}
                        disabled={disableBag}
                      >
                        {bagLabel}
                      </Button>

                      <Button
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          border: "1px solid lightgrey",
                          borderRadius: "17px",
                          padding: "3%",
                          marginBottom: "3%",
                        }}
                        onClick={handleAddToWishlist}
                        disabled={disableWishlist}
                      >
                        {wishBtnLabel}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {_id && <SimilarProducts tags={productDetails.tags} _id={_id} />}
          </div>
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductDetail;
