//Author: Ashish Ojha (B00931967)
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Dialog,
  DialogContent,
  TextField,
  IconButton,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import SortDropdown from "./SortDropdown";
import FilterColumn from "./FilterColumn";
import ShoeCard from "./ShoeCard";
import Pagination from "./Pagination";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Search } from "@mui/icons-material";
import Footer from "../HomePage/Footer";
import Loader from "../../utils/Loader";
import "../../App.css";

const ProductListing = () => {
  const [sortValue, setSortValue] = useState("sort1");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [visibleShoeData, setVisibleShoeData] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  let { passedSearchKeyword } = useParams();
  const [searchKeyword, setSearchKeyword] = useState(
    passedSearchKeyword ? passedSearchKeyword : ""
  );
  const [searchText, setSearchText] = useState("");

  const [filterReq, setFilterReq] = useState({
    sortValue: sortValue,
    selectedFilters: selectedFilters,
    currentPage: currentPage,
    searchKeyword: searchKeyword,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleResetFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
    handleModalClose();
  };

  const handleSearchClose = () => {
    setSearchKeyword("");
    if (
      passedSearchKeyword !== null &&
      passedSearchKeyword !== undefined &&
      passedSearchKeyword !== ""
    ) {
      navigate("/productlisting");
      passedSearchKeyword = "";
    }
  };

  useEffect(() => {
    if (isMobile) {
      if (
        selectedFilters.sort === null ||
        selectedFilters.sort === "" ||
        selectedFilters.sortValue === undefined
      ) {
        setSortValue("sort1");
      } else {
        setSortValue(selectedFilters.sort);
      }
    }
    const newFilterReq = {
      sortValue: sortValue,
      selectedFilters: selectedFilters,
      searchKeyword: searchKeyword,
    };
    setFilterReq(newFilterReq);
  }, [sortValue, selectedFilters, searchKeyword]);

  useEffect(() => {
    const fetchFilteredShoes = async () => {
      try {
        setIsLoading(true);
        setHasLoaded(false);
        const response = await axios.post("/filter/filterShoes", filterReq);
        const data = response.data;
        setVisibleShoeData(data.visibleShoeData);
        setTotalPages(data.totalPages);
        setIsLoading(false);
        setHasLoaded(true);
      } catch (error) {
        console.error("Error retrieving shoes:", error);
        setVisibleShoeData([]);
        setTotalPages([]);
        setIsLoading(false);
        setHasLoaded(true);
      }
    };

    if (filterReq) {
      fetchFilteredShoes();
    }
  }, [filterReq]);

  useEffect(() => {
    if (
      passedSearchKeyword !== null &&
      passedSearchKeyword !== undefined &&
      passedSearchKeyword !== ""
    ) {
      setSearchKeyword(passedSearchKeyword);
    }
  }, []);

  const handlePageChange = async (pageNumber) => {
    const pageChangeType = pageNumber > currentPage ? "next" : "previous";

    try {
      setIsLoading(true);
      setHasLoaded(false);
      const response = await axios.post("/filter/filterShoes", {
        ...filterReq,
        pageChangeType,
        currentPage: pageNumber,
      });
      const data = response.data;
      setVisibleShoeData(data.visibleShoeData);
      setTotalPages(data.totalPages);
      setCurrentPage(pageNumber);
      setIsLoading(false);
      setHasLoaded(true);
    } catch (error) {
      console.error("Error retrieving shoes:", error);
      setVisibleShoeData([]);
      setTotalPages([]);
      setCurrentPage(1);
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    setSearchKeyword(searchText);
    setCurrentPage(1);
    setSearchText("");
    if (
      passedSearchKeyword !== null &&
      passedSearchKeyword !== undefined &&
      passedSearchKeyword !== ""
    ) {
      navigate("/productlisting");
      passedSearchKeyword = "";
    }
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch();
  };

  return (
    <div>
      <Box sx={{ minHeight: "100vh" }}>
        <Container sx={{ maxWidth: "none !important", p: 2 }}>
          {isMobile ? (
            <Grid container>
              <Grid item xs={12}>
                <Box>
                  <TextField
                    id="search"
                    label="Search"
                    variant="outlined"
                    autoComplete="off"
                    value={searchText}
                    fullWidth
                    onChange={handleSearchTextChange}
                    onKeyDown={handleSearchKeyDown}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          color="inherit"
                          onClick={handleSearchButtonClick}
                        >
                          <Search />
                        </IconButton>
                      ),
                      style: {
                        color: "white",
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
                </Box>
              </Grid>
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
                  {searchKeyword && (
                    <Grid item xs={12}>
                      <Box>
                        <Chip
                          label={`Result For: ${searchKeyword}`}
                          color="primary"
                          onDelete={handleSearchClose}
                          deleteIcon={<CloseIcon />}
                          sx={{ marginTop: 2, marginBottom: 2 }}
                        />
                      </Box>
                    </Grid>
                  )}
                  <Button
                    variant="outlined"
                    startIcon={<TuneIcon />}
                    onClick={handleModalOpen}
                  >
                    Filter
                  </Button>
                  <Dialog
                    open={isModalOpen}
                    onClose={handleModalClose}
                    fullScreen={isMobile}
                  >
                    <Grid container justifyContent="center" alignItems="center">
                      <IconButton
                        color="inherit"
                        aria-label="close"
                        onClick={handleModalClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: "white",
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                    <DialogContent
                      sx={{
                        backgroundColor: "#262626",
                        color: "white",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: 6,
                      }}
                    >
                      <Box sx={{ flex: 1, overflow: "auto" }}>
                        <FilterColumn
                          selectedFilters={selectedFilters}
                          handleFilterChange={handleFilterChange}
                          handleResetFilters={handleResetFilters}
                          isMobileScreen={true}
                        />
                      </Box>
                    </DialogContent>
                  </Dialog>
                </Box>
              </Grid>
              {isLoading ? (
                <Loader />
              ) : visibleShoeData.length > 0 ? (
                visibleShoeData.map((shoe, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Box sx={{ p: 2 }}>
                      <ShoeCard shoe={shoe} height="100" />
                    </Box>
                  </Grid>
                ))
              ) : (
                hasLoaded &&
                visibleShoeData.length === 0 && (
                  <>
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "2rem",
                        fontWeight: 100,
                      }}
                    >
                      No results
                    </div>
                  </>
                )
              )}
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
            <>
              <Grid
                container
                spacing={2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: "3%",
                  paddingTop: "3%",
                }}
              >
                <Grid item lg={10} md={9} sm={8} xs={6}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box>
                        <TextField
                          id="search"
                          label="Search"
                          variant="outlined"
                          autoComplete="off"
                          value={searchText}
                          fullWidth
                          onChange={handleSearchTextChange}
                          onKeyDown={handleSearchKeyDown}
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                color="inherit"
                                onClick={handleSearchButtonClick}
                              >
                                <Search />
                              </IconButton>
                            ),
                            style: {
                              color: "white",
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
                              "&:focus-within fieldset, &:focus-visible fieldset":
                                {
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
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={2} md={3} sm={4} xs={6}>
                  <Box>
                    <SortDropdown
                      value={sortValue}
                      handleSortChange={handleSortChange}
                    />
                  </Box>
                </Grid>
              </Grid>

              {searchKeyword && (
                <Grid item xs={12}>
                  <Box>
                    <Chip
                      label={`Result For: ${searchKeyword}`}
                      color="primary"
                      onDelete={handleSearchClose}
                      deleteIcon={<CloseIcon />}
                      sx={{ marginTop: 2, marginBottom: 2 }}
                    />
                  </Box>
                </Grid>
              )}

              <Grid container>
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
                      isMobileScreen={false}
                    />
                  </Box>
                </Grid>
                <Grid item xs={9} sm={9} md={9}>
                  <Box sx={{ p: 2, borderRadius: 4 }}>
                    {isLoading ? (
                      <Loader />
                    ) : visibleShoeData.length > 0 ? (
                      <Grid container spacing={2}>
                        {visibleShoeData.map((shoe, index) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <ShoeCard shoe={shoe} height="200" />
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      hasLoaded &&
                      visibleShoeData.length === 0 && (
                        <>
                          <div
                            style={{
                              textAlign: "center",
                              fontSize: "2rem",
                              fontWeight: 100,
                            }}
                          >
                            No results
                          </div>
                        </>
                      )
                    )}
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
            </>
          )}
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default ProductListing;
