import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      return setError("Fields are empty");
    }

    try {
      setError("");

      await login(email, password);
      history.push("/");
    } catch (error) {
      // console.log(error.message);

      switch (error.message) {
        case "Firebase: Error (auth/wrong-password).":
          return setError("Wrong password");

        case "Firebase: Error (auth/user-not-found).":
          return setError("User not found");

        case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
          return setError(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. "
          );

        default:
          return setError("Sorry something went wrong, please try again later");
      }
    }
  };

  return (
    <div className="border p-3">
      <h2>Login</h2>
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

        <div className="d-grid gap-2">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
      <p className="text-center mt-2">
        Not registered yet? <Link to="/signup">Register</Link> now
      </p>
    </div>
  );
};

export default Login;
