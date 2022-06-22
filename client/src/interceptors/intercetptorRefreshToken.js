import axios from 'axios'
import jwt_decode from "jwt-decode";
//import { useDispatch } from 'react-redux';

export const interceptorRefreshToken = async (user, axiosJWT) => {


  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/refresh", { token: user.refreshToken });
      localStorage.setItem("user", JSON.stringify({
        ...user,
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      }))
      return res.data;
    } catch (err) {
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}