import { user } from "@/api";

const state = {
  user: {
    name: "",
    birth: "",
    gender: ""
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
};

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
