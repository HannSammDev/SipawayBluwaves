import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Admin_Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true); 

    try {
      const normalizedEmail = email.trim().toLowerCase(); // Normalize email
      await signInWithEmailAndPassword(auth, normalizedEmail, password);
      navigate("/dash");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/user-disabled":
          setError("User account has been disabled.");
          break;
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password. Please try again.");
          break;
        case "auth/too-many-requests":
          setError("Too many login attempts. Please try again later.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your connection.");
          break;
        default:
          setError("Login failed. Please check your credentials.");
      }
      console.error("Error during login:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center vh-100" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
      <div className="row w-100 justify-content-center">
        <div className="col-md-5 d-flex flex-column align-items-center justify-content-center text-center">
          <img
            src="../img/newlogofinal.png"
            alt="Admin Logo"
            className="img-fluid mb-4"
            style={{ maxWidth: "180px" }}
          />
          <h1 className="mb-3 text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>Blue Waves Resort</h1>
          <p className="text-white" style={{ fontSize: "1.2rem" }}>
            Welcome to the Admin Portal
          </p>
        </div>
        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <form
            onSubmit={handleLogin}
            className="w-100"
            style={{
              maxWidth: "400px",
              padding: "40px",
              borderRadius: "20px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#ffffff",
              border: "none"
            }}
          >
            <div className="mb-4">
              <label htmlFor="username" className="form-label" style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                Email
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  fontSize: "1rem"
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label" style={{ fontWeight: "600", fontSize: "1.1rem" }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ced4da",
                  fontSize: "1rem"
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
              style={{
                padding: "12px",
                fontSize: "18px",
                borderRadius: "10px",
                backgroundColor: "#6a11cb",
                border: "none",
                transition: "background-color 0.3s ease"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="mt-3 text-danger" style={{ fontSize: "14px" }}>
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
