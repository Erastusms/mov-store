import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function CheckoutForm(props) {
  const history = useHistory();
  const API_URL = "http://localhost:3000";
  const [form, setForm] = useState({
    city: "",
    address: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    addCheckout();
  };

  const addCheckout = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const result = await axios({
        method: "POST",
        url: `${API_URL}/api/v1/checkout`,
        data: form,
        headers: {
          access_token,
        },
      });
      console.log(result.data);
      Swal.fire("Congratulations", "Success Checkout", "success");
      history.push("/");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response.data);
    }
  };
  const { name, email } = props.profile;
  return (
    <div>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <h3>{name}</h3>
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <h3>{email}</h3>
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Ex: Jalan TB.Simatupang"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            name="city"
            placeholder="Ex: Jakarta Timur"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="zipCode" className="form-label">
            Zip
          </label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => submitHandler(e)}
          >
            CHECKOUT
          </button>
        </div>
      </form>
    </div>
  );
}
