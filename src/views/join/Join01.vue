<template>
  <div class="app-wrap join">
    <app-header
      :transDataSet="transData"
      :style="computedTopWidgetHeight"
    ></app-header>
    <div class="bgimg rotate" :style="computedStyleBg"></div>
    <div class="container">
      <div class="title">
        <h2 class="scale-h1">닉네임을<br />등록해 주세요!</h2>
        <span class="status scale-body">(1/2)</span>
      </div>
      <div class="article-wrapper">
        <div class="article">
          <label class="scale-body">닉네임</label>
          <div class="input-wrap">
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <button type="button" class="scale-subtitle" @click="goNext()">
          다음
        </button>
      </div>
    </div>
    <div class="bgimg"></div>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader
  },
  data() {
    return {
      transData: {
        headerName: "회원가입",
        isOpaque: true,
        prevUrl: "/preRecord",
        leftButton: ""
      },
       contextPaddingTop: 0,
      topWidgetHeight: null
    };
  },
  mounted() {
    this.scrollBgSet();
  },
  computed: {
    computedStyleObject() {
      return {
        paddingTop: this.contextPaddingTop + "px"
      };
    },
    computedStyleBg() {
      return {
        top: this.topWidgetHeight + "px"
      };
    },
    computedTopWidgetHeight() {
      return {
        height: this.topWidgetHeight + "px"
      };
    }
  },
  methods: {
    scrollBgSet() {
      const topWidget = document.querySelector(".app-header");
      const topBg = document.querySelector(".rotate");
      const topValue =
        topWidget.getBoundingClientRect().height +
        topBg.getBoundingClientRect().height;
      this.contextPaddingTop = topValue;
      this.topWidgetHeight = topWidget.getBoundingClientRect().height;
    },
    goNext() {
      this.$router.push("/join02");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/join.scss";
</style>
