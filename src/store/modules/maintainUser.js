import { maintaince } from "@/api";
import { setCookie, getCookie, removeCookie } from "@/utils/cookie";

const state = {
  maintaince: {
    nickname: getCookie("nickname") || null,
    token: getCookie("token") || null,
    joinDone: false
  }
};

const mutations = {
  SET_LOGIN_RESPONSE(state, loginResponse) {
    state.maintaince.nickname = loginResponse.nickname
    state.maintaince.joinDone = loginResponse.joinDone
  }
};

const getters = {
  GET_NICK_NAME: state => state.maintaince.nickName,
  GET_JOIN_DONE: state => state.maintaince.joinDone,
};

const actions = {
  LOGIN({ commit }, userData) {
    return maintaince.login(userData).then(data => {
      console.log("로그인 후 데이터", data);
      let transedData
      if (data.status !== 203) {
        transedData = {
          nickname: data.nickname,
          joinDone: true
        };
        setCookie("nickname", data.nickname, { secure: true, expires: 30 });
      } else {
        transedData = {
          nickname: null,
          joinDone: false
        };
      }
      commit("SET_LOGIN_RESPONSE", transedData);
    });
  }
  /*
  LOGIN({ commit }, userData) {
    return maintaince.login(userData).then(data => {
      const transedData = {
        userId: data.response.userId,
        token: data.response.token
      };
      commit("SET_LOGIN_RESPONSE", transedData);
      setCookie("userId", data.response.userId, { secure: true, expires: 30 });
      setCookie("token", data.response.token, { secure: true, expires: 30 });
    });
  }
  */
};

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
