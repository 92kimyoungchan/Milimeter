import Vue from "vue";
import App from "./App.vue";
import GAuth from 'vue-google-oauth2'
import router from "./router";
import { store } from "./store/store";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

// Global use
Vue.config.productionTip = false;
Vue.use(vSelect);
Vue.use(GAuth, {
  clientId: '56019965047-0t3qrkpa4420if93b557lp6ub32ah2e4.apps.googleusercontent.com&KzUWksdB5Eu66LNLhub7B2s4', scope: 'email', prompt: 'consent', fetch_basic_profile: false
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
