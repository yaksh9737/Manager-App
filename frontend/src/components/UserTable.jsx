import React, { useEffect, useState } from "react";
import axios from "axios";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Ensure token is fetched

        const response = await axios.get(
          "http://localhost:8000/api/users/users",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Check that token is being sent
            },
          }
        );
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-left">
              <th className="py-3 px-6 font-semibold">Sr.</th>
              <th className="py-3 px-6 font-semibold">Username</th>
              <th className="py-3 px-6 font-semibold">Email</th>
              <th className="py-3 px-6 font-semibold">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="py-3 px-6 border-b text-gray-700">
                  {index + 1}
                </td>
                <td className="py-3 px-6 border-b text-gray-700">
                  {user.username}
                </td>
                <td className="py-3 px-6 border-b text-gray-700">
                  {user.email}
                </td>
                <td className="py-3 px-6 border-b text-gray-700">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
