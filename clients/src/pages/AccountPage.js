import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import dateFormat from "dateformat";
export default function Acoount() {
  const [profile, setProfile] = useState({
    Movies_comments: [],
    Movies_carts: [],
    Orders: []
  });
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState();
  const [displayFiles, setDisplayFiles] = useState();

  const history = useHistory();
  const API_URL = "http://localhost:3000";

  useEffect(() => {
    getProfile();
  }, []);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const URLcreateObject = URL.createObjectURL(file);
    setDisplayFiles(URLcreateObject);
    setFile(file);
  };

  const chooseFile = () => {
    document.getElementById("file").click();
  };

  const handleUpdate = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let data = new FormData();
      data.append("file", file);
      data.append("name", profile.name);
      data.append("email", profile.email);
      data.append("birthdate", profile.birthdate);
      const result = await axios({
        method: "PUT",
        url: `${API_URL}/api/v1/profile`,
        data: data,
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      history.push("/");
      Swal.fire("Congratulations", "Your profile has been updated", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response.data);
    }
  };

  const getProfile = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await axios({
        method: "GET",
        url: `${API_URL}/api/v1/profile`,
        headers: {
          access_token,
        },
      });
      setProfile(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="container-fluid mt-3">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="home-tab"
            data-toggle="tab"
            href="#show-movies"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            My Account
          </a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="show-movies"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div class="card shadow mb-4 mt-2">
            <div class="card-body">
              <div className="container px-4 py-2" style={{ height: "100%" }}>
                <div className="card border m-5 p-2">
                  <div className="row">
                    <div className="col-auto py-3 ps-3 ms-3 my-3">
                      {isEdit ? (
                        <div
                          style={{
                            width: 150,
                            height: 150,
                            cursor: "pointer",
                          }}
                          onClick={() => chooseFile()}
                        >
                          {displayFiles ? (
                            <img
                              src={`${displayFiles}`}
                              alt="avatar"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <img
                              src={`${API_URL}/images/avatars/${profile.avatar}`}
                              alt="avatar"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <div style={{ width: 150, height: 150 }}>
                          <img
                            src={`${API_URL}/images/avatars/${profile.avatar}`}
                            alt="avatar"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="col py-3 my-3 pe-3 me-3">
                      <input
                        id="file"
                        type="file"
                        name="file"
                        className="d-none"
                        onChange={(e) => handleUpload(e)}
                      />
                      {!isEdit ? (
                        <div>
                          <h4>About Me</h4>
                          <div className="table-responsive-sm">
                            <table className="table">
                              <td className="text-muted pe-5">
                                <tr>Name</tr>
                                <tr>Email</tr>
                                <tr>Birthdate</tr>
                              </td>

                              <td className="text-warning">
                                <tr>{profile.name}</tr>
                                <tr>{profile.email}</tr>
                                <tr>{dateFormat(profile.birthdate, "mmmm dS, yyyy")}</tr>
                              </td>
                            </table>
                          </div>
                          <h4>Information</h4>
                          <div className="table-responsive-sm">
                            <table className="table">
                              <td className="text-muted">
                                <tr>Total Comments</tr>
                                <tr>Total Item in Cart</tr>
                                <tr>Total Order</tr>
                              </td>

                              <td className="text-warning">
                                <tr>{profile.Movies_comments.length} Comments</tr>
                                {/* <tr>{dateFormat(birthdate, "mmmm dS, yyyy")}</tr> */}
                                <tr>{profile.Movies_carts.length} Items in my cart</tr>
                                <tr>{profile.Orders.length} Orders</tr>
                              </td>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4>Update Data</h4>
                          <div className="table-responsive-sm">
                            <div className="form-group">
                              <label htmlFor="title">Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter title"
                                value={profile.name}
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="title">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter email"
                                value={profile.email}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="title">Birthdate</label>
                              <input
                                type="date"
                                className="form-control"
                                name="birthdate"
                                placeholder="Enter birthdate"
                                value={profile.birthdate}
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {!isEdit ? (
                        <button
                          className="btn btn-warning"
                          onClick={() => handleEdit()}
                        >
                          Edit Account
                        </button>
                      ) : (
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                      )}
                      <div className="d-flex mt-3">
                        {isEdit && (
                          <div>
                            <button
                              className="btn btn-primary mt-3"
                              style={{ marginRight: 5 }}
                              onClick={() => handleCancel()}
                            >
                              Back
                            </button>
                            <button
                              className="btn btn-success mt-3"
                              onClick={() => handleUpdate()}
                            >
                              Update
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
  );
}
