import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import ReactStars from "react-rating-stars-component";
import { RatingStar } from "rating-star";

export default function DetailMovie() {
  const params = useParams();
  const id = +params.id;
  const [item, setItem] = useState([]);
  const URL = "http://localhost:3000";

  useEffect(() => {
    getItemById();
  }, []);

  const getItemById = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await axios({
        method: "GET",
        url: `${URL}/admin/detail-movies/${id}`,
        headers: {
          access_token,
        },
      });
      setItem(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  // const rating = {
  //   size: 30,
  //   count: 10,
  //   value: item.rating_tmdb,
  //   edit: false,
  //   isHalf: true,
  //   emptyIcon: <i className="far fa-star" />,
  //   halfIcon: <i className="fa fa-star-half-alt" />,
  //   filledIcon: <i className="fa fa-star" />,
  //   color: "black",
  //   activeColor: "red",
  // };
  // console.log(item.rating_tmdb);
  // console.log(typeof item.rating_tmdb);
  const details = [
    {
      title: "Title",
      attributes: item.title,
    },
    {
      title: "Release Date",
      attributes: item.release,
    },
    {
      title: "Director",
      attributes: item.director,
    },
    {
      title: "Studio",
      attributes: item.studio,
    },
    {
      title: "Country",
      attributes: item.country,
    },
    {
      title: "Network",
      attributes: item.network,
    },
    {
      title: "Price",
      attributes: `IDR ${item.price}`,
    },
  ];
  return (
    <div class="container-fluid mt-3">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="home-tab"
            data-toggle="tab"
            href="#show-movies"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Detail Movie
          </a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="show-movies"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div class="card shadow mb-4 mt-2">
            <div class="card-body">
              <div class="row">
                <div class="col-md-5">
                  <div class="form-group">
                    <label for="name">Poster</label>
                    <img
                      src={`http://localhost:3000/images/movies/${item.image}`}
                      alt={`http://localhost:3000/images/movies/${item.image}`}
                      title={item.title}
                      className="rounded"
                      width="100%"
                    />
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="form-group">
                    <h3 class="fs-5">Information</h3>
                    {details.map((detail) => {
                      return (
                        <>
                          <small className="text-muted">{detail.title}</small>
                          <h2 className="text-black">{detail.attributes}</h2>
                        </>
                      );
                    })}
                    <RatingStar
                      id="ratingStar"
                      rating={item.rating_tmdb/2}
                      size={50}
                      numberOfStar={10}
                    />
                    <span>({item.rating_tmdb})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
  );
}
