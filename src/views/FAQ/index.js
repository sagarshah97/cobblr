import { useState } from "react";
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

const FAQ = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const categories = [
    {
      id: 1,
      name: "Delivery and dispatch",
      questions: [
        {
          id: 1.1,
          question: "How long it takes to deliver my shoes?",
          answer:
            "The estimated delivery takes around 4-5 business days. However it might take longer if the point of delivery is farther from the outlet. You can always check you estimated delivery date in your order details.",
        },
        {
          id: 1.2,
          question: "How will I know if my order has been dispatched?",
          answer:
            "The delivery service agency sends out notifications on your phone number provided during the billing process. You can check on your phone number for any messages and alerts from the delivery service.",
        },
      ],
    },
    {
      id: 2,
      name: "Returns",
      questions: [
        {
          id: 2.1,
          question: "Can I return my shoes?",
          answer:
            "Yes, you can initiate a return for your order if they do not fit the size or for any products that were damaged upon arrival. Make sure to initiate your return within 7 days upon receiving your order",
        },
        {
          id: 2.2,
          question: "When will I get my refund after returning the product?",
          answer:
            "Once the return has been initiated and picked by our service agent, the refund process would be initiated. It might take upto 5 business days for the refund to be processed back into your account.",
        },
      ],
    },
    {
      id: 3,
      name: "Exchanges",
      questions: [
        {
          id: 3.1,
          question: "Can I exchange my shoes?",
          answer:
            "Yes, we have a hassle-free return and exchange policy. You can initiate a return or exchange within 30 days of purchase.",
        },
        {
          id: 3.2,
          question: "How do I initiate a exchange?",
          answer:
            "Please contact our customer support team or visit our Returns and Exchanges page for detailed instructions.",
        },
      ],
    },
  ];

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
          //   height: "100vh",
          //   paddingTop: "64px",
          paddingBottom: "64px",
          //   backgroundColor: "#0f0f0f",
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
    </>
  );
};

export default FAQ;
