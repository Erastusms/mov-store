import React from "react";
import "./index.css";

export default function Hero({ login, userLogin, getToken }) {
  if (login) return <div></div>;

  return (
    <div className="mt-2">
      {/* item pertama */}
      <div className="bg-black text-white my-2">
        <div
          className="row justify-content-between"
          style={{ padding: "100px" }}
        >
          <div className="col-5">
            <h1>Enjoy on your TV.</h1>
            <h4>
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </h4>
          </div>
          {/* <div className="col-5 text-center">
            <h1></h1>
          </div> */}
        </div>
      </div>
      {/* item kedua */}
      <div className="bg-black text-white my-2">
        <div
          className="row justify-content-between"
          style={{ padding: "100px" }}
        >
          <div className="col-5 text-center">
            {/* <h1>Gambar</h1> */}
          </div>
          <div className="col-5">
            <h1>Buy your film to watch offline.</h1>
            <h4>
              Add to your cart.
            </h4>
          </div>
        </div>
      </div>
      {/* item ketiga */}
      <div className="bg-black text-white my-2">
        <div
          className="row justify-content-between"
          style={{ padding: "100px" }}
        >
          <div className="col-5">
            <h1>Watch everywhere.</h1>
            <h4>
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </h4>
          </div>
        </div>
      </div>
      {/* item keempat */}
      <div className="bg-black text-white my-2">
        <div
          className="row justify-content-between"
          style={{ padding: "100px" }}
        >
          <div className="col-5 text-center">
            
          </div>
          <div className="col-5">
            <h1>Create profiles for kids.</h1>
            <h4>
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
