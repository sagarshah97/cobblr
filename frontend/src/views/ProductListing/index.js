import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import SortDropdown from "./SortDropdown";
import FilterColumn from "./FilterColumn";
import ShoeCard from "./ShoeCard";
import Pagination from "./Pagination";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TuneIcon from "@mui/icons-material/Tune";

import image1 from "../../assets/images/ProductListing/image1.jpeg";
import image2 from "../../assets/images/ProductListing/image2.jpeg";
import image3 from "../../assets/images/ProductListing/image3.jpeg";
import image4 from "../../assets/images/ProductListing/image4.jpeg";
import image5 from "../../assets/images/ProductListing/image5.jpeg";
import image6 from "../../assets/images/ProductListing/image6.jpeg";
import image7 from "../../assets/images/ProductListing/image7.jpeg";
import image8 from "../../assets/images/ProductListing/image8.jpeg";
import image9 from "../../assets/images/ProductListing/image9.jpeg";
import image10 from "../../assets/images/ProductListing/image10.jpeg";
import image11 from "../../assets/images/ProductListing/image11.jpeg";
import image12 from "../../assets/images/ProductListing/image12.jpeg";
import image13 from "../../assets/images/ProductListing/image13.jpeg";

import Footer from "../HomePage/Footer";
import "../../App.css";

const ProductListing = () => {
  const [sortValue, setSortValue] = useState("sort1");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [visibleShoeData, setVisibleShoeData] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSortValue(selectedValue);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      ...filter,
    }));
    setCurrentPage(1);
  };

  const handleApplyFilters = (filters) => {
    handleModalClose();
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
    handleModalClose();
  };

  // Hardcoded shoe data
  const originalShoeData = [
    { image: image1, name: "Shoe 1", price: 120, gender: "U", size: [7, 8, 9] },
    { image: image2, name: "Shoe 2", price: 98, gender: "M", size: [6, 8, 9] },
    {
      image: image13,
      name: "Shoe 3",
      price: 110,
      gender: "W",
      size: [6, 7, 8],
    },
    {
      image: image12,
      name: "Shoe 4",
      price: 200,
      gender: "U",
      size: [7, 8, 10],
    },
    {
      image: image11,
      name: "Shoe 5",
      price: 210,
      gender: "M",
      size: [6, 7, 8, 9, 10],
    },
    {
      image: image10,
      name: "Shoe 6",
      price: 199,
      gender: "W",
      size: [6, 8, 9],
    },
    { image: image7, name: "Shoe 7", price: 89, gender: "U", size: [10, 8, 9] },
    { image: image8, name: "Shoe 8", price: 134, gender: "M", size: [7, 8, 9] },
    {
      image: image9,
      name: "Shoe 9",
      price: 170,
      gender: "W",
      size: [7, 8, 9, 10],
    },
    {
      image: image10,
      name: "Shoe 10",
      price: 189,
      gender: "U",
      size: [6, 7, 8, 9],
    },
    {
      image: image11,
      name: "Shoe 11",
      price: 169,
      gender: "U",
      size: [7, 8, 9, 10],
    },
    {
      image: image12,
      name: "Shoe 12",
      price: 156,
      gender: "M",
      size: [7, 8, 9, 10],
    },
    {
      image: image6,
      name: "Shoe 13",
      price: 256,
      gender: "M",
      size: [6, 7, 8, 9],
    },
    {
      image: image1,
      name: "Shoe 14",
      price: 498,
      gender: "W",
      size: [6, 7, 8, 9],
    },
    { image: image2, name: "Shoe 15", price: 201, gender: "W", size: [6, 10] },
    { image: image3, name: "Shoe 16", price: 222, gender: "U", size: [7, 8] },
    { image: image4, name: "Shoe 17", price: 333, gender: "U", size: [8, 9] },
    {
      image: image5,
      name: "Shoe 18",
      price: 444,
      gender: "M",
      size: [7, 8, 9, 10],
    },
    {
      image: image6,
      name: "Shoe 19",
      price: 256,
      gender: "M",
      size: [6, 7, 8, 9],
    },
    {
      image: image4,
      name: "Shoe 20",
      price: 498,
      gender: "U",
      size: [7, 8, 9, 10],
    },
    {
      image: image3,
      name: "Shoe 21",
      price: 201,
      gender: "W",
      size: [8, 9, 10],
    },
    {
      image: image5,
      name: "Shoe 22",
      price: 76,
      gender: "W",
      size: [7, 10, 9],
    },
    {
      image: image4,
      name: "Shoe 23",
      price: 333,
      gender: "M",
      size: [7, 6, 9],
    },
    { image: image3, name: "Shoe 24", price: 444, gender: "U", size: [7, 9] },
  ];

  let shoeData = originalShoeData;

  useEffect(() => {
    if (selectedFilters.sort !== null || selectedFilters.sort !== "") {
      setSortValue(selectedFilters.sort);
    }
    console.log(
      "API call triggered with Sort:",
      sortValue,
      "Filters:",
      selectedFilters
    );
    console.log("before", shoeData);
    if (sortValue === "sort2") {
      shoeData.sort((a, b) => a.price - b.price);
    } else if (sortValue === "sort3") {
      shoeData.sort((a, b) => b.price - a.price);
    } else {
      shoeData = originalShoeData;
    }
    if (Object.keys(selectedFilters).length !== 0) {
      shoeData = originalShoeData.filter((shoe) => {
        const {
          sort = "",
          gender = "",
          size = "",
          price = "",
        } = selectedFilters;
        if (
          (gender === "" || shoe.gender === gender) &&
          (size === "" || shoe.size.includes(parseInt(size))) &&
          (price === "" ||
            (price === "100" && shoe.price <= 100) ||
            (price === "100_200" && shoe.price > 100 && shoe.price <= 200) ||
            (price === "200" && shoe.price > 200))
        ) {
          return true;
        }
        return false;
      });
    }
    // Pagination
    const itemsPerPage = 8;
    const totalItems = shoeData.length;
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleShoeData(shoeData.slice(startIndex, endIndex));
    console.log("after", shoeData);
  }, [sortValue, selectedFilters, currentPage, totalPages]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Box sx={{ minHeight: "100vh" }}>
        <Container sx={{ maxWidth: "none !important", p: 2 }}>
          {isMobile ? (
            // Mobile view
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: "black",
                    color: "white",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<TuneIcon />}
                    onClick={handleModalOpen}
                  >
                    Sort & Filter
                  </Button>
                  <Dialog
                    open={isModalOpen}
                    onClose={handleModalClose}
                    fullScreen={isMobile} // Set fullScreen prop based on isMobile
                  >
                    <DialogContent
                      sx={{
                        backgroundColor: "#262626",
                        color: "white",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ flex: 1, overflow: "auto" }}>
                        <FilterColumn
                          selectedFilters={selectedFilters}
                          handleFilterChange={handleFilterChange}
                          handleResetFilters={handleResetFilters}
                          handleApplyFilters={handleApplyFilters}
                          isMobileScreen={true}
                        />
                      </Box>
                    </DialogContent>
                  </Dialog>
                </Box>
              </Grid>
              {visibleShoeData.map((shoe, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ p: 2 }}>
                    <ShoeCard shoe={shoe} />
                  </Box>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 4,
                    mr: 2,
                  }}
                >
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </Box>
              </Grid>
            </Grid>
          ) : (
            // Desktop view
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    position: "sticky",
                    top: "64px",
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "16px",
                  }}
                >
                  <SortDropdown
                    value={sortValue}
                    handleSortChange={handleSortChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  <FilterColumn
                    selectedFilters={selectedFilters}
                    handleFilterChange={handleFilterChange}
                    handleResetFilters={handleResetFilters}
                    handleApplyFilters={handleApplyFilters}
                    isMobileScreen={false}
                  />
                </Box>
              </Grid>
              <Grid item xs={9} sm={9} md={9}>
                <Box sx={{ p: 2, borderRadius: 4 }}>
                  <Grid container spacing={2}>
                    {visibleShoeData.map((shoe, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ShoeCard shoe={shoe} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    mb: 4,
                    mr: 2,
                  }}
                >
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default ProductListing;
