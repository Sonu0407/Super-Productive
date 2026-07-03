import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rewards from "./pages/Rewards";

import AuthContext from "./context/AuthContext";
import TaskDetails from "./pages/TaskDetails";

function App() {
  const { authUser, loading } = useContext(AuthContext);
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  // console.log(authUser);

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  }

  return (
    <>
      {/* Tailwind css is working */}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        <Route path="/login" element={authUser ? <Home /> : <Login />} />
        <Route path="/register" element={authUser ? <Home /> : <Register />} />
        <Route path="/rewards" element={authUser ? <Rewards /> : <Login />} />
        <Route
          path="/task/:id"
          element={authUser ? <TaskDetails /> : <Login />}
        />
      </Routes>
    </>
  );
}

export default App;
