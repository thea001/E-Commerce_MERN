import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // State to store category data
  const [loading, setLoading] = useState(true); // State to show loading spinner
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const navigate = useNavigate();
  const { role } = useAuth();
  if (role != "ADMIN") {
    navigate("/");
  }
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:2001/categories/all"); // Replace with your backend URL
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data); // Update categories state with fetched data
    } catch (err: any) {
      setError(err.message); // Set error message in case of failure
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  const handleEdit = (id: string) => {
    console.log("Edit category with ID:", id);
    // Add your edit logic here
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:2001/categories/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Category deleted successfully!");
        fetchCategories();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete the category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Something went wrong while deleting the category.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-4">Category List</h2>
        <button
          onClick={() => {
            navigate("/add-category");
          }}
          className="btn btn-success"
        >
          +Add
        </button>
      </div>
      {/* Show loading spinner while data is being fetched */}
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Show error message if data fetching fails */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Render table only when data is available */}
      {!loading && !error && (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: any, index: number) => (
              <tr key={category.id}>
                <td>{index + 1}</td>
                <td>{category.name}</td>
                <td className="w-75">{category.description}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(category.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show message when no categories are available */}
      {!loading && categories.length === 0 && (
        <div className="alert alert-info text-center">
          No categories available. Add some categories to see them here.
        </div>
      )}
    </div>
  );
};

export default CategoryList;
