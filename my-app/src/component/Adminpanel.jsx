import React, { useState, useEffect } from "react";
import { variables } from './../Variables'

import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(variables.PRODUCT_API_URL);
      const productsData = response.data;
      setProducts(
        productsData.map((Product) => ({
          ProductID: Product.ProductID,
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
      const response = await axios.post(
        variables.PRODUCT_API_URL,
        newProduct
      );
      console.log("Product created:", response.data);

      // Clear the form and fetch updated products
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
      fetchProducts();

      // Show a success alert
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating Product:", error);

      // Show an error alert
      alert("Error creating Product. Please check your data and try again.");
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const updateProduct = async (ProductID, updatedData) => {
    try {
      const response = await axios.put(
        `${variables.PRODUCT_API_URL}/${ProductID}`,
        updatedData
      );
      console.log("Product updated:", response.data);

      fetchProducts();
    } catch (error) {
      console.error("Error updating Product:", error);
    }
  };

  const deleteProduct = async (ProductID) => {
    try {
      await axios.delete(`${variables.PRODUCT_API_URL}/${ProductID}`);
      console.log("Product deleted:", ProductID);

      fetchProducts();
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h1 className="mb-4">Admin Panel</h1>
      <div className="create-Product-form mb-4 text-center">
        <h2 className="mb-3">Create New Product</h2>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            placeholder="Product Name"
            value={newProduct.ProductName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, ProductName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price</label>
          <input
            type="number"
            id="productPrice"
            className="form-control"
            placeholder="Product Price"
            value={newProduct.ProductPrice}
            onChange={(e) =>
              setNewProduct({ ...newProduct, ProductPrice: e.target.value })
            }
          />
        </div>
        <button onClick={createProduct} className="btn btn-primary">
          Create Product
        </button>
      </div>

      <div className="Product-list">
        <h2 className="mb-4 text-center">Products</h2>
        <div className="card-container">
          {products.map((Product) => (
            <div className="card mb-4" style={{padding: "5px"}} key={Product.ProductID}>
              <img
                src={`data:image/jpeg;base64,${Product.ProductImage}`} // Convert binary to Base64
                alt={Product.ProductName}
                className="card-image"
                style={{ width: '250px', height: '300px', objectFit: 'cover' }}
              />
              <div className="card-content">
                <h3 className="card-title">{Product.ProductName}</h3>
                <p className="card-price mb-2 ">$ {Product.ProductPrice}</p>
                <p>Dimensions: {Product.Dimensions}</p>
                <p>Weight: {Product.Weight}</p>
                <p>Category: {Product.CategoryName}</p>
                <p>Manufacturer: {Product.ManufacturerName}</p>
              </div>
              <div className="card-actions mt-2">
                <button
                  className="btn btn-success mr-2 mb-2"
                  onClick={() =>
                    updateProduct(Product.ProductID, {
                      ProductName: "Updated Name",
                    })
                  }
                >
                  Update
                </button>
                <button
                  className="btn btn-danger mr-2 mb-2 mx-1"
                  onClick={() => deleteProduct(Product.ProductID)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
