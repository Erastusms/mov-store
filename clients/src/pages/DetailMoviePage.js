import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "parts";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { CardMovie } from "components/Card";
import { CommentForm, MovieComment } from "components/Form";

export default function DetailMoviePage() {
  const API_URL = "http://localhost:3000";
  const params = useParams();
  const id = +params.id;
  const [item, setItem] = useState({
    User: {},
    Movies_comments: [],
    Movies_actors: [],
  });
  const [profile, setProfile] = useState({
    Movies_comments: [],
  });

  useEffect(() => {
    getDetail();
    getProfile();
  }, []);

  const getDetail = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `${API_URL}/api/v1/movies-detail/${id}`,
      });
      setItem(result.data);
    } catch (err) {
      console.log(err);
    }
  };

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

  return (
    <div>
      <CardMovie key={item.id} item={item} />
      <div className="container-fluid px-5">
        <h1>Comments ({item.Movies_comments.length})</h1>
        <hr />
        <CommentForm key={profile.id} profile={profile} />
        {item.Movies_comments.map((comment) => {
          return (
            <div className="my-3">
              <MovieComment key={comment.id} data={comment} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
