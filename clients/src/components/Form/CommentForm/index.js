import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import Swal from "sweetalert2";

export default function CommentForm(props) {
  const { name, avatar } = props.profile;
  const params = useParams();
  const id = +params.id;
  const API_URL = "http://localhost:3000";
  const history = useHistory();
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const handleClicked = () => {
    setIsClicked(true);
  };

  const handleCancel = () => {
    document.getElementById("comments").value = "";
    setIsClicked(false);
  };

  const submitHandler = (e) => {
    let objTemp = {
      comments,
      rating,
    };
    addComment(objTemp, e);
  };

  const addComment = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      await axios({
        method: "POST",
        url: `${API_URL}/api/v1/movies-detail/${id}/add-comment`,
        data: {
          comments,
          rating,
        },
        headers: {
          access_token,
        },
      });
      history.push("/");
      Swal.fire("Congratulations", "Comment has been posted", "success");
    } catch (err) {
      Swal.fire("ERROR", `${err}`, "error");
      console.log(err.response.data);
    }
  };

  return (
    <div className="row">
      <div className="col-1 text-end">
        <img
          src={`${API_URL}/images/avatars/${avatar}`}
          alt={`${API_URL}/images/avatars/${avatar}`}
          title={name}
          className="rounded-top"
          width="75%"
        />
      </div>
      <div className="col-10">
        <h5 className="text-muted">
          {name}{" "}
          <span>
            <ReactStars
              name="rating"
              count="10"
              size="20"
              isHalf="false"
              value={rating}
              onChange={ratingChanged}
            />
          </span>
        </h5>
        <div className="my-3">
          <textarea
            id="comments"
            type="text"
            className="form-control"
            style={{ height: "50px" }}
            placeholder="Write comment here..."
            name="comments"
            onClick={() => handleClicked()}
            onChange={(e) => setComments(e.target.value)}
          />
          {isClicked && (
            <div>
              <button
                className="btn btn-primary"
                onClick={(e) => submitHandler(e)}
              >
                Comment
              </button>
              <button className="btn btn-danger" onClick={() => handleCancel()}>
                Batal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
