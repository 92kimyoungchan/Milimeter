const state = {
  checkPopup: false
};

const getters = {
  getPopupState: state => state.checkPopup
};

const mutations = {
  SET_POPUP(state, currentState) {
    state.checkPopup = currentState;
  }
};

const actions = {};

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
