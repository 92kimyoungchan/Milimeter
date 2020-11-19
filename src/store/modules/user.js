import { user } from "@/api";

const state = {
  user: {
    birth: "",
    devicleKey: "",
    gender: "M",
    nickName: "",
    pushAgree: false,
    email: "",
    uid: "",
    areas: []
  }
};

const getters = {
  /*
  GET_FINDED_ID: state => state.basic.userId,
  */

};

const mutations = {
  /*
  SET_ISCHECKED_PW(state, isCheckedPw) {
    state.view.isCheckedPw = isCheckedPw;
  },
  */
};

const actions = {
  /*
  JOIN_BASICUSER_DATA({ }, userData) {
    return user.joinBasicUser(userData);
  }
   */
  JOIN_USER({ }, userData) {
    return user.joinUser(userData);
  }
};

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
