import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useAuth();
  if (role != "ADMIN") {
    navigate("/");
  }
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    stock: 0,
    image: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch the product by ID
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:2001/product/byId/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      setProduct(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Fetch the list of categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:2001/categories/all");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:2001/product/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      if (!response.ok) throw new Error("Failed to update product");

      alert("Product updated successfully!");
      navigate("/product-list");
    } catch (error) {
      console.error(error);
      alert("Failed to update product. Please try again.");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Product</h2>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {loading && <div className="spinner-border" role="status"></div>}

      {!loading && !errorMessage && (
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              className="form-control"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={product.image}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/product-list")}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
