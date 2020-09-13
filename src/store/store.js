import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import basic from "./modules/basic";

const modules = {
  auth,
  basic
};

const plugins = [
  createPersistedState({
    paths: ["consultation"]
  })
];
Vue.use(Vuex);
export const store = new Vuex.Store({
  modules,
  plugins
});
