import axios from "axios";
import router from "@/router/index";
import { getCookie } from "@/utils/cookie";
const domain = process.env.VUE_APP_API_URL;

const request = {
  get(path, header) {
    const currentUrl = document.location.href;
    console.log("get Api Current URL", currentUrl);
    console.log("get Path", path);
    return axios
      .get(`${domain + path}`, header)
      .catch(error => {
        if (error.response) {
          console.log("error", error);
          console.log("error2", error.response);
          if (
            error.response.status === 500
          ) {
            router.push("/error");
          }
          if (error.response.statusText === "Unauthorized") {
            console.log("error caused URL", document.location.href);
          }
          return Promise.reject(error.response);
        } else if (error.request) {
          // 요청은 성공적으로 생성되었으나 서버로부터 아무 응답이 없는 경우
          console.log("err request", error.request);
        } else {
          // 어떤 이유인지는 모르겠지만 에러가 발생한 경우
          console.log("Error", error.message);
        }
      })
      .finally(() => { });
  },
  patch(path, data, header) {
    const currentUrl = document.location.href;
    console.log("patch Api Current URL", currentUrl);
    console.log("patch Path", path);
    return axios
      .patch(`${domain + path}`, data, header)
      .catch(error => {
        if (error.response) {
          console.log("error", error);
          if (error.response.status === 500) {
            router.push("/error");
          }
          if (error.response.statusText === "Unauthorized") {
            console.log("error caused URL", document.location.href);
          }
          return Promise.reject(error.response);
        } else if (error.request) {
          // 요청은 성공적으로 생성되었으나 서버로부터 아무 응답이 없는 경우
          console.log("err request", error.request);
        } else {
          // 어떤 이유인지는 모르겠지만 에러가 발생한 경우
          console.log("Error", error.message);
        }
      })
      .finally(() => { });
  },
  post(path, data, header) {
    const currentUrl = document.location.href;
    console.log("post Api Current URL", currentUrl);
    console.log("post Path", path);
    return axios
      .post(`${domain + path}`, data, header)
      .catch(error => {
        if (error.response) {
          console.log("error", error);
          if (
            error.response.status === 500
          ) {
            router.push("/error");
          }
          if (error.response.statusText === "Unauthorized") {
            console.log("error caused URL", document.location.href);
          }
          return Promise.reject(error.response);
        } else if (error.request) {
          // 요청은 성공적으로 생성되었으나 서버로부터 아무 응답이 없는 경우
          console.log("err request", error.request);
        } else {
          // 어떤 이유인지는 모르겠지만 에러가 발생한 경우
          console.log("Error", error.message);
        }
      })
      .finally(() => { });
  },
  delete(path, header) {
    const currentUrl = document.location.href;
    console.log("delete Api Current URL", currentUrl);
    console.log("delete Path", path);
    return axios
      .delete(`${domain + path}`, header)
      .catch(error => {
        if (error.response) {
          console.log("error", error);
          if (error.response.status === 500) {
            router.push("/error");
          }
          if (error.response.statusText === "Unauthorized") {
            console.log("error caused URL", document.location.href);
          }
          return Promise.reject(error.response);
        } else if (error.request) {
          // 요청은 성공적으로 생성되었으나 서버로부터 아무 응답이 없는 경우
          console.log("err request", error.request);
        } else {
          // 어떤 이유인지는 모르겠지만 에러가 발생한 경우
          console.log("Error", error.message);
        }
      })
      .finally(() => { });
  },
  put(path, data, header) {
    const currentUrl = document.location.href;
    console.log("put Api Current URL", currentUrl);
    console.log("put Path", path);
    return axios
      .put(`${domain + path}`, data, header)
      .catch(error => {
        if (error.response) {
          console.log("error", error);
          if (
            error.response.status === 500
          ) {
            router.push("/error");
          }
          if (error.response.statusText === "Unauthorized") {
            console.log("error caused URL", document.location.href);
          }
          return Promise.reject(error.response);
        } else if (error.request) {
          // 요청은 성공적으로 생성되었으나 서버로부터 아무 응답이 없는 경우
          console.log("err request", error.request);
        } else {
          // 어떤 이유인지는 모르겠지만 에러가 발생한 경우
          console.log("Error", error.message);
        }
      })
      .finally(() => { });
  }
};

export const user = {
  joinUser(userData) {
    return request
      .post("api/v1/user/join", userData)
      .then(({ data }) => data);
  }
};

export const maintaince = {
  login() {
    return request
      .post("api/v1/user/login", {
        headers: {
          Authorization: "Bearer " + getCookie("token")
        }
      })
      .then(({ data }) => data);
  }
};
