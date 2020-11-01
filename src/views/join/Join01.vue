<template>
  <div class="join">
    <div class="container">
      <app-header :transDataSet="transData"></app-header>
      <div class="title">
        <h2 class="scaleH1">닉네임을<br />등록해 주세요!</h2>
        <span class="status">(1/2)</span>
      </div>
      <div class="article-wrapper">
        <div class="article">
          <label>닉네임</label>
          <div class="input-wrap">
            <input type="text" />
          </div>
        </div>
      </div>
      <div class="button-wrap">
        <button type="button" @click="goNext()">다음</button>
      </div>
    </div>
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
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {
    goNext() {
      this.$router.push("/join02");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/css/join.css";
</style>
