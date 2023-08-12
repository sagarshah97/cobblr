import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import { Search, ExpandMore } from "@mui/icons-material";
import faq from "../../assets/images/faqIcon.png";
import axios from "axios";

import Footer from "../HomePage/Footer";

const FAQ = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/faq/getfaq");
        const data = response.data;
        setCategories(data);
      } catch (error) {
        console.error("Error retrieving categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchTextChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);

    let filteredQuestions = [];
    categories.forEach((category) => {
      category.questions.forEach((obj) => {
        if (
          obj.question
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          obj.answer.toLowerCase().includes(searchText.trim().toLowerCase())
        ) {
          filteredQuestions.push(obj);
        }
      });
    });

    if (filteredQuestions.length) {
      setFilteredQuestions(filteredQuestions);
    } else {
      setFilteredQuestions([]);
    }
  };

  return (
    <>
      <Box
        style={{
          paddingBottom: "64px",
        }}
      >
        <Container maxWidth="md" style={{ marginTop: 2, color: "white" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={faq}
              alt="Image"
              style={{
                maxWidth: "10rem",
                maxHeight: "10rem",
                objectFit: "contain",
                filter:
                  "invert(64%) sepia(94%) saturate(2518%) hue-rotate(176deg) brightness(103%) contrast(101%)",
              }}
            />
          </div>
          <Typography
            variant="h4"
            style={{
              marginBottom: "2%",
              fontWeight: 200,
              fontSize: "3rem",
              overflowWrap: "anywhere",
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            style={{
              marginBottom: "5%",
              fontWeight: 200,
              fontSize: "1rem",
            }}
          >
            Search or select from any one of the desired categories below to
            browse
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ marginBottom: "5%" }}>
              <TextField
                id="search"
                label="Search"
                variant="outlined"
                fullWidth
                autoComplete="off"
                value={searchText}
                onChange={handleSearchTextChange}
                InputProps={{
                  endAdornment: <Search />,
                  style: {
                    color: "white",
                  },
                  sx: {
                    "& fieldset": {
                      border: "1px solid white!important",
                      borderRadius: 1.5,
                    },
                    "&:hover fieldset": {
                      border: "1px solid white!important",
                      borderRadius: 1.5,
                    },
                    "&:focus-within fieldset, &:focus-visible fieldset": {
                      border: "1px solid white!important",
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
              />
            </Grid>

            {!searchText &&
              categories.map((category) => (
                <Grid item xs={12} key={category.id}>
                  <Accordion
                    style={{
                      boxShadow: "none",
                      backgroundColor: "#404040",
                      color: "white",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore style={{ color: "white" }} />}
                    >
                      {category.name.toUpperCase()}
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: "#A9A9A9" }}>
                      <Grid container spacing={0} direction="column">
                        {category.questions.map((question) => (
                          <Grid item xs={12} key={question.id}>
                            <Accordion
                              style={{
                                boxShadow: "none",
                                backgroundColor: "#A9A9A9",
                              }}
                            >
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                {question.question}
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography>{question.answer}</Typography>
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        ))}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            {searchText && (
              <Grid item xs={12}>
                <Grid container spacing={2} direction="column">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question) => (
                      <Grid item xs={12} key={question.id}>
                        <Accordion
                          style={{
                            boxShadow: "none",
                            backgroundColor: "#A9A9A9",
                          }}
                        >
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            {question.question}
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>{question.answer}</Typography>
                          </AccordionDetails>
                        </Accordion>
                      </Grid>
                    ))
                  ) : (
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
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default FAQ;
