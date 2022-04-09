import React, { useState } from "react";

// import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = ({ history }) => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  console.log(currentUser);
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  }

  return (
    <div className="border p-3">
      <h2>Protected Route</h2>
      <hr />
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      User: {currentUser.email}
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
