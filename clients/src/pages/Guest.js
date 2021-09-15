import { Footer, Header, Hero } from "parts";
import React from "react";

export default function Guest({ login, userLogin, getToken }) {
  return (
    <div>
      <Header login={login} userLogin={userLogin} getToken={getToken} />
      <Hero login={login} userLogin={userLogin} getToken={getToken} />
      <Footer />
    </div>
  );
}
