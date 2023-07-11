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
import axios from "axios";

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

  useEffect(() => {
    if (isMobile) {
      if (selectedFilters.sort === null || selectedFilters.sort === "" || selectedFilters.sortValue === undefined) {
        setSortValue("sort1");
      } else {
        setSortValue(selectedFilters.sort);
      }
    }
    const filerReq = {
      sortValue: sortValue,
      selectedFilters: selectedFilters,
      currentPage: currentPage,
    };
    const fetchFilteredShoes = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/shoes/filterShoes",
          filerReq
        );
        const data = response.data;
        setVisibleShoeData(data.visibleShoeData);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error retrieving categories:", error);
      }
    };
    fetchFilteredShoes();
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
                    backgroundColor: "transparent",
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
                    <ShoeCard shoe={shoe} height="100" />
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
                    backgroundColor: "transparent",
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
                        <ShoeCard shoe={shoe} height="200" />
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
