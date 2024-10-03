import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  console.log(user);
  return (
    <div className="w-64 bg-gray-800 h-screen p-5 text-white fixed lg:static">
      <h1 className="text-3xl font-semibold mb-10">taskZen</h1>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">
          Welcome, {user?.username || "Guest"}
        </h2>
      </div>

      <ul>
        <li className="mb-4">
          <Link to="/" className="text-lg hover:text-gray-400">
            All Tasks
          </Link>
        </li>

        {/* Show Manage Users link only if role is admin */}
        {user?.role === "admin" && (
          <li className="mb-4">
            <Link to="/users" className="text-lg hover:text-gray-400">
              Manage Users
            </Link>
          </li>
        )}

        
        <li className="mb-4">
          <Link to="/tasks" className="text-lg hover:text-gray-400">
            Manage Tasks
          </Link>
        </li>

        <li className="mb-4">
          <button
            onClick={handleLogout}
            className="text-lg hover:text-gray-400 focus:outline-none"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
