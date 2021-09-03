import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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
        url: `${URL}/admin/list-orders`,
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

  const rejectHandler = (e, id) => {
    rejectOrder(id);
  };

  const rejectOrder = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const result = await axios({
        method: "PUT",
        url: `${URL}/admin/list-orders/reject/${id}`,
        headers: {
          access_token,
        },
      });
      console.log(result.data);
      history.push("/");
      Swal.fire("Congratulations", "Reject has been updated", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err);
    }
  };

  const confirmHandler = (e, id) => {
    confirmOrder(id);
  };

  const confirmOrder = async (id) => {
    try {
      const access_token = localStorage.getItem("access_token");
      const result = await axios({
        method: "PUT",
        url: `${URL}/admin/list-orders/confirmation/${id}`,
        headers: {
          access_token,
        },
      });
      console.log(result.data);
      history.push("/");
      Swal.fire("Congratulations", "Confirmation has been updated", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response.data);
    }
  };

  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h1>List Orders</h1>
      </div>
      <div class="card-body">
        {items.length === 0 ? (
          <h1 className="text-center">Order is Empty</h1>
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
                  <th>Invoice</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  return (
                    <tr>
                      <td>{number++}</td>
                      <td>{item.name}</td>
                      <td>{item.User.name}</td>
                      <td>{item.city}</td>
                      <td>{item.address}</td>
                      <td>{item.status}</td>
                      <td>
                        {item.status === "Process" ? (
                          <>
                            <button
                              type="submit"
                              class="btn btn-success btn-circle btn-sm"
                              onClick={(e) => confirmHandler(e, item.id)}
                            >
                              <i class="fas fa-check"></i>
                            </button>
                            <button
                              type="submit"
                              class="btn btn-danger btn-circle btn-sm"
                              onClick={(e) => rejectHandler(e, item.id)}
                            >
                              <i class="fas fa-times"></i>
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
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
