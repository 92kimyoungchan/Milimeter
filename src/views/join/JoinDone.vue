<template>
  <div class="app-wrap join">
    <div class="container whole">
      <div class="welcome">
        <div class="header">
          <img src="@/assets/images/fanfare_img.svg" />
        </div>
        <div class="content">
          <h3>Welcome</h3>
          <p class="scale-body-2">밀리미터에 오신 것을<br />환영합니다!</p>
        </div>
        <div class="footer">
          <img src="@/assets/images/signature_img.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    
      setTimeout(() => {
        this.$router.push("/");
      }, 1300);
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.container.whole {
  padding: 0;
}
.welcome {
  width: 194px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: calc(50% - 48.5px);
  position: absolute;
  .header {
    img {
    }
  }
  .content {
    margin: 10px 0 0 0;
    h3 {
      margin: 0 0 5px 0;
      text-align: center;
      font-size: 40px;
      line-height: 44px;
      font-family: "jua";
      color: rgb(41, 42, 43);
      font-weight: normal;
    }
    p {
      text-align: center;
    }
  }
  .footer {
    text-align: center;
    img {
    }
  }
}
</style>
