<template>
  <div id="app" :style="computedHeight">
    <div class="spinner" v-if="isLoading">
      <transition name="slide-fade" mode="in-out" v-if="isLoading">
        <beat-loader
          :loading="isLoading"
          :color="loader.color"
          :size="loader.size"
        ></beat-loader>
      </transition>
    </div>
    <router-view
      :class="{ none: isLoading }"
      @viewPageUploaded="getResponsiveHeight()"
      @setLoader="loaderOn()"
      @offLoader="loaderOff()"
    />
  </div>
</template>
<script>
import { resposiveHeight } from "@/utils/checkHeight";
import BeatLoader from "vue-spinner/src/BeatLoader";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      responsiveHeight: "",
      loader: {
        loading: false,
        color: "#ff6565",
        size: "18px"
      }
    };
  },
  mounted() {
    this.getResponsiveHeight();
  },
  methods: {
    loaderOn() {
      console.log("APP setLoader 실행됨");
      this.SET_LOADER(true);
    },
    loaderOff() {
      console.log("APP offLoader 실행됨");
      this.SET_LOADER(false);
    },
    getResponsiveHeight() {
      this.responsiveHeight = screen.height;
      const address = document.location.href;
      if (address.indexOf("8080") === -1) {
        this.SET_LOADER(true);
      }

      setTimeout(() => {
        console.log("screeHeight", screen.height);
        console.log(
          "viewHeight",
          document.querySelector(".app-wrap").clientHeight
        );
        this.responsiveHeight = screen.height;
        let height;
        if (resposiveHeight()) {
          height = document.querySelector(".app-wrap").clientHeight;
        } else {
          height = screen.height;
        }
        this.responsiveHeight = height;
        /*
        const height = resposiveHeight()
          ? document.querySelector(".app-wrap").clientHeight
          : screen.height;
        this.responsiveHeight = height;
        */
        if (address.indexOf("8080") === -1) {
          this.SET_LOADER(false);
        }
      }, 1100);
    },
    ...mapMutations("basic", ["SET_LOADER"])
  },
  components: {
    BeatLoader
  },
  computed: {
    ...mapState("basic", ["isLoading"]),
    computedHeight() {
      return {
        height: this.responsiveHeight + "px"
      };
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.getResponsiveHeight();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "assets/css/init.css";
@import "assets/css/common.css";
@import "assets/fonts/stylesheet.css";
</style>
