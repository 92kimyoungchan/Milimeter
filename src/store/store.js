import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import basic from "./modules/basic";
import user from "./modules/user";
import maintaince from "./modules/maintainUser";
import room from "./modules/room";

const modules = {
  auth,
  basic,
  maintaince,
  user,
  room
};

const plugins = [
  createPersistedState({
    paths: ["maintaince", "room"]
  })
];
Vue.use(Vuex);
export const store = new Vuex.Store({
  modules,
  plugins
});
