import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ListItemPage.scss";

export default function ListItemPage() {
  const API_URL = "http://localhost:3000";
  const [home, setHome] = useState({
    allMovies: [],
    movieCS: [],
    movieCompleted: [],
    movieOA: [],
  });

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${API_URL}/api/v1/home-page`,
      });
      setHome(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row my-5">
        <h4>On Air Movies</h4>
        <Slider {...settings}>
          {home.movieOA.map((item) => {
            return (
              <div class="card px-2 border-0">
                <Link to={`/movie-details/${item.id}`}>
                  <img
                    src={`${API_URL}/images/movies/${item.image}`}
                    alt={`${API_URL}/images/movies/${item.image}`}
                    className="card-img rounded"
                    height="450"
                  />
                  <div class="card-img-overlay pl-1 text-start">
                    <p className="bg-primary badge">{item.rating_tmdb}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="row my-5">
        <h4>Completed Movies</h4>
        <Slider {...settings}>
          {home.movieCompleted.map((item) => {
            return (
              <div class="card px-2 border-0">
                <Link to={`/movie-details/${item.id}`}>
                  <img
                    src={`${API_URL}/images/movies/${item.image}`}
                    alt={`${API_URL}/images/movies/${item.image}`}
                    className="card-img rounded"
                    height="450"
                  />
                  <div class="card-img-overlay pl-1 text-start">
                    <p className="bg-primary badge">{item.rating_tmdb}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="row my-5">
        <h4>Upcoming Movies</h4>
        <Slider {...settings}>
          {home.movieCS.map((item) => {
            return (
              <div class="card px-2 border-0">
                <Link to={`/movie-details/${item.id}`}>
                  <img
                    src={`${API_URL}/images/movies/${item.image}`}
                    alt={`${API_URL}/images/movies/${item.image}`}
                    className="card-img rounded"
                    height="450"
                  />
                  <div class="card-img-overlay pl-1 text-start">
                    <p className="bg-primary badge">{item.rating_tmdb}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
