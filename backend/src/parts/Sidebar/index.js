import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sticky-md-top">
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/admin/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Admin Page</div>
        </a>

        <hr className="sidebar-divider my-0" />

        <li className="nav-item">
          <Link className="nav-link" to="/admin/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Master</div>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/list-users">
            <i className="fas fa-fw fa-users"></i>
            <span>Users</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/list-movies">
            <i className="fas fa-fw fa-film"></i>
            <span>Movies</span>
          </Link>
        </li>

        <div className="sidebar-heading">Order</div>

        <li className="nav-item">
          <Link className="nav-link" to="/admin/orders">
            <i className="fas fa-fw fa-receipt"></i>
            <span>Order</span>
          </Link>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    </div>
  );
}
