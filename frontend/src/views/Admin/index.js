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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../utils/Loader";
import ImageModal from "./ImageModal";
import AvailableQuantitiesModal from "./AvailableQuantitiesModal";

const AdminPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [shoeList, setShoeList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [openAvailableQuantitiesModal, setOpenAvailableQuantitiesModal] =
    useState(false);
  const [availableQuantities, setAvailableQuantities] = useState([]);
  const [productForm, setProductForm] = useState({
    code: "",
    name: "",
    subText: "",
    shortDescription: "",
    price: "",
    color: "",
    briefDescription: "",
    brand: "",
    tags: "",
    category: "",
    gender: "",
    type: "",
    material: "",
    availability: "",
  });

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

  useEffect(() => {
    handleSearch();
  }, []);

  const handleAddProduct = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
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
        const base64Data = reader.result;
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

  const handleAddProductSubmit = () => {
    const productData = {
      ...productForm,
      images: uploadedImages,
      availableQuantity: availableQuantities,
    };

    // Make the POST call to add the product
    axios
      .post("/admin/addShoe", productData)
      .then((response) => {
        // Handle the success response, such as displaying a success message
        console.log("Product added successfully:", response.data);
        // Close the add modal
        handleCloseAddModal();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        // Handle the error, such as displaying an error message
      });
  };

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
        />
        <Button
          variant="contained"
          sx={{ marginLeft: "10px", height: "100%" }}
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
        <Button
          variant="contained"
          sx={{ marginLeft: "10px", height: "100%" }}
          color="primary"
          onClick={handleAddProduct}
        >
          Add Product
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
                    // onClick={() => handleEditShoe(shoe._id)}
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

      <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Code"
            variant="outlined"
            fullWidth
            name="code"
            value={productForm.code}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            value={productForm.name}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Subtext"
            variant="outlined"
            fullWidth
            name="subText"
            value={productForm.subText}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Short Description"
            variant="outlined"
            fullWidth
            name="shortDescription"
            value={productForm.shortDescription}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            name="price"
            value={productForm.price}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Color"
            variant="outlined"
            fullWidth
            name="color"
            value={productForm.color}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Brief Description"
            variant="outlined"
            fullWidth
            name="briefDescription"
            value={productForm.briefDescription}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Brand"
            variant="outlined"
            fullWidth
            name="brand"
            value={productForm.brand}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Tags"
            variant="outlined"
            fullWidth
            name="tags"
            value={productForm.tags}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            name="category"
            value={productForm.category}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            name="gender"
            value={productForm.gender}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            name="type"
            value={productForm.type}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Material"
            variant="outlined"
            fullWidth
            name="material"
            value={productForm.material}
            onChange={handleProductFormChange}
          />
          <TextField
            label="Availability"
            variant="outlined"
            fullWidth
            name="availability"
            value={productForm.availability}
            onChange={handleProductFormChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddImages}>
            Add Images
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAvailableQuantities}
          >
            Add Available Quantities
          </Button>
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
            onClick={handleAddProductSubmit}
          >
            Add
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
        handleAddQuantity={handleAddQuantity}
      />
      {loader && <Loader color={"black"} />}
    </div>
  );
};

export default AdminPage;
