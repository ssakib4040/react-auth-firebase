import React, { useState, useEffect, useContext, createContext } from "react";
import Loader from "../components/Loader";
import { auth, firebaseFunctions } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  function signUp(email, password) {
    return firebaseFunctions.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return firebaseFunctions.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return firebaseFunctions.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  const contextValue = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading ? children : <Loader />}
    </AuthContext.Provider>
  );
}
