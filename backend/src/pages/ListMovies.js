import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import AddMovies from "./AddMovies";

export default function ListMovies() {
  const URL = "http://localhost:3000";
  let history = useHistory();
  let number = 1;
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);
  const getItems = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let itemsData = await axios({
        method: "GET",
        url: `${URL}/admin/list-movies`,
        headers: {
          access_token,
        },
      });
      console.log(itemsData.data);
      setItems(itemsData.data);
    } catch (err) {
      Swal.fire("Get Error", `${err}`, "error");
    }
  };

  const deleteItemHandler = (e, id) => {
    deleteAxios(id);
  };

  const deleteAxios = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axios({
          method: "DELETE",
          url: `${URL}/admin/list-movies/${id}`,
          headers: {
            access_token,
          },
        });
        history.push("/");
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
    } catch (err) {
      const errStatus = err.response.status;
      if (errStatus === 401) {
        Swal.fire("ERROR", "You're not authorized!", "error");
      } else if (errStatus === 404) {
        Swal.fire("ERROR", "Id not found!", "error");
      } else {
        Swal.fire("ERROR", "Internal server error!", "error");
      }
    }
  };

  const loadingBar = () => {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-center" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
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
            Show Movie
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="#add-movies"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Add Movie
          </a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        {/* disini nanti include tab view table dan add movies */}
        <div
          class="tab-pane fade show active"
          id="show-movies"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div class="card shadow mb-4 mt-2">
            <div class="card-body">
              <div class="table-responsive">
                <table
                  class="table table-bordered"
                  id="dataTable"
                  width="100%"
                  cellspacing="0"
                >
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Director</th>
                      <th>Release Date</th>
                      <th>Country</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0
                      ? loadingBar
                      : items.map((item, index) => {
                          return (
                            <tr>
                              <td>{number++}</td>
                              <td>
                                <img
                                  src={`http://localhost:3000/images/movies/${item.image}`}
                                  alt="image"
                                  width="70px"
                                />
                              </td>
                              <td>{item.title}</td>
                              <td>{item.director} </td>
                              <td>{item.release} </td>
                              <td>{item.country} </td>
                              <td>
                                <Link
                                  href="/admin/detail-movies/<%= movies[i].id %>"
                                  class="btn btn-info btn-circle btn-sm"
                                >
                                  <i class="fas fa-image"></i>
                                </Link>
                                <Link
                                  href="/admin/edit-movies/<%= movies[i].id %>"
                                  class="btn btn-warning btn-circle btn-sm"
                                >
                                  <i class="fas fa-edit"></i>
                                </Link>
                                <button
                                  onClick={(e) => deleteItemHandler(e, item.id)}
                                  class="btn btn-danger btn-circle btn-sm"
                                >
                                  <i class="fas fa-trash"></i>
                                </button>
                                <a
                                  href="/admin/movies/show-detail-movies/<%= movies[i].id %>"
                                  class="btn btn-success btn-circle btn-sm"
                                >
                                  <i class="fas fa-plus"></i>
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* konten add movies */}
        <div
          class="tab-pane fade"
          id="add-movies"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <AddMovies />
        </div>
      </div>
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
  );
}
