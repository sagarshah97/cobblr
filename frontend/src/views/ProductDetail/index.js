import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import DisplayReview from "../CustomerReviews/DisplayReviews";
import Spinner from "../../utils/Spinner";
import "../../App.css";
import axios from "axios";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  const actualWishlistCount = 0; //todo: get from user in db
  const actualBagCount = 0; //todo: get from user in db

  const [isMethodExecuted, setIsMethodExecuted] = useState(false);
  const [bagCount, setBagCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVariant, setAlertVariant] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [disableBag, setDisableBag] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [bagLabel, setBagBtnLabel] = useState("Add to Bag");
  const [wishBtnLabel, setWishBtnLabel] = useState("Add to Wishlist");
  const [inventoryCheck, setInventoryCheck] = useState([]);
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    getProductDetail();
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
      .post(`/shoes/getShoe`, {
        _id: _id ? _id : "649dc5a07b56de6519346d47", //todo: need to remove hardcoded id
      })
      .then((res) => {
        setProductDetails(res.data);
        checkForOutOfStock(res.data.availableQuantity);
      });
  };

  const checkForOutOfStock = (data) => {
    let sizeQuantity = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].quantity > 0) {
        sizeQuantity.push(data[i]);
      }
    }
    console.log(sizeQuantity);
    setInventoryCheck(sizeQuantity);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const handleAddToBag = () => {
    console.log(selectedSize);
    if (selectedSize && selectedSize !== "Select size") {
      setDisableBag(true);
      setAlertMsg("Item added to the bag successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      setBagCount(actualBagCount + 1);
      setBagBtnLabel("Added to Bag");
      setIsMethodExecuted(true);
    } else {
      window.alert("Please select a size");
    }
  };

  const handleAddToWishlist = () => {
    if (wishlistCount != actualWishlistCount) {
      setAlertMsg("Item removed from the wishlist successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      setWishlistCount(wishlistCount - 1);
      setWishBtnLabel("Add to Wishlist");
    } else {
      setAlertMsg("Item added to the wishlist successfully!");
      setAlertVariant("success");
      setShowAlert(true);
      setWishlistCount(wishlistCount + 1);
      setWishBtnLabel("Wishlisted");
    }
    setIsMethodExecuted(true);
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
                            console.log(e.target.value);
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
                      >
                        {wishBtnLabel}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <div
              style={{
                marginTop: "5%",
                marginBottom: "2%",
                marginLeft: "3%",
                color: "white",
                fontSize: "xx-large",
                fontWeight: "200",
              }}
            >
              Customer Reviews
            </div>
            {/* display customer review component tag   */}
            <div style={{ paddingLeft: "3%" }}>
              {" "}
              {/* Add padding to the left */}
              <DisplayReview shoeId={_id} />
            </div>

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
