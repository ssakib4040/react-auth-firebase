import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { Link } from "react-router-dom";

const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Password must be 8 characters long");
      return;
    }

    if (password != confirmPassword) {
      setError("Confirm Password not matched");
      return;
    }

    try {
      setError("");

      await signUp(email, password);
      history.push("/");
    } catch (error) {
      // console.log(error.message);
      switch (error.message) {
        case "Firebase: Error (auth/missing-email).":
          return setError("Please enter email address");

        case "Firebase: Error (auth/email-already-in-use).":
          return setError("Email is already in use");

        default:
          return setError("Sorry something went wrong, please try again later");
      }
    }
  };

  return (
    <div className="border p-3">
      <h2>Register</h2>
      <hr />

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="d-grid gap-2">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
      <p className="text-center mt-2">
        Already registered? <Link to="/login">Login</Link> now
      </p>
    </div>
  );
};

export default Signup;
