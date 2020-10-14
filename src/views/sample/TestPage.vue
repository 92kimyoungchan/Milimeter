<template>
  <div class="login-area">
    <LoginSample msg="Welcome to Your Vue.js App" />
    <a href="https://github.com/guruahn/vue-google-oauth2-front-sample">
      <img
        width="149"
        height="149"
        src="https://github.blog/wp-content/uploads/2008/12/forkme_right_orange_ff7600.png?resize=149%2C149"
        class="forkme attachment-full size-full"
        alt="Fork me on GitHub"
        data-recalc-dims="1"
      />
    </a>
  </div>
</template>



<script>
import LoginSample from "@/components/LoginSample";

export default {
  name: "TestPage",
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {},
  components: {
    LoginSample
  }
};
</script>
<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.forkme {
  position: fixed;
  right: 0;
  top: 0;
}
</style>