import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./index.scss";

export default function RegisterForm() {
  const history = useHistory();
  const URL = "http://localhost:3000";

  const [file, setFile] = useState("");

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    registerHandler();
  };

  const registerHandler = async () => {
    try {
      let data = new FormData();
      data.append("file", file);
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("password", form.password);
      data.append("birthdate", form.birthdate);
      data.append("gender", form.gender);
      const result = await axios({
        method: "POST",
        url: `${URL}/api/v1/register`,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      history.push("/login");
      Swal.fire("Congratulations", "Account has been created", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response.data);
    }
  };

  return (
    <div className="register">
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
          <h1>Sign Up</h1>
          <small>Name</small>
          <input
            name="name"
            type="text"
            placeholder="Name"
            required
            onChange={(e) => handleChange(e)}
          />
          <small>Email</small>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <small>Password</small>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <small>Birthdate</small>
          <input
            name="birthdate"
            type="date"
            placeholder="Birthdate"
            onChange={(e) => handleChange(e)}
          />
          <small>Gender</small>
          <select name="gender" onChange={(e) => handleChange(e)}>
            <option disabled selected value="">
              --- Choose Gender ---
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <small>Avatar</small>
          <input
            type="file"
            className="form-control mb-3"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="loginButton" onClick={(e) => submitHandler(e)}>
            Sign Up
          </button>
          <span>
            Already have account? <Link to="/login">Sign in</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
