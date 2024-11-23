import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image: string;
  category: { _id: string; name: string }; // Category field
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { role } = useAuth();
  if (role != "ADMIN") {
    navigate("/");
  }
  const fetchProducts = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:2001/product/all");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const response = await fetch(`http://localhost:2001/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        alert("Product deleted successfully!");
      } else {
        alert("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Something went wrong while deleting the product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="mb-4">Product List</h2>
        <button
          onClick={() => {
            navigate("/add-product");
          }}
          className="btn btn-success"
        >
          +Add
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      {/* Loading Spinner */}
      {loading && <div className="spinner-border" role="status"></div>}

      {/* Product Table */}
      {!loading && !errorMessage && (
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="img-thumbnail"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{product.category?.name || "Uncategorized"}</td>{" "}
                  {/* Category column */}
                  <td>
                    <button
                      className="btn btn-warning btn-sm mx-1"
                      onClick={() => navigate(`/product-edit/${product._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm mx-1"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
