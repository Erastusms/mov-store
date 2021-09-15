import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import "./index.scss";

export default function LoginForm({ login, userLogin, getToken }) {
  const URL = "http://localhost:3000";
  const history = useHistory();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    loginAxios();
  };

  const loginAxios = async (req, res) => {
    try {
      const result = await axios({
        method: "POST",
        url: `${URL}/api/v1/login`,
        data: form,
      });
      const access_token = result.data["access_token"];
      userLogin(true);
      getToken(access_token);
      Swal.fire("Login", "You're successfully login", "success");
      history.push("/");
    } catch (err) {
      if (err.response.status === 404) {
        Swal.fire("ERROR", "User not found", "error");
      } else {
        Swal.fire("ERROR", "Password is invalid", "error");
      }
    }
  };

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            name="password"
            type="password"
            placeholder="Your Password"
            onChange={(e) => handleChange(e)}
          />
          <button className="loginButton" onClick={(e) => submitHandler(e)}>
            Sign In
          </button>
          <span>
            New to Netflix? <Link to="/register">Sign up now.</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
