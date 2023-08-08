// Author: Sagar Paresh Shah (B00930009)

import { useState, useEffect } from "react";
import { Card, Typography, Grid, Button, Chip } from "@mui/material";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "../../App.css";
import Footer from "../HomePage/Footer";
import Spinner from "../../utils/Loader";

const AdditionalDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const productDetails = location.state?.productDetails;

  const [inventoryCheck, setInventoryCheck] = useState([]);

  useEffect(() => {
    if (productDetails?.code) {
      checkForOutOfStock();
    }
  }, []);

  const checkForOutOfStock = () => {
    setInventoryCheck(productDetails.availableQuantity);
  };

  return (
    <>
      {productDetails?.code ? (
        <>
          <div
            style={{
              backgroundColor: "#0f0f0f",
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
                  <Grid container spacing={2} style={{ margin: "0" }}>
                    <Grid item xs={12} lg={6} md={12}>
                      <div class="image-container">
                        <img
                          alt={productDetails.images[0].name}
                          variant="top"
                          src={
                            "data:image/png;base64," +
                            productDetails.images[0].data
                          }
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
                              ${productDetails.price}
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
                    {productDetails.tags && (
                      <div style={{ paddingTop: "2%", paddingBottom: "1%" }}>
                        <span>Tags:</span>
                        {productDetails.tags?.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            color="primary"
                            style={{
                              margin: "5px",
                              backgroundColor: "#605d5d",
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <div style={{ paddingBottom: "2%" }}>
                      <span>Category: {productDetails.category}</span>
                    </div>
                    <div style={{ paddingBottom: "2%" }}>
                      {productDetails.shortDescription}
                    </div>
                    <div style={{ paddingBottom: "2%" }}>
                      {productDetails.briefDescription}
                    </div>
                    <div style={{ paddingBottom: "2%" }}>
                      <span>Material: {productDetails.material}</span>
                    </div>
                    <div style={{ paddingBottom: "2%" }}>
                      <span>Gender: {productDetails.gender}</span>
                    </div>
                    <div style={{ paddingBottom: "2%" }}>
                      Color: {productDetails.color}
                    </div>
                    <div style={{ paddingBottom: "2%" }}>
                      Code: {productDetails.code}
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item lg={6} md={12} style={{ paddingBottom: "10%" }}>
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
                              md={4}
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
                              md={4}
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
                  <Typography>
                    <Button
                      className="view-details"
                      variant="link"
                      style={{
                        padding: "0",
                        marginTop: "6%",
                        color: "#38B5FF",
                      }}
                      onClick={() =>
                        navigate(`/productDetail/${productDetails._id}`)
                      }
                    >
                      <ArrowBackIcon style={{ marginRight: "10px" }} />
                      Back to product
                    </Button>
                  </Typography>
                </div>
              </Grid>
            </Grid>
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

export default AdditionalDetails;
