import axios from "axios";
import { signout } from "./axios";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    console.log("request error");
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      signout();
      history.push("/login");
      history.go(0);
    }
  }
);
