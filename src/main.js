import Vue from "vue";
import App from "./App.vue";
import { firestorePlugin } from 'vuefire';
import router from "./router";
import { store } from "./store/store";
import vSelect from "vue-select";
import BeatLoader from "vue-spinner/src/BeatLoader";
import "vue-select/dist/vue-select.css";

// Global use
Vue.config.productionTip = false; 
// Your web app's Firebase configuration

// Swiper 6.x
import {
  Swiper as SwiperClass,
  Pagination,
  Mousewheel,
  Autoplay
} from "swiper/core";

import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter";

// Swiper modules
SwiperClass.use([Pagination, Mousewheel, Autoplay]);

// Initialize Firebase
Vue.use(getAwesomeSwiper(SwiperClass));
Vue.use(firestorePlugin);
Vue.use(vSelect);
new Vue({
  router,
  store,
  BeatLoader,
  render: h => h(App)
}).$mount("#app");
