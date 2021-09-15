import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { DeleteRounded } from "@material-ui/icons";
import { OrderModal } from "components/Modal";

export default function MyCart() {
  const API_URL = "http://localhost:3000";
  let history = useHistory();
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState({
    shoppingCarts: [],
  });
  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);

  useEffect(() => {
    getItems();
    getOrders();
  }, []);
  const getItems = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let itemsData = await axios({
        method: "GET",
        url: `${API_URL}/api/v1/my-cart`,
        headers: {
          access_token,
        },
      });
      setItems(itemsData.data);
    } catch (err) {
      Swal.fire("Get Error", `${err}`, "error");
    }
  };

  const getOrders = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let orderData = await axios({
        method: "GET",
        url: `${API_URL}/api/v1/order-summary`,
        headers: {
          access_token,
        },
      });
      console.log(orderData.data);
      setOrders(orderData.data);
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
          url: `${API_URL}/api/v1/my-cart/${id}`,
          headers: {
            access_token,
          },
        });
        history.push("/");
        Swal.fire(
          "Deleted!",
          "This item has been deleted from your cart",
          "success"
        );
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

  const removeCartHandler = (e) => {
    deleteCart();
  };

  const deleteCart = async () => {
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
          url: `${API_URL}/api/v1/my-cart/delete-cart/item`,
          headers: {
            access_token,
          },
        });
        history.push("/");
        Swal.fire("Deleted!", "Your Cart has been deleted", "success");
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
    <div className="container">
      <h1 className="text-center">My Cart</h1>
      <div class="card shadow mb-4 mt-2">
        <div class="card-body">
          {items.length < 1 ? (
            <h1 className="text-center">Cart is Empty</h1>
          ) : (
            <div class="table-responsive">
              <table class="table" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    return (
                      <>
                        {item.Line_items.map((line) => {
                          return (
                            <tr className="text-black">
                              <td>#{line.uniqId}</td>
                              <td>
                                <img
                                  src={`http://localhost:3000/images/movies/${line.Movie.image}`}
                                  alt={`http://localhost:3000/images/movies/${line.Movie.image}`}
                                  title={line.Movie.title}
                                  className="rounded"
                                  width="70px"
                                />
                                <small className="px-2">
                                  {line.Movie.title}
                                </small>
                              </td>
                              <td>{line.qty}</td>
                              <td>IDR {line.Movie.price}</td>
                              <td>
                                <button
                                  onClick={(e) => deleteItemHandler(e, line.id)}
                                  class="btn btn-danger btn-circle btn-sm"
                                >
                                  <DeleteRounded className="icon" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </>
                    );
                  })}
                </tbody>
              </table>
              <div className="text-end mx-2">
                <button
                  className="btn btn-danger"
                  onClick={(e) => removeCartHandler(e)}
                >
                  Remove All
                </button>

                <button className="btn btn-success mx-3">
                  <Link className="text-decoration-none text-black" to="/checkout">
                    CHECKOUT
                  </Link>
                </button>
                {/* <button
                  className="btn btn-success mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#orderModal"
                >
                  CHECKOUT
                </button> */}
                {/* 
                <div
                  className="modal fade"
                  id="orderModal"
                  tabindex="-1"
                  aria-labelledby="orderModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="orderModalLabel">
                          Cart Summary
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-6 text-start">
                            <h4>Total items</h4>
                            <h4>List items</h4>
                            <br />
                            <h4>Total Price</h4>
                            <h4>Discount</h4>
                            <h4>Tax</h4>
                            <h4>SubTotal</h4>
                          </div>
                          <div className="col-md-6 ms-auto text-start">
                            {orders.shoppingCarts.map((order) => {
                              return (
                                <div>
                                  <h4>{order.total_qty} items</h4>
                                  <h4>
                                    {order.Line_items.map((line) => {
                                      return (
                                        <>
                                          <h5>
                                            {line.qty}x Film {line.Movie.title}
                                          </h5>
                                        </>
                                      );
                                    })}
                                  </h4>
                                  <h4>IDR {order.subTotal}</h4>
                                  <h4>IDR {order.discount}</h4>
                                  <h4>IDR {order.tax}</h4>
                                  <h4>IDR {order.total_due}</h4>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          <Link to="/checkout">NEXT</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
