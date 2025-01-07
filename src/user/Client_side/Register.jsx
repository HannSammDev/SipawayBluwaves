import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, textDB } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );
      const users = userCredential.user;

      
      await setDoc(doc(textDB, "user_role", users.uid), {
        name: name.trim(),
        email: normalizedEmail,
        role: "user",
      });

     
      navigate("/login");
    } catch (error) {
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
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "46%",
        right: "2%",
        transform: "translateY(-50%)",
        zIndex: "9999",
      }}
    >
      <form
        onSubmit={createUser}
        style={{
          float: "right",
          height: "fit-content",
          marginRight: "2em",
          backgroundColor: "white",
          width: "440px",
          padding: "1em",
          paddingBottom: "1px",
          paddingTop: "1em",
          borderRadius: "5px",
        }}
      >
        <div className="text-center">
          <h2>Sign Up</h2>
        </div>
        {error && <p>{error}</p>}
        <div className="form-floating mb-2">
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
        </div>
        <div className=" form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="signupEmail"
            aria-describedby="emailHelp"
            placeholder="example@gmail.com"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="signupEmail" className="form-label">
            Email address
          </label>
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="signupPassword"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="signupPassword" className="form-label">
            Password
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "80%" }}
            disabled={loading} 
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <p>
            {" "}
            Already have account? <a href="/login">Sign in</a>
          </p>
        </div>
      </form>
    </div>
  );
};
