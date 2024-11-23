import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const UsersList = ({ token = useAuth() }) => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/all`, {
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

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [token]); // Include `token` as a dependency to re-fetch data when it changes
  const navigate = useNavigate();
  const { role } = useAuth();
  if (role != "ADMIN") {
    navigate("/");
  }
  const handleEdit = (id: string) => {
    navigate(`/user-edit/${id}`);
  };
  const handleDelete = (id: string) => {};
  return (
    <div className="container mt-4 w-100" style={{ minHeight: "100vh" }}>
      <h2 className="text-center mb-4">Users List</h2>
      <div className="table-responsive w-100">
        <table className="table table-striped table-bordered w-100">
          <thead className="thead-dark ">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>***************</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "ADMIN" ? "bg-warning" : "bg-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UsersList;
