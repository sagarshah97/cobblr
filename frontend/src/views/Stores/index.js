//Author: Jayant Patidar

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript,
  useLoadScript,
  LoadScriptNext,
} from "@react-google-maps/api";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Container,
  IconButton,
  TextField,
  Hidden,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import StoreIcon from "@mui/icons-material/Store";
import SearchIcon from "@mui/icons-material/Search";
import "./store.css";
import Footer from "../HomePage/Footer";

const StoreLocator = () => {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const [defaultCenter, setDefaultCenter] = useState({
    lat: 44.636318403116086,
    lng: -63.595130784660036,
  });

  const mapContainerRef = useRef();

  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const mapRef = useRef();

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get("/stores/getAllStores");
      setStores(response.data);
    } catch (error) {
      console.log("Error fetching stores:", error);
    }
  };

  const handleCardClick = (store) => {
    setSelectedStore(store);

    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Typography
          variant="h3"
          style={{
            paddingTop: "20px",
          }}
        >
          Locate Store
        </Typography>
        <div
          ref={mapContainerRef}
          style={{
            marginTop: "20px",
          }}
        >
          <LoadScriptNext
            googleMapsApiKey={googleMapsApiKey}
            loadingElement={<h1>Loading...</h1>}
          >
            <GoogleMap
              ref={mapRef}
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={defaultCenter}
            >
              {stores.map((store) => (
                <Marker
                  key={store._id}
                  position={{ lat: store.latitude, lng: store.longitude }}
                  onClick={() => setSelectedStore(store)}
                />
              ))}
              {selectedStore && (
                <InfoWindow
                  position={{
                    lat: selectedStore.latitude,
                    lng: selectedStore.longitude,
                  }}
                  style={{
                    background: "black",
                    color: "white",
                    padding: "10px",
                    overflow: Hidden,
                  }}
                  onCloseClick={() => setSelectedStore(null)}
                  options={{ disableCloseButton: true }}
                >
                  <div
                    style={{
                      background: "black",
                      color: "white",
                      padding: "10px",
                      overflow: Hidden,
                    }}
                  >
                    <Typography variant="h5">{selectedStore.name}</Typography>
                    <Typography>{selectedStore.address}</Typography>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScriptNext>
        </div>
        <Box mt={4}>
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            autoComplete="off"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
              ),
              style: {
                color: "white",
                marginBottom: "15px",
              },
              sx: {
                "& fieldset": {
                  borderColor: "white !important",
                  borderRadius: 1.5,
                },
                "&:hover fieldset": {
                  borderColor: "white !important",
                  borderRadius: 1.5,
                },
                "&:focus-within fieldset, &:focus-visible fieldset": {
                  borderColor: "white !important",
                },
              },
            }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            InputOutlineProps={{
              style: {
                color: "white",
              },
            }}
            sx={{
              ml: { xs: "auto" },
              mr: "25px",
            }}
          />
          <Grid container spacing={1}>
            {filteredStores.map((store) => (
              <Grid item xs={12} sm={6} key={store._id}>
                <Card
                  onClick={() => handleCardClick(store)} // Handle card click
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    width: "100%",
                    cursor: "pointer",
                    bgcolor: "#000000",
                    border: "1px solid white",
                    color: "white",
                    borderRadius: "15px",
                    "&:hover": {
                      border: "1px solid white",
                    },
                  }}
                >
                  <Grid
                    container
                    spacing={1}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={50}
                      md={4}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#000000",
                      }}
                    >
                      <StoreIcon
                        fontSize="large"
                        style={{
                          height: "7rem",
                          width: "7rem",
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={7}
                      md={8}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "20px",
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {store.name}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <PhoneIcon
                            fontSize="small"
                            style={{ marginRight: "5px" }}
                          />
                          <Typography variant="body1" sx={{ color: "white" }}>
                            {store.phone}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: "15px",
                          }}
                        >
                          <LocationOnIcon
                            fontSize="large"
                            style={{ marginRight: "5px" }}
                          />
                          <Typography variant="body1" sx={{ color: "white" }}>
                            {store.address}
                          </Typography>
                        </div>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default StoreLocator;
