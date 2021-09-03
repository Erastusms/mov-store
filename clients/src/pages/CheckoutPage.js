import { CheckoutForm } from "components/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutPage() {
  const API_URL = "http://localhost:3000";
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      let result = await axios({
        method: "GET",
        url: `${API_URL}/api/v1/profile`,
        headers: {
          access_token,
        },
      });
      setProfile(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid p-5">
      <CheckoutForm key={profile.id} profile={profile} />
    </div>
  );
}
