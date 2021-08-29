/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import "./index.css";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function Header({ handleLogout, isUpdated }) {
  const history = useHistory();
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("admin"));
    setAdmin(userData);
  }, [isUpdated]);
  // const logoutHandler = (e) => {
  //   Swal.fire({
  //     title: "Hello there..",
  //     text: "Are you sure you want to log out?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       userLogin(false);
  //       localStorage.clear();
  //       history.push("/");
  //     }
  //   });
  // };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-blue bg-dark">
        <div className="navbar-collapse collapse justify-content-between">
          <ul className="navbar-nav mr-auto">
            <Link className="nav-link navbar-brand" to="/">
              MovStore
            </Link>
          </ul>
          <ul className="navbar-nav">
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDarkDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Account
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => handleLogout()}
                    className="dropdown-item"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}
