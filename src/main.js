import Vue from "vue";
import App from "./App.vue";
import { firestorePlugin } from 'vuefire';
import router from "./router";
import { store } from "./store/store";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

// Global use
Vue.config.productionTip = false; 
// Your web app's Firebase configuration


// Initialize Firebase
Vue.use(firestorePlugin);
Vue.use(vSelect);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
