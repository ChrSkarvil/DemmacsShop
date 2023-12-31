import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

import "./AdminPanel.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [editingProductName, setEditingProductName] = useState("");
  const [editingManufacturerID, setEditingManufacturerID] = useState(0);
  const [editingCategoryID, setEditingCategoryID] = useState(0);

  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    ProductPrice: 0,
    Dimensions: "",
    Weight: "",
    Description: "",
    CategoryID: 0,
    ManufacturerID: 0,
    ImageFile: null,
  });
  const [selectedEditCategory, setSelectedEditCategory] = useState(null);
  const [selectedEditManufacturer, setSelectedEditManufacturer] =
    useState(null);

  useEffect(() => {
    fetchProducts();
    fetchManufacturerOptions();
    fetchCategoryOptions();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://demmacs:5001/api/Product");
      const productsData = response.data;
      setProducts(
        productsData.map((Product) => ({
          ProductID: Product.productID,
          ProductName: Product.productName,
          ProductPrice: Product.productPrice,
          Dimensions: Product.dimensions,
          Weight: Product.weight,
          CategoryName: Product.categoryName,
          ManufacturerName: Product.manufacturerName,
          Image: Product.image,
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("ProductName", newProduct.ProductName);
      formData.append("ProductPrice", newProduct.ProductPrice);
      formData.append("Dimensions", newProduct.Dimensions);
      formData.append("Weight", newProduct.Weight);
      formData.append("Description", newProduct.Description);
      formData.append("CategoryID", newProduct.CategoryID);
      formData.append("ManufacturerID", newProduct.ManufacturerID);
      formData.append("ImageFile", newProduct.ImageFile); // Append the image file

      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type
        },
      };
  
      const response = await axios.post(
        "http://demmacs:5001/api/Product",
        formData,
        config // Pass the config object with headers
      );
      console.log("Creating product with data:", newProduct);

      // Parse CategoryID and ManufacturerID as integers
      const categoryId = parseInt(newProduct.CategoryID, 10);
      const manufacturerId = parseInt(newProduct.ManufacturerID, 10);

      // Check if parsing is successful
      if (isNaN(categoryId) || isNaN(manufacturerId)) {
        alert("CategoryID and ManufacturerID must be valid numbers.");
        return;
      }

      // Clear the create form
      setNewProduct({
        ProductName: "",
        ProductPrice: 0,
        Dimensions: "",
        Weight: "",
        Description: "",
        CategoryID: 0,
        ManufacturerID: 0,
        Image: null,
      });



      console.log("Product created:", response.data);

      // Fetch updated products
      fetchProducts();

      // Show a success alert
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating Product:", error);

      // Show an error alert
      alert("Error creating Product. Please check your data and try again.");
    }
  };
  

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct({
          ...newProduct,
          Image: e.target.result,
          ImageFile: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderEditFields = (product) => {
    const isEditing = editingProductId === product.ProductID;
    return (
      <div>
        <div className={`card-content ${isEditing ? "is-extended" : ""}`}></div>
        <label>Name:</label>
        <input
          type="text"
          name="ProductName"
          value={newProduct.ProductName}
          onChange={(e) => handleInputChange(e, "ProductName")}
        />
        <label>Price:</label>
        <input
          type="number"
          name="ProductPrice"
          value={newProduct.ProductPrice}
          onChange={(e) => handleInputChange(e, "ProductPrice")}
        />
        <label>Dimensions:</label>
        <input
          type="text"
          name="Dimensions"
          value={newProduct.Dimensions}
          onChange={(e) => handleInputChange(e, "Dimensions")}
        />
        <label>Weight:</label>
        <input
          type="text"
          name="Weight"
          value={newProduct.Weight}
          onChange={(e) => handleInputChange(e, "Weight")}
        />
        <div className="form-group">
          <label>Description:</label>
          <textarea
            id="Description"
            className="form-control"
            placeholder="Product Description"
            value={newProduct.Description}
            onChange={(e) => handleInputChange(e, "Description")}
          />
        </div>
        <div className="col-md-6 mx-auto">
        <div className="form-group">
          <label htmlFor="Image">Image:</label>
          <input
            type="file"
            id="Image"
            name="ImageFile"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
        <div className="form-group">
          <label>Category:</label>
          <Select
            options={categoryOptions}
            value={selectedEditCategory}
            onChange={(selectedOption) =>
              handleDropdownChange(selectedOption, "CategoryID")
            }
          />
        </div>
        <div className="form-group">
          <label>Manufacturer:</label>
          <Select
            options={manufacturerOptions}
            value={selectedEditManufacturer}
            onChange={(selectedOption) =>
              handleDropdownChange(selectedOption, "ManufacturerID")
            }
          />
        </div>
      </div>
    );
  };

  const startEditing = (productId, productName, manufacturerId, categoryId) => {
    setEditingProductId(productId);
    setEditingProductName(productName);
    setEditingManufacturerID(manufacturerId);
    setEditingCategoryID(categoryId);
    // Load the current product's data into the newProduct state for editing
    const productToEdit = products.find(
      (product) => product.ProductID === productId
    );
    if (productToEdit) {
      setEditingProductName(productToEdit.ProductName);
      setEditingManufacturerID(productToEdit.ManufacturerID);
      setEditingCategoryID(productToEdit.CategoryID);
      setNewProduct({
        ProductName: productToEdit.ProductName,
        ProductPrice: productToEdit.ProductPrice,
        Dimensions: productToEdit.Dimensions,
        Weight: productToEdit.Weight,
        Description: productToEdit.Description,
        CategoryID: productToEdit.CategoryID,
        ManufacturerID: productToEdit.ManufacturerID,
      });
      setSelectedEditCategory(
        categoryOptions.find((option) => option.value === categoryId)
      );
      setSelectedEditManufacturer(
        manufacturerOptions.find((option) => option.value === manufacturerId)
      );
    }
  };

  const cancelEditing = () => {
    setEditingProductId(null);
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      const updateData = {
        CategoryID: parseInt(updatedData.CategoryID, 10),
        ManufacturerID: parseInt(updatedData.ManufacturerID, 10),
        ProductName: updatedData.ProductName,
        ProductPrice: updatedData.ProductPrice,
        Dimensions: updatedData.Dimensions,
        Weight: updatedData.Weight,
        Description: updatedData.Description,
        ImageFile: updatedData.ImageFile,
      };

      // Check if CategoryID and ManufacturerID are valid numbers
      if (isNaN(updateData.CategoryID) || isNaN(updateData.ManufacturerID)) {
        alert("CategoryID and ManufacturerID must be valid numbers.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type
        },
      };

      // Send the request to update the product
      const response = await axios.put(
        `http://demmacs:5001/api/Product/${productId}`,
        updateData,
        config
      );

      if (response.status === 200) {
        console.log("Product updated:", response.data);

        // Log the updated data in the console
        console.log("Updated Data:", updateData);

        // Show a success alert
        alert("Product successfully updated!");

        cancelEditing();
        fetchProducts();
      } else {
        console.error("Error updating Product:", response.statusText);

        // Show an error alert
        alert("Error updating Product. Please check your data and try again.");
      }
    } catch (error) {
      console.error("Error updating Product:", error);

      // Show an error alert
      alert("Error updating Product. Please check your data and try again.");
    }
  };

  const deleteProduct = async (productId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (shouldDelete) {
      try {
        await axios.delete(`http://demmacs:5001/api/Product/${productId}`);
        console.log("Product deleted:", productId);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting Product:", error);
      }
    }
  };

  const fetchManufacturerOptions = async () => {
    try {
      const response = await axios.get("http://demmacs:5001/api/Manufacturer");
      const manufacturerData = response.data;
      setManufacturerOptions(
        manufacturerData.map((manufacturer) => ({
          value: manufacturer.manufacturerId,
          label: manufacturer.manufacturerName,
        }))
      );
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const fetchCategoryOptions = async () => {
    try {
      const response = await axios.get("http://demmacs:5001/api/Category");
      const categoryData = response.data;
      setCategoryOptions(
        categoryData.map((category) => ({
          value: category.categoryID,
          label: category.categoryName,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDropdownChange = (selectedOption, field) => {
    if (field === "CategoryID") {
      setSelectedEditCategory(selectedOption);
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        CategoryID: selectedOption ? selectedOption.value : 0, // Use 0 if no option is selected
      }));
      setEditingCategoryID(selectedOption ? selectedOption.value : 0); // Update the editing category ID
    } else if (field === "ManufacturerID") {
      setSelectedEditManufacturer(selectedOption);
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        ManufacturerID: selectedOption ? selectedOption.value : 0, // Use 0 if no option is selected
      }));
      setEditingManufacturerID(selectedOption ? selectedOption.value : 0); // Update the editing manufacturer ID
    }
  };

  return (
    <div className="admin-panel">
      <h1 className="mb-4">Admin Panel</h1>
      <div className="create-product-form mx-auto text-center">
        <h2 className="mb-3">Create New Product</h2>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="form-group">
              <label htmlFor="ProductName">Name:</label>
              <input
                type="text"
                id="ProductName"
                className="form-control"
                placeholder="Product Name"
                value={newProduct.productName}
                onChange={(e) => handleInputChange(e, "ProductName")}
              />
            </div>
          </div>
          <div className="col-md-6 mx-auto">
            <div className="form-group">
              <label htmlFor="ProductPrice">Price $:</label>
              <input
                type="number"
                id="ProductPrice"
                className="form-control"
                placeholder="Product Price"
                value={newProduct.ProductPrice}
                onChange={(e) => handleInputChange(e, "ProductPrice")}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="form-group">
              <label htmlFor="Dimensions">Dimensions:</label>
              <input
                type="text"
                id="Dimensions"
                className="form-control"
                placeholder="Dimensions"
                value={newProduct.Dimensions}
                onChange={(e) => handleInputChange(e, "Dimensions")}
              />
            </div>
          </div>
          <div className="col-md-6 mx-auto">
            <div className="form-group">
              <label htmlFor="Weight">Weight:</label>
              <input
                type="text"
                id="Weight"
                className="form-control"
                placeholder="Weight"
                value={newProduct.Weight}
                onChange={(e) => handleInputChange(e, "Weight")}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mx-auto">
          <div className="form-group">
            <label htmlFor="Description">Description:</label>
            <textarea
              id="Description"
              className="form-control"
              placeholder="Product Description"
              value={newProduct.Description}
              onChange={(e) => handleInputChange(e, "Description")}
            />
          </div>
        </div>
        <div className="col-md-6 mx-auto">
          <div className="form-group">
            <label htmlFor="Image">Image:</label>
            <input
              type="file"
              id="Image"
              name="Image"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="form-group">
              <label htmlFor="CategoryID">Category:</label>
              <Select
                options={categoryOptions}
                value={selectedEditCategory}
                onChange={(selectedOption) =>
                  handleDropdownChange(selectedOption, "CategoryID")
                }
                getOptionValue={(option) => option.value}
                inputId="CategoryID"
              />
            </div>
          </div>
          <div className="col-md-6 mx-auto">
            <div className="form-group">
              <label htmlFor="ManufacturerID">Manufacturer:</label>
              <Select
                options={manufacturerOptions}
                value={selectedEditManufacturer}
                onChange={(selectedOption) =>
                  handleDropdownChange(selectedOption, "ManufacturerID")
                }
                getOptionValue={(option) => option.value}
                inputId="ManufacturerID"
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "transparent"
                      : provided.backgroundColor,
                    color: state.isSelected ? "black" : provided.color,
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "black",
                  }),
                }}
              />
            </div>
          </div>
        </div>
        <button onClick={createProduct} className="btn btn-primary">
          Create Product
        </button>
      </div>
      <div className="product-list">
        <h2 className="mb-4 text-center">Products</h2>
        <div className="card-container">
          {products.map((product) => (
            <div className="card mb-4" key={product.ProductID}>
              <img
                src={`data:image/jpeg;base64,${product.Image}`}
                alt={product.ProductName}
                className="card-image"
                style={{ width: "250px", height: "300px", objectFit: "cover" }}
              />
              <div className="card-content">
                {editingProductId === product.ProductID ? (
                  renderEditFields(product)
                ) : (
                  <div>
                    <h3 className="card-title">{product.ProductName}</h3>
                    <p className="card-price mb-2">$ {product.ProductPrice}</p>
                    <p>Dimensions: {product.Dimensions}</p>
                    <p>Weight: {product.Weight}</p>
                    <p>Category: {product.CategoryName}</p>
                    <p>Manufacturer: {product.ManufacturerName}</p>
                  </div>
                )}
              </div>
              <div className="card-actions mt-2">
                {editingProductId === product.ProductID ? (
                  <div>
                    <button
                      className="btn btn-success mr-2 mb-2 mx-1 update-button"
                      onClick={() =>
                        updateProduct(product.ProductID, newProduct)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger mb-2 delete-button"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-success mr-2 mb-2 mx-1 update-button"
                      onClick={() => startEditing(product.ProductID)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger mb-2 delete-button"
                      onClick={() => deleteProduct(product.ProductID)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;