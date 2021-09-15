import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer, Header } from "parts";
import HomePage from "./HomePage";
import DetailMoviePage from "./DetailMoviePage";
import MyCart from "./MyCartPage";
import MyOrder from "./MyOrder";
import Account from "./AccountPage";
import CheckoutPage from "./CheckoutPage";

export default function MainPage({ login, userLogin }) {
  return (
    <Router>
      <Header login={login} userLogin={userLogin} />
      <Switch>
        <Route exact path="/">
          <HomePage />
          <Footer />
        </Route>
        <Route exact path="/my-carts">
          <MyCart />
        </Route>
        <Route exact path="/my-orders">
          <MyOrder />
        </Route>
        <Route exact path="/my-accounts">
          <Account />
        </Route>
        <Route exact path="/movie-details/:id">
          <DetailMoviePage />
          <Footer />
        </Route>
        <Route exact path="/checkout">
          <CheckoutPage />
        </Route>
      </Switch>
    </Router>
  );
}
