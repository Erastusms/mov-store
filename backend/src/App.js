import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage, Dashboard } from "pages";
import { Header, Footer } from "parts";
import { Loading } from "components"
import { AdminAPI } from "admins";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updated, setUpdated] = useState()

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLogin(true);
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLogin(false);
      localStorage.clear();
    }, 500);
  };

  const handleUp = async () => {
    setUpdated(new Date());
    return true;
  };

  useEffect(async () => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      const authorized = await AdminAPI(access_token);

      if (authorized.status === 200) {
        setLogin(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      // setLogin(false);
      setIsLoading(false);
    }
  }, []);

  return (
    <Router>
      {isLoading ? (
          <Loading />
        ) : login ? (
          <>
            {/* <Header  updated={updated} /> */}
            <Dashboard handleLogout={handleLogout} handleUpdateProfile={() => handleUp()} />
          </>
        ) : (
        // </div>
        // </div>
        <LoginPage handleLogin={handleLogin} />
      )}
    </Router>
  );
}

export default App;
