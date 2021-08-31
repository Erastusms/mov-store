import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Loading } from "components";

export default function TableMovie() {
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
        Swal.fire("Deleted!", "Movie has been deleted.", "success");
      }
    } catch (err) {
      const errStatus = err.response.status;
      if (errStatus === 401) {
        Swal.fire("ERROR", "You're not authorized!", "error");
      } else if (errStatus === 404) {
        Swal.fire("ERROR", "Id not found!", "error");
      } else {
        Swal.fire("ERROR", `${err.message}`, "error");
      }
    }
  };

  return (
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
              {items.length === 0 ? (
                <Loading />
              ) : (
                items.map((item, index) => {
                  return (
                    <tr>
                      <td>{number++}</td>
                      <td>
                        <img
                          src={`http://localhost:3000/images/movies/${item.image}`}
                          alt={`http://localhost:3000/images/movies/${item.image}`}
                          title={item.title}
                          className="rounded"
                          width="70px"
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.director} </td>
                      <td>{item.release} </td>
                      <td>{item.country} </td>
                      <td>
                        <Link
                          to={`/admin/list-movies/detail/${item.id}`}
                          class="btn btn-info btn-circle btn-sm"
                        >
                          <i class="fas fa-image" title="Detail Movie"></i>
                        </Link>
                        <Link
                          to={`/admin/list-movies/edit/${item.id}`}
                          class="btn btn-warning btn-circle btn-sm"
                        >
                          <i class="fas fa-edit" title="Edit Movie"></i>
                        </Link>
                        <button
                          onClick={(e) => deleteItemHandler(e, item.id)}
                          class="btn btn-danger btn-circle btn-sm"
                        >
                          <i class="fas fa-trash" title="Delete Movie"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
