import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Grid,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormControl,
  Select,
  Chip,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../utils/Loader";
import ImageModal from "./ImageModal";
import AvailableQuantitiesModal from "./AvailableQuantitiesModal";
import { Alerts } from "../../utils/Alert";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const decodeJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
const AdminPage = () => {
  let navigate = useNavigate();

  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [shoeList, setShoeList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [openAvailableQuantitiesModal, setOpenAvailableQuantitiesModal] =
    useState(false);

  const initialProductForm = {
    _id: null,
    code: "",
    name: "",
    subText: "",
    shortDescription: "",
    price: "",
    color: "",
    briefDescription: "",
    brand: "",
    tags: [],
    category: "",
    gender: "",
    type: "",
    material: "",
    availability: "",
  };
  const [productForm, setProductForm] = useState(initialProductForm);
  const initialQuantities = [
    {
      size: "US W 5 / M 3.5",
      quantity: 0,
    },
    {
      size: "US W 5.5 / M 4",
      quantity: 0,
    },
    {
      size: "US W 6 / M 4.5",
      quantity: 0,
    },
    {
      size: "US W 6.5 / M 5",
      quantity: 0,
    },
    {
      size: "US W 7 / M 5.5",
      quantity: 0,
    },
    {
      size: "US W 8.5 / M 7",
      quantity: 0,
    },
    {
      size: "US W 9 / M 7.5",
      quantity: 0,
    },
    {
      size: "US W 9.5 / M 8",
      quantity: 0,
    },
    {
      size: "US W 10 / M 8.5",
      quantity: 0,
    },
    {
      size: "US W 10.5 / M 9",
      quantity: 0,
    },
    {
      size: "US W 11 / M 9.5",
      quantity: 0,
    },
    {
      size: "US W 11.5 / M 10",
      quantity: 0,
    },
    {
      size: "US W 12 / M 10.5",
      quantity: 0,
    },
  ];
  const [availableQuantities, setAvailableQuantities] =
    useState(initialQuantities);
  // Alert Start
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const alertObj = {
    alertMessage: alertMessage,
    alertType: alertType,
  };
  const [snackbar, setSnackbar] = React.useState(false);
  const snackbarOpen = () => {
    setSnackbar(true);
  };
  const snackbarClose = () => {
    setSnackbar(false);
  };
  // Alert End
  const availabilitySelect = [
    { text: "No", value: false },
    { text: "Yes", value: true },
  ];
  const genderSelect = ["Male", "Female", "Unisex"];
  const typeSelect = ["Casual", "Running", "Comfy", "Lifestyle", "Formal"];
  const categorySelect = [
    "Sneakers",
    "Loafers",
    "Casual",
    "Running",
    "Comfy",
    "Lifestyle",
    "Formal",
  ];
  const tagsSelect = ["Casual", "Running", "Comfy"];

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductForm((prevForm) => ({
      ...prevForm,
      ["tags"]: value,
    }));
  };

  const handleSearch = () => {
    setLoader(true);
    axios
      .post("/admin/getshoelist", { value: searchValue })
      .then((response) => {
        setShoeList(response.data);
        setTimeout(() => {
          setLoader(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoader(false);
      });
  };

  const handleAddProduct = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setProductForm(initialProductForm);
    setAvailableQuantities([]);
    setUploadedImages([]);
  };

  const handleAddImages = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        setUploadedImages([
          ...uploadedImages,
          { name: file.name, data: base64Data },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAvailableQuantities = () => {
    setOpenAvailableQuantitiesModal(true);
  };

  const handleCloseAvailableQuantitiesModal = () => {
    setOpenAvailableQuantitiesModal(false);
  };

  const handleAddQuantity = (size, quantity) => {
    setAvailableQuantities([...availableQuantities, { size, quantity }]);
  };

  const handleProductFormChange = (event) => {
    const { name, value } = event.target;
    setProductForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const splitCamelCaseAndCapitalize = (input) => {
    const parts = input.split(/(?=[A-Z])/);
    const capitalizedParts = parts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    );
    const result = capitalizedParts.join(" ");
    return result;
  };

  const findInvalidKey = (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        if (key !== "_id") {
          return splitCamelCaseAndCapitalize(key);
        }
      }
    }
    return null;
  };

  const handleAddEditProductSubmit = () => {
    setLoader(true);
    const res = findInvalidKey({ ...productForm, images: uploadedImages });
    if (res != null) {
      setLoader(false);
      setAlertMessage("Please enter '" + res + "'");
      setAlertType("error");
      snackbarOpen();
      return;
    }
    const productData = {
      ...productForm,
      images: uploadedImages,
      availableQuantity: availableQuantities,
    };
    let url = "";
    if (productData._id) {
      url = "modifyShoe";
    } else {
      url = "addShoe";
    }

    axios
      .post("/admin/" + url, productData)
      .then((response) => {
        handleCloseAddModal();
        setLoader(false);
        const msg =
          "Product " +
          (productData._id ? "updated" : "added") +
          " successfully";
        setAlertMessage(msg);
        setAlertType("success");
        snackbarOpen();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const getShoe = (shoeId) => {
    setLoader(true);
    axios
      .post(`/shoes/getShoe`, {
        _id: shoeId,
      })
      .then((resp) => {
        if (resp.status === 200) {
          setProductForm(resp.data);
          setUploadedImages(resp.data?.images);
          setAvailableQuantities(resp.data?.availableQuantity);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.message);
        console.log(error.response);
        setLoader(false);
      });
  };

  const showEditModal = (shoeId) => {
    getShoe(shoeId);
    setOpenAddModal(true);
  };

  const DisplayText = () => {
    return <>{productForm?._id ? "Edit " : "Add "}</>;
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const tokenObject = decodeJwt(token);
      if (tokenObject && tokenObject?.role !== "Admin") {
        window.sessionStorage.clear();
        navigate("/login");
      }
    } else {
      window.sessionStorage.clear();
      navigate("/login");
    }

    handleSearch();
  }, []);
  return (
    <div
      style={{
        color: "#000",
        minHeight: "100vH",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        style={{ maxWidth: "75%", margin: "0 auto" }}
        sx={{ paddingTop: "30px" }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchValue}
          fullWidth
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          sx={{ marginLeft: "10px", height: "56px" }}
          color="primary"
          onClick={handleAddProduct}
        >
          Add Shoe
        </Button>
      </Stack>

      <TableContainer
        component={Paper}
        style={{ maxWidth: "75%", margin: "0 auto", marginTop: "30px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shoeList.map((shoe) => (
              <TableRow key={shoe._id} hover={true}>
                <TableCell>{shoe.code}</TableCell>
                <TableCell>{shoe.name}</TableCell>
                <TableCell>{shoe.brand}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => showEditModal(shoe._id)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddModal} onClose={handleCloseAddModal} maxWidth={"xl"}>
        <DialogTitle sx={{ borderBottom: "2px" }}>
          <DisplayText /> Shoe
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ paddingTop: "10px" }}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                label="Code"
                variant="outlined"
                fullWidth
                name="code"
                value={productForm.code}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={productForm.name}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Subtext"
                variant="outlined"
                fullWidth
                name="subText"
                value={productForm.subText}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                fullWidth
                name="price"
                value={productForm.price}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Material"
                variant="outlined"
                fullWidth
                name="material"
                value={productForm.material}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Short Description"
                variant="outlined"
                fullWidth
                name="shortDescription"
                value={productForm.shortDescription}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Color"
                variant="outlined"
                fullWidth
                name="color"
                value={productForm.color}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Brand"
                variant="outlined"
                fullWidth
                name="brand"
                value={productForm.brand}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <FormControl sx={{ marginBottom: "16px" }} fullWidth>
                <InputLabel id="tags-label">Tags</InputLabel>
                <Select
                  labelId="tags-label"
                  id="tags-multiple-chip"
                  multiple
                  value={productForm.tags}
                  onChange={handleTagChange}
                  input={<OutlinedInput id="tags-multiple-chip" label="Tags" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip size={"small"} key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {tagsSelect.map((value) => (
                    <MenuItem
                      key={value}
                      value={value}
                      style={getStyles(value, productForm.tags, theme)}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                name="gender"
                value={productForm.gender}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
                select
              >
                {genderSelect.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                name="category"
                value={productForm.category}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
                select
              >
                {categorySelect.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                name="type"
                value={productForm.type}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
                select
              >
                {typeSelect.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Availability"
                variant="outlined"
                fullWidth
                name="availability"
                value={productForm.availability}
                onChange={handleProductFormChange}
                sx={{ marginBottom: "16px" }}
                select
              >
                {availabilitySelect.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Brief Description"
                variant="outlined"
                fullWidth
                name="briefDescription"
                value={productForm.briefDescription}
                onChange={handleProductFormChange}
                multiline
                maxRows={4}
                rows={4}
                sx={{ marginBottom: "16px" }}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddImages}
                sx={{ marginBottom: "16px", marginRight: "10px" }}
              >
                <DisplayText /> Images
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddAvailableQuantities}
                sx={{ marginBottom: "16px" }}
              >
                <DisplayText /> Available Quantities
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseAddModal}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEditProductSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ImageModal
        open={openImageModal}
        handleClose={handleCloseImageModal}
        uploadedImages={uploadedImages}
        handleImageUpload={handleImageUpload}
        setUploadedImages={setUploadedImages}
      />
      <AvailableQuantitiesModal
        open={openAvailableQuantitiesModal}
        handleClose={handleCloseAvailableQuantitiesModal}
        availableQuantities={availableQuantities}
        setAvailableQuantities={setAvailableQuantities}
      />
      {loader && <Loader color={"black"} />}
      {snackbar && (
        <Alerts
          alertObj={alertObj}
          snackbar={snackbar}
          snackbarClose={snackbarClose}
        />
      )}
    </div>
  );
};

export default AdminPage;
