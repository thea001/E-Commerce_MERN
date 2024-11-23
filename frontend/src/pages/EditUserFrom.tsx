import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";

const EditUserForm = ({ token = useAuth() }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setFormData] = useState<any>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/byId/${id}`, {
          method: "GET", // Use "GET" for fetching all users
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        setFormData(data[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      console.log(user);
      delete user._id;
      const response = await fetch(`${BASE_URL}/user/update/${id}`, {
        body: JSON.stringify(user),
        method: "POST", // Use "GET" for fetching all users
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setFormData(data);
      navigate("/users-list");
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...user, [name]: value });
  };
  return (
    <div className="card col-8 m-auto my-5" tabIndex={-1} role="dialog">
      <div className="card-header">
        <h1 className="card-title">Edit User</h1>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="input"
              id="firstName"
              name="firstName"
              value={user?.firstName}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              onChange={handleChange}
              type="text"
              className="input"
              id="lastName"
              name="lastName"
              value={user?.lastName}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              className="input"
              id="email"
              name="email"
              value={user?.email}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              onChange={handleChange}
              className="form-select"
              id="role"
              name="role"
              value={user?.role}
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="btn-group">
            <button
              onClick={() => {
                navigate("/users-list");
              }}
              className="btn btn-danger"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleSubmit();
              }}
              className="btn btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
