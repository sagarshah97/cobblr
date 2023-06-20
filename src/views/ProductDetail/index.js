import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { Snackbar, SnackbarContent } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import SimilarProducts from "../SimilarProducts/index";
import "../../App.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import p11 from "../../assets/images/ProductDetail/11.png";
import p12 from "../../assets/images/ProductDetail/12.png";
import p13 from "../../assets/images/ProductDetail/13.png";
import p14 from "../../assets/images/ProductDetail/14.png";
import p15 from "../../assets/images/ProductDetail/15.png";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const param = location.state?.params;
  const actualWishlistCount = 0;
  const actualBagCount = 0;

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

  const productImages = [p11, p12, p13, p14, p15];
  const productDetails = {
    id: 1,
    code: "DR00-0-001",
    name: "Nike Go FlyEase",
    subText: "Easy On/Off Shoes",
    shortDescription:
      "Ditch the laces and get outside. These kicks feature Nike's revolutionary FlyEase technology, making on-and-off a breeze.",
    price: "$123",
    color: "White",
    thumbnail: "p11", //todo: need to rethink the logic
    sizes: [
      "US W 5 / M 3.5",
      "US W 5.5 / M 4",
      "US W 6 / M 4.5",
      "US W 6.5 / M 5",
      "US W 7 / M 5.5",
      "US W 7.5 / M 6",
      "US W 8 / M 6.5",
      "US W 8.5 / M 7",
      "US W 9 / M 7.5",
      "US W 9.5 / M 8",
      "US W 10 / M 8.5",
      "US W 10.5 / M 9",
      "US W 11 / M 9.5",
      "US W 11.5 / M 10",
      "US W 12 / M 10.5",
    ],
    quantity: [20, 20, 20, 20, 20, 20, 0, 0, 20, 20, 20, 20, 20, 20, 20],
    briefDescription:
      "The entire heel (including the sole) hinges open and stays open until you're ready. Just slip in and step down to make the heel move back into place and secure your foot.Plush Cushlon foam gives each heel-to-toe transition a smooth, cushioned feeling.Airy fabric in the upper lets your feet breathe while durable, no-sew overlays provide structure and stability.",
  };

  useEffect(() => {
    checkForOutOfStock();
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

  const checkForOutOfStock = () => {
    let sizeQuantity = [];
    for (let i = 0; i < productDetails.sizes.length; i++) {
      if (productDetails.quantity[i] > 0) {
        sizeQuantity.push({
          size: productDetails.sizes[i],
          quantity: productDetails.quantity[i],
        });
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
          //   paddingTop: "64px",
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
              <IconButton aria-label="cart">
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
                {productImages.map((image) => (
                  <img src={image} alt="First slide" />
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
                <Typography style={{ fontSize: "large", paddingBottom: "8%" }}>
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
                    >
                      {inventoryCheck.map((product) => (
                        <MenuItem value={product.size}>{product.size}</MenuItem>
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
        <SimilarProducts />
      </div>
    </>
  );
};

export default ProductDetail;
