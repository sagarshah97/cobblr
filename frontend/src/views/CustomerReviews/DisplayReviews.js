//Author: Jayant Patidar

import React, { useEffect, useState } from "react";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  Rating,
  Modal,
  Box,
  IconButton,
} from "@mui/material";

import "./reviews.css";

const DisplayReview = ({ shoeId }) => {
  const [reviews, setReviews] = useState([]);
  const [userDisplayNames, setUserDisplayNames] = useState({});
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [shoeId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.post("/reviews/getReviewsByShoeId", {
        shoeId,
      });

      if (Array.isArray(response.data)) {
        setReviews(response.data);
        fetchUserDisplayNames(response.data);
      } else {
        console.log("Error fetching reviews:", response.status);
      }
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.post(`/users/getUserByUserId`, {
        userId,
      });

      if (response.data) {
        const user = await response.data;
        return `${user.firstName} ${user.lastName}`;
      }
      throw new Error("Error fetching user details");
    } catch (error) {
      console.log("Error fetching user details:", error);
      return "Unknown User";
    }
  };

  const fetchUserDisplayNames = async (reviewsData) => {
    const userDisplayNamesMap = {};
    for (const review of reviewsData) {
      const displayName = await fetchUserDetails(review.postedBy);
      userDisplayNamesMap[review.postedBy] = displayName.substring(0, 20);
    }
    setUserDisplayNames(userDisplayNamesMap);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCardClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Box id="review-container">
      <div id="review-cards-container">
        {Array.isArray(reviews) &&
          reviews.map((review) => (
            <div className="review-card" key={review._id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  width: 300,
                  cursor: "pointer",
                  bgcolor: "#000000",
                  border: "1px solid white",
                  color: "white",
                  borderRadius: "15px",
                  "&:hover": {
                    border: "1px solid white",
                  },
                  marginBottom: "20px",
                }}
                onClick={() => handleCardClick(review)}
              >
                <CardContent>
                  <Typography variant="subtitle1" component="div">
                    <Rating
                      value={review.rating}
                      readOnly
                      emptyIcon={
                        <StarIcon
                          sx={{
                            color: "rgba(255, 255, 255, 0.3)",
                          }}
                        />
                      }
                    />
                  </Typography>
                  <Typography variant="body1" component="div" noWrap>
                    {`${review.comment.substring(0, 50)}`}
                  </Typography>
                  <Typography variant="body2" component="div" noWrap>
                    Posted By: {userDisplayNames[review.postedBy]}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
      </div>
      {selectedReview && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "black",
              border: "1px solid white",
              color: "white",
              boxShadow: 24,
              p: 4,
              outline: "none",
              maxWidth: "600px",
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Rating: <Rating value={selectedReview.rating} readOnly />
            </Typography>
            <Typography mt={2}>Feedback: {selectedReview.comment}</Typography>
            <Typography mt={2}>
              Posted By: {userDisplayNames[selectedReview.postedBy]}
            </Typography>
            <Typography variant="body2" component="div" noWrap>
              Posted on:{" "}
              {selectedReview.updatedAt
                ? new Date(selectedReview.updatedAt).toLocaleDateString()
                : selectedReview.updatedAt}
            </Typography>
          </Box>
        </Modal>
      )}
    </Box>
  );
};

export default DisplayReview;
