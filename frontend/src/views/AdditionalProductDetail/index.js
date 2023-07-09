import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import p11 from "../../assets/images/ProductDetail/11.png";

import "../../App.css";
import Footer from "../HomePage/Footer";

const AdditionalDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const productDetails = location.state?.productDetails;
  const params = {
    productId: 1,
  };

  const [inventoryCheck, setInventoryCheck] = useState([]);

  useEffect(() => {
    if (productDetails?.id) {
      checkForOutOfStock();
    }
  }, []);

  const checkForOutOfStock = () => {
    let sizeQuantity = [];
    for (let i = 0; i < productDetails.sizes.length; i++) {
      sizeQuantity.push({
        size: productDetails.sizes[i],
        quantity: productDetails.quantity[i],
      });
    }
    setInventoryCheck(sizeQuantity);
  };

  return (
    <>
      {productDetails?.id ? (
        <>
          <div
            style={{
              //   maxHeight: "auto",
              backgroundColor: "#0f0f0f",
              //   paddingTop: "64px",
            }}
          >
            <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid
                item
                style={{ padding: "2%", paddingLeft: "3%" }}
                xs={12}
                lg={6}
                md={12}
              >
                <div className="full-width-div">
                  <Grid container style={{ margin: "0", padding: "3%" }}>
                    <Grid item xs={12} lg={6} md={12}>
                      <div class="image-container">
                        <img
                          variant="top"
                          src={p11}
                          className="image"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: "transparent",
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={6} md={12}>
                      <div className="padding-card-details">
                        <Card
                          style={{
                            border: "none",
                            boxShadow: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <Typography
                            style={{
                              backgroundColor: "#0f0f0f",
                              color: "white",
                            }}
                          >
                            <Typography
                              style={{
                                fontSize: "xxx-large",
                              }}
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
                          </Typography>
                        </Card>
                      </div>
                    </Grid>
                  </Grid>
                  <div
                    style={{
                      color: "white",
                      paddingTop: "2%",
                      paddingBottom: "2%",
                      fontSize: "20px",
                      fontWeight: "200",
                      padding: "3%",
                    }}
                  >
                    <div>{productDetails.shortDescription}</div>
                    <div style={{ marginTop: "4%" }}>
                      {productDetails.briefDescription}
                    </div>
                    <div style={{ marginTop: "4%" }}>
                      Color: {productDetails.color}
                    </div>
                    <div>Code: {productDetails.code}</div>
                  </div>
                </div>
              </Grid>
              <Grid item lg={6} md={12}>
                <div
                  style={{
                    color: "white",
                    marginTop: "10%",
                    fontSize: "30px",
                    fontWeight: "200",
                    paddingBottom: "3%",
                  }}
                  className="padding-available-sizes"
                >
                  Available sizes
                </div>
                <div
                  style={{
                    color: "white",
                    marginTop: "2%",
                    fontSize: "20px",
                    fontWeight: "200",
                  }}
                  className="padding-available-sizes"
                >
                  <Grid container>
                    {inventoryCheck.map((product) => (
                      <>
                        {product.quantity > 0 ? (
                          <>
                            <Grid
                              item
                              md={3}
                              style={{
                                border: "1px solid lightgrey",
                                borderRadius: "15px",
                                padding: "1%",
                                marginBottom: "2%",
                                marginRight: "2%",
                                textAlign: "center",
                              }}
                            >
                              {product.size}
                            </Grid>
                          </>
                        ) : (
                          <>
                            <Grid
                              item
                              md={3}
                              style={{
                                color: "grey",
                                border: "1px solid grey",
                                borderRadius: "15px",
                                padding: "1%",
                                marginBottom: "2%",
                                marginRight: "2%",
                                textAlign: "center",
                              }}
                            >
                              {product.size}
                            </Grid>
                          </>
                        )}
                      </>
                    ))}
                  </Grid>
                </div>
                <div className="padding-available-sizes">
                  <Button
                    style={{
                      backgroundColor: "#38B6FF",
                      borderColor: "#38B6FF",
                      borderRadius: "17px",
                      padding: "3%",
                      width: "15rem",
                      marginRight: "3%",
                      marginTop: "5%",
                      marginBottom: "3%",
                      color: "white",
                    }}
                    onClick={() =>
                      navigate("/productDetail", { state: { params } })
                    }
                  >
                    Back to product
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </>
      ) : (
        <>
          <div>Page not found</div>
        </>
      )}
      <Footer />
    </>
  );
};

export default AdditionalDetails;