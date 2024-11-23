import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { role } = useAuth();
  if (role != "ADMIN") {
    navigate("/");
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:2001/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category");
      }

      const data = await response.json();
      setSuccessMessage("Category added successfully!");
      setName("");
      setDescription("");
      navigate("/category-list");
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between">
        <button
          className="btn btn-danger"
          onClick={() => {
            navigate("/category-list");
          }}
        >
          <i className="fa fa-caret-square-o-left"></i>
        </button>
        <h2>Add New Category</h2>
      </div>
      {/* Success Message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows={4}
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
