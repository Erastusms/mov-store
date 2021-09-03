import React from "react";
import { RatingStar } from "rating-star";

export default function MovieComment(props) {
  const { User, comments, rating } = props.data;
  const API_URL = "http://localhost:3000";

  return (
    <div className="row">
      <div className="col-1 text-end">
        <img
          src={`${API_URL}/images/avatars/${User.avatar}`}
          alt={`${API_URL}/images/avatars/${User.avatar}`}
          title={User.name}
          className="rounded-top"
          width="75%"
        />
      </div>
      <div className="col-10 m-0 p-0">
        <h5 className="text-muted">
          {User.name}{" "}
          <span>
            <RatingStar
              id="ratingStar"
              rating={rating}
              size={20}
              numberOfStar={10}
            />
            <span>({rating})</span>
          </span>
        </h5>
        <h4 className="text-black fw-bold">{comments}</h4>
      </div>
    </div>
  );
}
