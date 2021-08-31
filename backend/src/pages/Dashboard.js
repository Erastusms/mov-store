import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function Dashboard() {
  const URL = "http://localhost:3000";
  const [items, setItems] = useState({});

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let itemsData = await axios({
        method: "GET",
        url: `${URL}/admin/dashboard`,
        headers: {
          access_token,
        },
      });
      setItems(itemsData.data.dashboard);
    } catch (err) {
      Swal.fire("Get Error", `${err}`, "error");
    }
  };

  return (
    <div class="container-fluid my-3">
      <h1 class="h3 mb-4 text-gray-800">Dashboard</h1>
      <div class="row">
        <div class="col-xl-4 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="
                    text-xs
                    font-weight-bold
                    text-primary text-uppercase
                    mb-1
                  "
                  >
                    Users
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {items.users}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="
                    text-xs
                    font-weight-bold
                    text-success text-uppercase
                    mb-1
                  "
                  >
                    Movies
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {items.movies}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-film fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4 col-md-6 mb-4">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div
                    class="
                    text-xs
                    font-weight-bold
                    text-info text-uppercase
                    mb-1
                  "
                  >
                    Order
                  </div>
                  <div class="row no-gutters align-items-center">
                    <div class="col-auto">
                      <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        {items.order}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-receipt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
