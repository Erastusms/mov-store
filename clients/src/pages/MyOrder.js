import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { DeleteRounded } from "@material-ui/icons";

export default function MyOrder() {
  const API_URL = "http://localhost:3000";
  let history = useHistory();
  const [items, setItems] = useState({
    order: [],
  });

  useEffect(() => {
    getItems();
  }, []);
  const getItems = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let itemsData = await axios({
        method: "GET",
        url: `${API_URL}/api/v1/my-order`,
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

  return (
    <div className="container">
      <h1 className="text-center">My Order</h1>
      <div class="card shadow mb-4 mt-2">
        <div class="card-body">
          {items.order.length < 1 ? (
            <h1 className="text-center">Order is Empty</h1>
          ) : (
            <div class="table-responsive">
              <table class="table" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Item List</th>
                    <th>Total Item</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.order.map((item) => {
                    return (
                      <>
                        <tr className="text-black">
                          <td>{item.name}</td>
                          <td>{item.city}</td>
                          <td>{item.address}</td>
                          <td>
                            {item.Line_items.map((line) => {
                              return (
                                <>
                                  <p>
                                    {line.qty}x Film {line.Movie.title}
                                  </p>
                                </>
                              );
                            })}
                          </td>
                          <td>{item.total_qty}</td>
                          <td>{item.total_due}</td>

                          <td>{item.status}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
