/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function ActorsPage() {
  let number = 1;
  const params = useParams();
  const id = +params.id;
  const URL = "http://localhost:3000";
  const history = useHistory();
  const [state, setState] = useState([]);
  const [actor, setActor] = useState({
    actor_name: "",
    char_name: "",
    year_date: "",
  });
  const [file, setFile] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await axios({
        method: "GET",
        url: `${URL}/admin/list-movies/actors/${id}`,
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
    setActor({
      ...actor,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addData();
  };

  const addData = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let data = new FormData();
      data.append("file", file);
      data.append("actor_name", actor.actor_name);
      data.append("char_name", actor.char_name);
      data.append("year_date", actor.year_date);

      const result = await axios({
        method: "POST",
        url: `${URL}/admin/list-movies/actors/${id}`,
        data: data,
        headers: {
          access_token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result.data);
      history.push("/admin/list-movies");
      Swal.fire("Congratulations", "Actors has been added", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response.data);
    }
  };

  const deleteItemHandler = (e, MovieId) => {
    deleteAxios(MovieId);
  };

  const deleteAxios = async (MovieId) => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axios({
          method: "DELETE",
          url: `${URL}/admin/list-movies/actors/${MovieId}`,
          headers: {
            access_token,
            "Content-Type": "multipart/form-data",
          },
        });
        history.push("/admin/list-movies");
        Swal.fire("Deleted!", "Actors has been deleted.", "success");
      }
    } catch (err) {
      const errStatus = err.response.status;
      if (errStatus === 401) {
        Swal.fire("ERROR", "You're not authorized!", "error");
      } else if (errStatus === 404) {
        Swal.fire("ERROR", "Id not found!", "error");
      } else {
        Swal.fire("ERROR", `${err.message}`, "error");
      }
    }
  };

  return (
    <div class="card shadow mb-4 mt-2">
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            <form
              action="/admin/item/add/activity"
              method="POST"
              enctype="multipart/form-data"
            >
              <div class="form-group">
                <label for="actor_name">Actor Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="actor_name"
                  placeholder="Enter Actor name"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div class="form-group">
                <label for="char_name">Character Name</label>
                <input
                  type="text"
                  class="form-control"
                  name="char_name"
                  placeholder="Enter char_name"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div class="form-group">
                <label for="year_date">Year Date</label>
                <input
                  type="number"
                  class="form-control"
                  name="year_date"
                  placeholder="Enter year_date"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div class="form-group">
                <label for="file">Image</label>
                <input
                  type="file"
                  class="form-control"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={(e) => submitHandler(e)}
              >
                Save
              </button>
            </form>
          </div>
          <div class="col-md-7">
            <div class="table-responsive">
              <table
                class="table table-bordered rounded"
                id="dataTableActivity"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Real Name</th>
                    <th>Char Name</th>
                    <th>Year Date</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.length === 0 ? (
                    <h1>Actor is empty</h1>
                  ) : (
                    state.map((actors) => {
                      return (
                        <tr>
                          <td>{number++}</td>
                          <td>{actors.actor_name}</td>
                          <td>{actors.char_name}</td>
                          <td>{actors.year_date}</td>
                          <td>
                            <img
                              src={`http://localhost:3000/images/actors/${actors.filename}`}
                              alt={`http://localhost:3000/images/actors/${actors.filename}`}
                              title={actors.title}
                              className="rounded"
                              width="100%"
                            />
                          </td>
                          <td>
                            <button
                              onClick={(e) => deleteItemHandler(e, actors.id)}
                              class="btn btn-danger btn-circle btn-sm"
                            >
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
