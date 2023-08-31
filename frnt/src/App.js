import React from "react";
import { Routes, Route, Link, useNavigation } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User";
import Reporter from "./components/Reporter";
import Admin from "./components/Admin";
import { useNavigate } from "react-router-dom";

import "./App.css";

function App() {
  // const [loggedIn, setLoggedIn] = React.useState(() => false);

  const navigate = useNavigate();
  return (
    <>
      <header className="App-header">
        <p className="header-text">
          <Link to="/login">News A-Z </Link>
        </p>
        {localStorage.getItem("token") && (
          <button
            className="signout-button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            SignOut
          </button>
        )}
      </header>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/user" element={<User />} />
          <Route path="/login/reporter" element={<Reporter />} />
          <Route path="/login/admin" element={<Admin />} />
        </Route>

        <Route path="*" element={<p>404 Page Not Found!</p>} />
      </Routes>
    </>
  );
}

export default App;
