import React from "react";
import { Route, Switch } from "react-router-dom";
import { Sidebar, Header, Footer } from "parts";
import {
  ListMovies,
  ListUsers,
  Dashboard,
  Orders,
  EditMovie,
  DetailMovie,
  AccountPage,
} from "pages";

export default function MainPage({ handleLogout, handleUpdateProfile }) {
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
            <Dashboard />
          </Route>
          <Route exact path="/admin/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/admin/account">
            <AccountPage />
          </Route>
          <Route exact path="/admin/list-movies">
            <ListMovies />
          </Route>
          <Route exact path="/admin/list-movies/detail/:id">
            <DetailMovie />
          </Route>
          <Route exact path="/admin/list-movies/edit/:id">
            <EditMovie />
          </Route>
          <Route exact path="/admin/list-users">
            <ListUsers />
          </Route>
          <Route exact path="/admin/orders">
            <Orders />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  );
}
