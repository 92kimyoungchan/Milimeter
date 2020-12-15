
const state = {
  room: {
    title: null,
    personel: null,
    gender: null,
    mealTime: null,
    minAge: null,
    maxAge: null,
    store: null,
    personelStatus: false
  }
};

const getters = {
  /*
  GET_FINDED_ID: state => state.basic.userId,
  */
 GET_ROOM: state => state.room

};

const mutations = {
  /*
  SET_ISCHECKED_PW(state, isCheckedPw) {
    state.view.isCheckedPw = isCheckedPw;
  },
  */
 SET_ROOM(state, roomInfo) {
   state.room = roomInfo;
 }
};

const actions = {
  
};

export default {
  strict: process.env.NODE_ENV !== "production",
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};
