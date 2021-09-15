import React from "react";
import ActorsPage from "./ActorsPage";
import { TableEditMovie } from "parts";

export default function EditMovie() {
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
            Add Actors
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="#add-movies"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Edit Movie
          </a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        {/* disini nanti include tab view table dan add movies */}
        <div
          class="tab-pane fade show active"
          id="show-movies"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <ActorsPage />
        </div>
        {/* konten add movies */}
        <div
          class="tab-pane fade"
          id="add-movies"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <TableEditMovie />
        </div>
      </div>
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
  );
}
