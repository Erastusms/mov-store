import React from "react";
import Featured from "components/Featured";
import ListItemPage from "./ListItemPage";

export default function HomePage({ login, userLogin }) {
  return (
    <div>
      <Featured />
      <ListItemPage />
    </div>
  );
}
