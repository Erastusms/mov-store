import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginForm, RegisterForm } from "components/Form";
import Guest from "./Guest";
export default function LandingPage({ login, userLogin, getToken }) {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Guest />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} userLogin={userLogin} getToken={getToken} />
        </Route>
        <Route exact path="/register">
          <RegisterForm />
        </Route>
      </Switch>
    </Router>
  );
}
