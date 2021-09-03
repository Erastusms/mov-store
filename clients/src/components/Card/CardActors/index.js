import React from "react";

export default function CardActors(props) {
  const { actor_name, char_name, filename, Movie } = props.data;
  
  return (
    <div className="col">
      <div className="card" style={{height: "250px", width: "150px"}}>
          <img
            src={`http://localhost:3000/images/actors/${Movie.title}/${filename}`}
            alt={`http://localhost:3000/images/actors/${Movie.title}/${filename}`}
            title={actor_name}
            height="150"
            className="card-img-top rounded"
          />
          <div className="card-body">
            <small className="fw-bolder">{actor_name}</small>
            <br />
            <small className="text-muted">{char_name}</small>
          </div>
        </div>
      </div>
  );
}
