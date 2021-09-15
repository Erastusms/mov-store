/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { RatingStar } from "rating-star";
import CardActors from "../CardActors";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import dateFormat from "dateformat";
import { ShoppingCart, PlayCircleOutline } from "@material-ui/icons";
export default function CardMovie(props) {
  const history = useHistory();
  const API_URL = "http://localhost:3000";
  const {
    id,
    title,
    episode,
    director,
    studio,
    tv_status,
    duration,
    release,
    country,
    genre,
    rating_tmdb,
    network,
    trailer,
    views,
    price,
    image,
    Movies_actors,
  } = props.item;

  const itemsLeft = [
    {
      title: "Title",
      attributes: title,
    },
    {
      title: "Release Date",
      attributes: dateFormat(release, "mmmm dS, yyyy"),
    },
    {
      title: "Genre",
      attributes: genre,
    },
    {
      title: "Total Episode",
      attributes: episode,
    },
    {
      title: "Duration",
      attributes: `${duration} minutes`,
    },
  ];

  const itemsRight = [
    {
      title: "Director",
      attributes: director,
    },
    {
      title: "Studio",
      attributes: studio,
    },
    {
      title: "Country",
      attributes: country,
    },
    {
      title: "Network",
      attributes: network,
    },
    {
      title: "Status",
      attributes: tv_status,
    },
  ];

  const submitHandler = (e) => {
    addToCart();
  };

  const addToCart = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const result = await axios({
        method: "POST",
        url: `${API_URL}/api/v1/movies-detail/${id}/add-to-cart`,
        headers: {
          access_token,
        },
      });
      console.log(result.data);
      history.push("/");
      Swal.fire("Congratulations", "Movie has added to your cart", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response.data);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="card shadow mb-4 mt-2">
        <div className="card-body">
          <h1 className="text-center fw-bolder text-black">Information</h1>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <img
                  src={`http://localhost:3000/images/movies/${image}`}
                  alt={`http://localhost:3000/images/movies/${image}`}
                  title={title}
                  className="rounded-top"
                  width="100%"
                />
                <div>
                  <p className="bg-warning text-center fw-bolder text-black rounded-bottom fs-2">
                    IDR {price}
                  </p>
                  <div className="d-grid gap-2 mx-auto">
                    {tv_status !== "COMING SOON" ? (
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={(e) => submitHandler(e)}
                      >
                        <ShoppingCart className="icon" />
                        <span className="text-black">Add to Cart</span>
                      </button>
                    ) : (
                      <></>
                    )}

                    <button className="btn btn-primary" type="button">
                      <a
                        href={trailer}
                        target="_blank"
                        className="text-decoration-none"
                      >
                        <PlayCircleOutline className="icon" />
                        <span className="text-black">Watch Trailer</span>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    {itemsLeft.map((item) => {
                      return (
                        <>
                          <small className="text-muted">{item.title}</small>
                          <h2 className="text-black">{item.attributes}</h2>
                        </>
                      );
                    })}
                  </div>
                  <div className="col-6">
                    {itemsRight.map((item) => {
                      return (
                        <>
                          <small className="text-muted">{item.title}</small>
                          <h2 className="text-black">{item.attributes}</h2>
                        </>
                      );
                    })}
                  </div>
                </div>
                <small className="text-muted">Rating</small>
                <br />
                <RatingStar
                  id="ratingStar"
                  rating={rating_tmdb / 2}
                  size={50}
                  numberOfStar={10}
                />
                <span>({rating_tmdb})</span>
                <h3 className="fs-5">Top Cast</h3>
                <div class="row row-cols-1 row-cols-md-6 g-4">
                  {Movies_actors.map((actors) => {
                    return (
                      <div className="mx-2">
                        <CardActors key={actors.id} data={actors} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
