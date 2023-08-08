// Author: Sagar Paresh Shah (B00930009)

import { React, useState, useEffect } from "react";
import { Grid, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../../App.css";
import Spinner from "../../utils/Loader";

const SimilarProducts = (props) => {
  const id = props._id;
  const [oldId, setOldId] = useState("");

  const navigate = useNavigate();
  const [similarProducts, setSimilarProducts] = useState();

  useEffect(() => {
    getSimilarProducts();
  }, [id]);

  const getSimilarProducts = () => {
    axios
      .post(`/shoes/getSimilarShoes`, {
        tags: props.tags,
        _ids: typeof id === "string" ? [id] : id,
      })
      .then((res) => {
        setOldId(id);
        setSimilarProducts(res?.data);
      });
  };

  const handleClick = (shoeId) => {
    const params = { _id: shoeId };
    navigate(`/productdetail/${shoeId}`, { state: { params } });
  };

  if (oldId !== id) {
    getSimilarProducts();
  }

  return (
    <>
      {similarProducts ? (
        <>
          <div
            style={{
              marginTop: "5%",
              marginLeft: "3%",
              color: "white",
              fontSize: "xx-large",
              fontWeight: "200",
            }}
          >
            You might also like
          </div>
          <div style={{ paddingBottom: "5%" }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              style={{ padding: "1%", marginTop: "2%" }}
            >
              {similarProducts.map((shoe) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  style={{ paddingLeft: "2%" }}
                >
                  <Card
                    className="card-hover"
                    style={{
                      border: "none",
                      boxShadow: "none",
                      backgroundColor: "transparent",
                    }}
                    onClick={() => {
                      handleClick(shoe._id);
                    }}
                  >
                    <div class="image-container">
                      <img
                        variant="top"
                        src={"data:image/png;base64," + shoe.images[0].data}
                        alt={shoe.images[0].name}
                        className="image"
                        style={{
                          borderRadius: "15px",
                          backgroundColor: "transparent",
                        }}
                      />
                    </div>
                    <Typography
                      style={{
                        backgroundColor: "#0f0f0f",
                        color: "white",
                        paddingLeft: "0",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "x-large",
                          paddingTop: "2%",
                        }}
                      >
                        {shoe.name}
                      </Typography>
                      <Typography
                        style={{ paddingBottom: "5%", fontWeight: "200" }}
                      >
                        {shoe.subText}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "large",
                          paddingBottom: "5%",
                        }}
                      >
                        ${shoe.price}
                      </Typography>
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </>
  );
};

export default SimilarProducts;
