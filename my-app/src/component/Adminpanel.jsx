import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    Description: "",
    ProductPrice: 0,
    Dimensions: "",
    Weight: "",
    CategoryID: 0,
    ManufacturerID: 0,
    Image: "",
  });
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchManufacturers();
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://demmacs:5001/api/Category");
      const categoriesData = response.data;
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get("http://demmacs:5001/api/Manufacturer");
      const manufacturersData = response.data;
      setManufacturers(manufacturersData);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const createProduct = async () => {
    try {
      // Clear the create form
      setNewProduct({
        ProductName: "",
        Description: "",
        ProductPrice: 0,
        Dimensions: "",
        Weight: "",
        CategoryID: 0,
        ManufacturerID: 0,
        Image: "",
      });

      const response = await axios.post(
        "http://demmacs:5001/api/Product",
        newProduct
      );
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
    setNewProduct({ ...newProduct, [field]: value });
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
        <label>Category:</label>
        <select
          name="CategoryID"
          value={newProduct.CategoryID}
          onChange={(e) => handleInputChange(e, "CategoryID")}
        >
          <option value={0}>Select a Category</option>
          {categories.map((category) => (
            <option key={category.CategoryID} value={category.CategoryID}>
              {category.CategoryName}
            </option>
          ))}
        </select>
        <label>Manufacturer:</label>
        <select
          name="ManufacturerID"
          value={newProduct.ManufacturerID}
          onChange={(e) => handleInputChange(e, "ManufacturerID")}
        >
          <option value={0}>Select a Manufacturer</option>
          {manufacturers.map((manufacturer) => (
            <option
              key={manufacturer.ManufacturerID}
              value={manufacturer.ManufacturerID}
            >
              {manufacturer.ManufacturerName}
            </option>
          ))}
        </select>
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
      setNewProduct({ ...productToEdit });
    }
  };

  const cancelEditing = () => {
    setEditingProductId(null);
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      const response = await axios.put(
        `http://demmacs:5001/api/Product/${productId}`,
        updatedData
      );
      console.log("Product updated:", response.data);

      cancelEditing();
      fetchProducts();
    } catch (error) {
      console.error("Error updating Product:", error);
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
      <div className="create-product-form mb-4 mx-auto">
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
              <label htmlFor="ProductPrice">Price:</label>
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
              <label htmlFor="CategoryID">Category:</label>
              <select
                id="CategoryID"
                className="form-control"
                value={newProduct.CategoryID}
                onChange={(e) => handleInputChange(e, "CategoryID")}
              >
                <option value={0}>Select a Category</option>
                {categories.map((category) => (
                  <option key={category.CategoryID} value={category.CategoryID}>
                    {category.CategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="ManufacturerID">Manufacturer:</label>
              <select
                id="ManufacturerID"
                className="form-control"
                value={newProduct.ManufacturerID}
                onChange={(e) => handleInputChange(e, "ManufacturerID")}
              >
                <option value={0}>Select a Manufacturer</option>
                {manufacturers.map((manufacturer) => (
                  <option
                    key={manufacturer.ManufacturerID}
                    value={manufacturer.ManufacturerID}
                  >
                    {manufacturer.ManufacturerName}
                  </option>
                ))}
              </select>
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
