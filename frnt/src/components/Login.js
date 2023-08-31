import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();

  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormState((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
    //console.log("Form state set...", formState);
  }

  const handleSubmit = async (e) => {
    //console.log("log in submittd", formState);
    e.preventDefault();
    const name = formState.username;
    const password = formState.password;
    try {
      const res = await axios.post("http://localhost:5000/app/v1/login", {
        name,
        password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        const decoded = jwt_decode(res.data.token);
        if (decoded.role === "user") navigate("/login/user");
        else if (decoded.role === "reporter") navigate("/login/reporter");
        else if (decoded.role === "admin") navigate("/login/admin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="login">
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={formState.username}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formState.password}
          required
        />

        <button className="login-button">Log In</button>
      </form>

      <h3>
        Don't have an account? <Link to="/signup"> Create one</Link>
      </h3>
    </section>
  );
}
