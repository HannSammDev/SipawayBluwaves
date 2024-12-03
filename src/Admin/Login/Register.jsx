import React, { useState } from "react";
import { auth, textDB } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Registeradmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Set loading state

    try {
      const normalizedEmail = email.trim().toLowerCase(); // Normalize email
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );
      const user = userCredential.user;

      // Add user details to Firestore (with 'admin' role)
      await setDoc(doc(textDB, "user_role", user.uid), {
        name: name.trim(),
        email: normalizedEmail,
        role: "admin",
      });

      navigate("/adminlogin"); // Navigate to dashboard after successful registration
    } catch (error) {
      // Handle different Firebase authentication errors
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        case "auth/weak-password":
          setError("Password is too weak. Must be at least 6 characters.");
          break;
        case "auth/network-request-failed":
          setError("Network error. Please check your connection.");
          break;
        default:
          setError("Registration failed. Please try again.");
      }
      console.error("Error during registration:", error.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        style={{
          maxWidth: "400px",
          margin: "3em auto",
          backgroundColor: "#fff",
          padding: "2em",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "1.5em" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "1em",
                marginBottom: "1.5em",
              }}
            />
          </div>
          <div style={{ marginBottom: "1.5em" }}>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "1em",
                marginBottom: "1.5em",
              }}
            />
          </div>
          <div style={{ marginBottom: "1.5em" }}>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "1em",
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "#fff",
                fontSize: "1.1em",
                fontWeight: "600",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
          </div>
        </div>
      </form>
    </>
  );
};
