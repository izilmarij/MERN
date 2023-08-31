import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import jwt_decode from "jwt-decode";

export default function Signup() {
  const navigate = useNavigate();

  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
    reenter_password: "",
  });

  //const navigate = React.useNavigate();

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
    //console.log("sign in submittd", formState);

    e.preventDefault();
    const name = formState.username;
    const password = formState.password;
    const reenter_password = formState.reenter_password;

    try {
      const res = await axios.post("http://localhost:5000/app/v1/signup", {
        name,
        password,
        reenter_password,
      });

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        const decoded = jwt_decode(res.data.token);
        if (decoded.role === "user") navigate("/login/user");
        else if (decoded.role === "reporter") navigate("/login/reporter");
        else if (decoded.role === "admin") navigate("/login/admin");
      }
    } catch (err) {
      console.log("Err from server ", err);
    }
  };

  return (
    <section className="signup">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="reenter-password">Re-enter Password</label>
        <input
          type="password"
          id="reenter-password"
          name="reenter_password"
          value={formState.reenter_password}
          onChange={handleChange}
          required
        />

        <button className="signup-button">Signup</button>
      </form>
    </section>
  );
}
