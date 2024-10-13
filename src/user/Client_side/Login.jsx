import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { doc,getDoc} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, textDB } from "../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );
      const user = userCredential.user;

      // Optionally fetch user data from Firestore
      const userDocRef = doc(textDB, "user_role", user.uid); // Assuming user data is stored in "users" collection
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        // Store user data in localStorage or in your app state
        localStorage.setItem("userData", JSON.stringify(userData));
        console.log("User data:", userData);
      } else {
        console.log("No additional user data found in Firestore.");
      }

      navigate("/"); 
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
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "43%",
        right: "2%",
        transform: "translateY(-50%)",
        zIndex: "9999",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "white",
          width: "340px",
          padding: "1em",
          borderRadius: "5px",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <a
          className="btn btn-close"
          href="/"
          style={{ marginBottom: "1em" }}
        ></a>
        <div className="text-center">
          <h2 style={{ fontFamily: "Times New Roman" }}>Sign In</h2>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message */}
        <div className="form-floating mb-3">
          <input
            className="form-control form-control-sm"
            type="email"
            value={email} // Use email state
            name="email"
            id="floatingInput"
            placeholder="name@example.com"
            required
            autoComplete="off"
            style={{ height: "40px" }}
            onChange={(e) => setEmail(e.target.value)} // Handle email input change
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control form-control-sm"
            id="floatingPassword"
            type="password"
            placeholder="Password"
            value={password} // Use password state
            name="password"
            required
            autoComplete="off"
            style={{ height: "40px" }}
            onChange={(e) => setPassword(e.target.value)} // Handle password input change
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ width: "100%" }}
            disabled={loading} // Disable button when loading
          >
            {loading ? "Signing In..." : "Sign In"} {/* Show loading state */}
          </button>
          <p>
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
