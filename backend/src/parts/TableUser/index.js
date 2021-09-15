import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Loading } from "components";

export default function TableUser() {
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
        url: `${URL}/admin/list-users`,
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
          url: `${URL}/admin/list-users/${id}`,
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
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h1>List Users</h1>
      </div>
      <div class="card-body">
        {items.length === 0 ? (
          <Loading />
        ) : (
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Birthdate</th>
                  <th>Gender</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  return (
                    <tr className="text-black">
                      <td>{number++}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.birthdate}</td>
                      <td>{item.gender}</td>
                      <td>{item.type}</td>
                      <td>
                        <button
                          type="submit"
                          class="btn btn-danger btn-circle btn-sm"
                          onClick={(e) => deleteItemHandler(e, item.id)}
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
