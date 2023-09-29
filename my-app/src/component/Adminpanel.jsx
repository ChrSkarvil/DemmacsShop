import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    ProductPrice: 0,
    Dimensions: "",
    Weight: "",
    CategoryID: 0,
    ManufacturerID: 0,
  });

  useEffect(() => {
    fetchProducts();
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
          ProductImage: Product.image,
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const createProduct = async () => {
    try {
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
        CategoryID: 0,
        ManufacturerID: 0,
      });

      // Send the request with the parsed IDs
      const response = await axios.post("http://demmacs:5001/api/Product", {
        ...newProduct,
        CategoryID: categoryId, // Use the parsed value
        ManufacturerID: manufacturerId, // Use the parsed value
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
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      // Read the selected file as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProduct({ ...newProduct, ProductImage: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const renderEditFields = (product) => {
    return (
      <div>
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
        <label>Category ID:</label>
        <input
          type="number"
          name="CategoryID"
          value={newProduct.CategoryID}
          onChange={(e) => handleInputChange(e, "CategoryID")}
        />
        <label>Manufacturer ID:</label>
        <input
          type="number"
          name="ManufacturerID"
          value={newProduct.ManufacturerID}
          onChange={(e) => handleInputChange(e, "ManufacturerID")}
        />
      </div>
    );
  };

  const startEditing = (productId) => {
    setEditingProductId(productId);
    // Load the current product's data into the newProduct state for editing
    const productToEdit = products.find(
      (product) => product.ProductID === productId
    );
    if (productToEdit) {
      setNewProduct({
        ProductName: "", // Clear the ProductName
        ProductPrice: productToEdit.ProductPrice,
        Dimensions: productToEdit.Dimensions,
        Weight: productToEdit.Weight,
        CategoryID: 0, // Clear the CategoryID
        ManufacturerID: 0, // Clear the ManufacturerID
      });
    }
  };

  const cancelEditing = () => {
    setEditingProductId(null);
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      // Create an object to hold the data you want to update
      const updateData = {
        CategoryID: parseInt(updatedData.CategoryID, 10), // Ensure it's a number
        ManufacturerID: parseInt(updatedData.ManufacturerID, 10), // Ensure it's a number
        ProductName: updatedData.ProductName, // Include the ProductName
        ProductPrice: updatedData.ProductPrice,
        Dimensions: updatedData.Dimensions,
        Weight: updatedData.Weight,
      };
  
      // Check if CategoryID and ManufacturerID are valid numbers
      if (isNaN(updateData.CategoryID) || isNaN(updateData.ManufacturerID)) {
        alert("CategoryID and ManufacturerID must be valid numbers.");
        return;
      }
  
      // Send the request to update the product
      const response = await axios.put(
        `http://demmacs:5001/api/Product/${productId}`,
        updateData
      );
  
      if (response.status === 200) {
        console.log("Product updated:", response.data);
  
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

  return (
    <div className="admin-panel">
      <h1 className="mb-4">Admin Panel</h1>
      <div className="create-product-form mb-4 mx-auto text-center">
        <h2 className="mb-3">Create New Product</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="ProductName">Name:</label>
              <input
                type="text"
                id="ProductName"
                className="form-control"
                placeholder="Product Name"
                value={newProduct.ProductName}
                onChange={(e) => handleInputChange(e, "ProductName")}
              />
            </div>
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6">
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
          <div className="col-md-6">
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

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="CategoryID">Category ID:</label>
              <input
                type="number"
                id="CategoryID"
                className="form-control"
                placeholder="Category ID"
                value={newProduct.CategoryID}
                onChange={(e) => handleInputChange(e, "CategoryID")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="ManufacturerID">Manufacturer ID:</label>
              <input
                type="number"
                id="ManufacturerID"
                className="form-control"
                placeholder="Manufacturer ID"
                value={newProduct.ManufacturerID}
                onChange={(e) => handleInputChange(e, "ManufacturerID")}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="ProductImage">Image:</label>
            <input
              type="file"
              id="ProductImage"
              className="form-control-file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
            />
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
            <div
              className="card mb-4"
              style={{ padding: "5px" }}
              key={product.ProductID}
            >
              <img
                src={`data:image/jpeg;base64,${product.ProductImage}`}
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
                      className="btn btn-success mr-2 mb-2 mx-1"
                      onClick={() =>
                        updateProduct(product.ProductID, newProduct)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger mb-2"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="btn btn-success mr-2 mb-2 mx-1"
                      onClick={() => startEditing(product.ProductID)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger mb-2"
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
