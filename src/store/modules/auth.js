import { getCookie } from "../../utils/cookie";
const state = {
  user: {
    uName: getCookie("userName") || "",
    token: getCookie("token") || "",
    uId: getCookie("userId") || "",
    uBirth: "",
    uMail: "",
    uTel: ""
  },
  view: {}
};

const getters = {};

const mutations = {};

const actions = {};

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
