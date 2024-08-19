import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={!token ? <LoginPage setToken={setToken} /> : <Navigate to="/home" />} />
          <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/home" />} />
          <Route path="/home" element={token ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
