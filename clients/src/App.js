import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LandingPage, MainPage } from "pages";

import "./App.scss";

function App() {
  const [login, setLogin] = useState(false);

  const userLogin = (param) => {
    setLogin(param);
  };
  const getToken = (token) => {
    localStorage.setItem("access_token", token);
  };
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [login]);

  return (
    <Router>
      {login ? (
        <MainPage login={login} userLogin={userLogin} />
      ) : (
        <Route exact path="/">
          <LandingPage
            login={login}
            userLogin={userLogin}
            getToken={getToken}
          />
        </Route>
      )}
    </Router>
  );
}

export default App;
