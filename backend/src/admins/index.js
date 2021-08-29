import axios from "axios";

const API_URL = "http://localhost:3000";

const AdminAPI = async (access_token) => {
  const data = await axios
    .get(`${API_URL}/admin`, {
      headers: {
        access_token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

const LoginAPI = async (form) => {
  const data = await axios
    .post(`${API_URL}/api/v1/login`, form)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });

  return data;
};

export { AdminAPI, LoginAPI };
