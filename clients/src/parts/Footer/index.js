/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import "./index.scss";
export default function Footer() {
  return (
    <div>
      <footer className="footer mt-auto py-3 bg-dark text-white">
        <div className="container">
          <div className="container text-center">
            <div className="row">
              <div className="col-2">MovStore</div>
              <div className="col-8">
                <div className="p-1 text-center bg-blue">
                  <p>Copyright 2021 &copy; by Erastus</p>
                </div>
              </div>
              <div className="col-2">
                <a
                  href="https://github.com/Erastusms/mov-store"
                  target="_blank"
                >
                  <img
                    src="https://image.flaticon.com/icons/png/512/1051/1051326.png"
                    alt=""
                    width="20%"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
