import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { LoginAPI, AdminAPI } from "admins";

const LoginPage = ({ handleLogin }) => {
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

  const handleSubmit = async (e) => {
    const data = await LoginAPI(form);
    console.log(data.status)
    console.log(data.access_token)
    try {
      if (data.status === 200) {
        const authorized = await AdminAPI(data.access_token);
        console.log(authorized);
        console.log(authorized.status)
        if (authorized.status === 200) {
          localStorage.setItem("admin", JSON.stringify(data.user));
          localStorage.setItem("access_token", data.access_token);
          Swal.fire({
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1000,
            width: "600px",
          });
          handleLogin();
        } else {
          throw {
            message: authorized.message,
          };
        }
      } else {
        throw {
          message: data.message,
        };
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-12 col-md-9 mt-5">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Admin Page MOVSTORE</h1>
                    </div>
                    <div className="form-container">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          name="email"
                          placeholder="Enter Email..."
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          name="password"
                          placeholder="Password"
                          onChange={(e) => handleChange(e)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSubmit();
                            }
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                        onClick={() => handleSubmit()}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
