import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Client-side validation
  const validateForm = () => {
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      // Handle backend error responses
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password.");
      } else if (error.response && error.response.status === 404) {
        // If the user does not exist, redirect to register page
        setErrorMessage("User does not exist. Redirecting to Register...");
        setTimeout(() => {
          navigate("/register");
        }, 2000); // Wait for 2 seconds before redirecting to the register page
      } else if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message); // Handling custom error messages from backend
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
            LogIn
          </span>
        </h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <i className="fas fa-envelope mr-2"></i>Email
            </label>
            <div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <i className="fas fa-lock mr-2"></i>Password
            </label>
            <div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              LogIn
            </button>
          </div>
          <div className="text-center mt-4">
            <button className="text-gray-600 hover:underline">
              Forgot password?
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?
          <button
            className="text-blue-500 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
