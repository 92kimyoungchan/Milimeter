const state = {
  checkPopup: false,
  responsiveHeight: "",
  isLoading: false
};

const getters = {
  getPopupState: state => state.checkPopup,
  getReponsiveHeight: state => state.responsiveHeight
};

const mutations = {
  SET_POPUP(state, currentState) {
    state.checkPopup = currentState;
  },
  SET_LOADER(state, isLoading) {
    // console.log({ isLoading })
    if (isLoading) {
      state.isLoading = true;
    } else {
      state.isLoading = false;
    }
  },
  SET_RESPONSIVE_HEIGHT(state, currentState) {
    state.responsiveHeight = currentState;
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
