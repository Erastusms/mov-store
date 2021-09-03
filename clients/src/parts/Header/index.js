import React, { useState, useEffect } from "react";
import { ShoppingCart, Receipt } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import LOGO from "assets/LOGO-FIX.png";
import "./index.scss";

export default function Header({ login, userLogin }) {
  const API_URL = "http://localhost:3000";
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await axios({
        method: "GET",
        url: `${API_URL}/api/v1/profile`,
        headers: {
          access_token,
        },
      });
      setProfile(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const history = useHistory();

  const logoutHandler = (e) => {
    Swal.fire({
      title: "Hello there..",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        userLogin(false);
        localStorage.clear();
        history.push("/");
      }
    });
  };

  if (login)
    return (
      <div className={isScrolled ? "navbar scrolled" : "navbar"}>
        <div className="container">
          <div className="left">
            <img
              // src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              src={LOGO}
              className="logo"
              alt=""
            />
            <Link className="text-decoration-none" to="/">
              <span>Homepage</span>
            </Link>
          </div>
          <div className="right">
            <Link to="/my-carts">
              <ShoppingCart className="icon" />
            </Link>
            <Link to="/my-orders">
              <Receipt className="icon" />
            </Link>
            <div className="profile">
              <img src={`${API_URL}/images/avatars/${profile.avatar}`} alt="" />
              <div className="options">
                <Link className="text-decoration-none mt-2" to="/my-accounts">
                  <span>Account</span>
                </Link>
                <span onClick={(e) => logoutHandler(e)}>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="header">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link className="loginButton" to="/login">
            Sign In
          </Link>
        </div>
      </div>
      <div className="container mx-5">
        <h1>Sell any movies you want.</h1>
        <h2>Buy anywhere. Order anytime.</h2>
        <p>Ready to start?</p>
        <Link className="registerButton" to="/login">
          Get Started
        </Link>
      </div>
    </div>
  );
}
