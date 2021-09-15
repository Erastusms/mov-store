/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function TableEditMovie() {
  const params = useParams();
  const id = +params.id;
  const URL = "http://localhost:3000";
  const history = useHistory();
  const [state, setState] = useState({});
  const [file, setFile] = useState("");

  useEffect(() => {
    console.log("use effect jalan");
    getData();
  }, []);

  const getData = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await axios({
        method: "GET",
        url: `${URL}/admin/detail-movies/${id}`,
        headers: {
          access_token,
        },
      });
      console.log(result.data);
      setState(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updatedData();
  };

  const updatedData = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let data = new FormData();
      data.append("file", file);
      data.append("title", state.title);
      data.append("episode", state.episode);
      data.append("director", state.director);
      data.append("studio", state.studio);
      data.append("tv_status", state.tv_status);
      data.append("duration", state.duration);
      data.append("release", state.release);
      data.append("country", state.country);
      data.append("genre", state.genre);
      data.append("rating_tmdb", state.rating_tmdb);
      data.append("network", state.network);
      data.append("trailer", state.trailer);
      data.append("price", state.price);
      console.log(data);
      console.log(access_token);
      const result = await axios({
        method: "PUT",
        url: `${URL}/admin/edit-movies/${id}`,
        data: data,
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      history.push("/");
      Swal.fire("Congratulations", "Movies has been updated", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response.data);
    }
  };

  return (
    <div className="card shadow mb-4 mt-2">
      <div className="card-body">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Enter title"
            value={state.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="episode">Episode</label>
          <input
            type="number"
            className="form-control"
            name="episode"
            placeholder="Enter episode"
            value={state.episode}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            className="form-control"
            name="director"
            placeholder="Enter director"
            value={state.director}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="studio">Studio</label>
          <input
            type="text"
            className="form-control"
            name="studio"
            placeholder="Enter studio"
            value={state.studio}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tv_status">Status</label>
          <select
            className="form-control"
            name="tv_status"
            value={state.tv_status}
            onChange={(e) => handleChange(e)}
          >
            <option disabled selected value="">
              --- Choose Status ---
            </option>
            <option value="COMING SOON">Coming Soon</option>
            <option value="ON AIR">On Air</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in minutes)</label>
          <input
            type="number"
            className="form-control"
            name="duration"
            placeholder="Enter duration"
            value={state.duration}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="release">Release Date</label>
          <input
            type="date"
            className="form-control"
            name="release"
            placeholder="Enter release"
            value={state.release}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="form-control"
            name="country"
            placeholder="Enter country"
            value={state.country}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            className="form-control"
            name="genre"
            placeholder="Enter genre"
            value={state.genre}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating_tmdb">Rating TMDB</label>
          <input
            type="number"
            className="form-control"
            name="rating_tmdb"
            placeholder="Enter rating_tmdb"
            value={state.rating_tmdb}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="network">Network</label>
          <input
            type="text"
            className="form-control"
            name="network"
            placeholder="Enter network"
            value={state.network}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="trailer">Link Trailer</label>
          <input
            type="text"
            className="form-control"
            name="trailer"
            placeholder="Enter trailer"
            value={state.trailer}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Enter price"
            value={state.price}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Image</label>
          <input
            type="file"
            className="form-control"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button className="btn btn-success" onClick={(e) => submitHandler(e)}>
          Update
        </button>
      </div>
    </div>
  );
}
