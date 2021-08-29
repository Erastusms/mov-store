import React from "react";
import { Route, Switch } from "react-router-dom";
import { Sidebar, Header, Footer } from "parts";
import { ListMovies, ListUsers } from "pages";

export default function Dashboard({ handleLogout, handleUpdateProfile }) {
  return (
    <div
      className="row"
      style={{
        backgroundColor: "#dedede",
        marginRight: 0,
      }}
    >
      <div className="col-2">
        <Sidebar />
      </div>
      <div className="col-10" style={{ paddingLeft: 16, paddingRight: 0 }}>
        <Header handleLogout={handleLogout} />
        <Switch>
          <Route exact path="/">
            <h1 className="text-center">Ini dashboard</h1>
          </Route>
          <Route exact path="/admin/dashboard">
            <h1 className="text-center">Ini dashboard</h1>
          </Route>
          <Route exact path="/admin/list-movies">
            <ListMovies />
          </Route>
          <Route exact path="/admin/list-users">
            <ListUsers />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}
