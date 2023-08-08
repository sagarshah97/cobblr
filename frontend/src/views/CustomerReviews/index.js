import React, { useState, useEffect } from "react";
import { Button, Grid, Typography, Modal, Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";

const CustomerReviews = () => {
  const [shoes, setShoes] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [selectedRating, setSelectedRating] = useState(5);
  const [feedback, setFeedback] = useState(""); // State for feedback

  useEffect(() => {
    // Fetch all shoes from the API

    // Fetch reviews for the logged-in user from the API using their user ID

    fetchAllShoes();
    fetchReviewsByLoggedInUser();
  }, []);
  const fetchAllShoes = async () => {
    try {
      const response = await axios.get(`/shoes/getShoes`);

      setShoes(response.data);
    } catch (error) {
      console.log("Error fetching shoes:", error);
    }
  };
  const fetchReviewsByLoggedInUser = async () => {
    try {
      const response = await axios.post(`/reviews/getReviewsByUserId`, {
        postedBy: window.sessionStorage.getItem("userId"),
      });
      console.log(response.data);
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReviewSubmit = async () => {
    try {
      const response = await axios.post("/reviews/addReview", {
        shoeId: selectedShoe._id,
        rating: selectedRating,
        comment: feedback,
        postedBy: window.sessionStorage.getItem("userId"),
      });
      console.log("Review added successfully:", response.data);
      setOpenModal(false);
      fetchAllShoes();
      fetchReviewsByLoggedInUser();
    } catch (error) {
      console.log("Error adding review:", error);
    }
  };

  // Function to edit an existing review
  const handleEditReviewSubmit = async () => {
    try {
      console.log(
        selectedRating + " ***" + feedback + "###" + selectedShoe._id
      );
      const reviewIdResponse = await axios.post(
        `/reviews/getReviewIdByShoeId`,
        {
          shoeId: selectedShoe._id,
        }
      );
      console.log(reviewIdResponse.data.reviewId);
      if (reviewIdResponse) {
        const response = await axios.post(
          `/reviews/updateReview/${reviewIdResponse.data.reviewId}`,
          {
            rating: selectedRating,
            comment: feedback,
          }
        );
        console.log("Review updated successfully:", response.data);
        setOpenModal(false); // Close the modal after submitting the review
        fetchAllShoes();
        fetchReviewsByLoggedInUser();
      } else {
        console.log("Review ID not found for the selected shoe.");
      }
    } catch (error) {
      console.log("Error updating review:", error);
    }
  };

  const handleAddReview = (shoe) => {
    setSelectedShoe(shoe);
    setOpenModal(true);
    // Prepopulate the review form with existing review data if available
    const existingReview = reviews.find((review) => review.shoeId === shoe.id);
    if (existingReview) {
      setSelectedRating(existingReview.rating);
      setFeedback(existingReview.comment);
    } else {
      // If there is no existing review, reset the fields
      setSelectedRating(5);
      setFeedback("");
    }
  };

  const handleEditReview = (shoe, review) => {
    setSelectedShoe(shoe);
    setOpenModal(true);
    // Prepopulate the review form with existing review data
    setSelectedRating(review.rating);
    setFeedback(review.comment);
  };

  const handleModalClose = () => {
    setSelectedShoe(null);
    setOpenModal(false);
  };

  const handleModalButtonClick = (value) => {
    console.log("Button Clicked:", value);
    // Perform the necessary actions based on the button clicked
    if (value === "Submit" && selectedShoe) {
      if (reviews.some((review) => review.shoeId === selectedShoe._id)) {
        // If an existing review is found, edit the review
        handleEditReviewSubmit();
      } else {
        // If no existing review is found, add a new review
        handleAddReviewSubmit();
      }
    } else {
      // Handle other button clicks here (if needed)
      setOpenModal(false); // Close the modal without performing any action
    }
  };

  const handleModalCancelButtonClick = (value) => {
    // Handle button click from the modal
    console.log("Button Clicked:", value);
    setOpenModal(false); // Close the modal without performing any action
  };
  return (
    <div style={{ marginTop: "30px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Order History
      </Typography>
      <Grid container spacing={2}>
        {shoes.map((shoe) => (
          <Grid item xs={12} key={shoe._id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "black",
                border: "1px solid white",
                color: "white",
                p: 2,
                borderRadius: 4,
              }}
            >
              <div>
                <Typography variant="h6">{shoe.name}</Typography>
                <Typography>Price: {shoe.price}</Typography>
                <Typography>Brand: {shoe.brand}</Typography>
              </div>
              {reviews.some((review) => review.shoeId === shoe._id) ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleEditReview(
                      shoe,
                      reviews.find((review) => review.shoeId === shoe._id)
                    )
                  }
                >
                  Edit Review
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddReview(shoe)}
                >
                  Add Review
                </Button>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Modal for adding or editing a review */}
      {selectedShoe && (
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "black", // Background color set to black
              border: "1px solid white", // White border
              color: "white", // White text color
              boxShadow: 24,
              p: 4,
              outline: "none",
              width: "80%", // Increase the width
              height: "40%", // Increase the height
              maxWidth: "600px",
              borderRadius: 4, // Adding border radius to the modal
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" component="h2">
              Rating:{" "}
              <Rating
                value={selectedRating}
                onChange={(event, newValue) => setSelectedRating(newValue)}
                emptyIcon={
                  <StarIcon
                    sx={{
                      color: "rgba(255, 255, 255, 0.3)", // Empty stars color
                    }}
                  />
                }
              />
              {/* Replace 3 with actual rating value */}
            </Typography>
            <Typography variant="h6" component="h2" mt={2}>
              Feedback:{" "}
            </Typography>
            {/* Add your form fields for feedback here */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={{
                marginBottom: "10px",
                resize: "none",
                //rows: 6,
                //cols: 50,
              }}
              rows={10}
            />
            {/* <Typography>Posted By: </Typography>
           
            <input type="text" style={{ marginBottom: "10px" }} />
            */}
            {/* Add your form buttons here */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleModalButtonClick("Submit")}
                style={{ marginRight: "10px" }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleModalCancelButtonClick("Cancel")}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CustomerReviews;
