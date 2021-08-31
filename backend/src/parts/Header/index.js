/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";

import "./index.css";
import { Link } from "react-router-dom";

export default function Header({ handleLogout, isUpdated }) {
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("admin"));
    setAdmin(userData);
  }, [isUpdated]);

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
                {admin.name}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                aria-labelledby="navbarDarkDropdownMenuLink"
              >
                <li>
                  <Link className="dropdown-item" to="/admin/account">
                    <i className="fas fa-fw fa-user mr-2"></i>
                    <span>Account</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => handleLogout()}
                    className="dropdown-item"
                  >
                    <i className="fas fa-fw fa-sign-out-alt mr-2"></i>
                    <span>Logout</span>
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
