import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import basic from "./modules/basic";
import maintaince from "./modules/maintainUser";

const modules = {
  auth,
  basic,
  maintaince
};

const plugins = [
  createPersistedState({
    paths: ["maintaince"]
  })
];
Vue.use(Vuex);
export const store = new Vuex.Store({
  modules,
  plugins
});
