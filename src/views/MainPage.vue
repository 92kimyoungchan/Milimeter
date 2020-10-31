<template>
  <div class="home">
    <div class="container">
      <div class="welcome">
        <h1 class="scaleH1">Hello</h1>
        <p class="scaleSubtitle">혼밥 말고</p>
        <p class="scaleSubtitle">함께 모여 식사해요!</p>
      </div>
      <div class="meal-wrap">
        <div class="meal">
          <div class="item left">
            <div class="img-wrap">
              <img src="@/assets/images/meal_img_normal.svg" />
            </div>
          </div>
          <div class="item">
            <div class="img-wrap">
              <img src="@/assets/images/meal_img_point.svg" />
            </div>
          </div>
          <div class="item right">
            <div class="img-wrap">
              <img src="@/assets/images/meal_img_normal.svg" />
            </div>
          </div>
        </div>
        <h6 class="signiture scaleSubtitle">밀리미터</h6>
      </div>
      <div class="login-function">
        <div class="button-wrap">
          <button type="button" class="scaleTitle" @click="goAbout()">
            Google 로그인
          </button>
        </div>
        <a class="scaleBody">밀리미터에 대해 더 알고 싶나요?</a>
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
  mounted() {
    this.transedMain();
  },
  methods: {
    transedMain() {
      setTimeout(() => {
        document.querySelector(".signiture").style.opacity = "0";
        document.querySelector(".welcome").style.opacity = "1";
        document.querySelector(".login-function").style.opacity = "1";
      }, 900);
    },
    goAbout() {
      this.$router.push("/about");
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  .container {
    .welcome {
      width: 100%;
      position: Absolute;
      text-align: center;
      top: 110px;
      opacity: 0;
      transition:.5s;
      h1 {
        font-family: jua;
        font-size: 50px;
        text-align: center;
        letter-spacing: 10px;
        line-height: 55px;
        color: #292a2b;
        position: relative;
        padding-right: 8px;
        width: fit-content;
        margin: 0 auto 10px auto;
        &:after {
          position: absolute;
          content: "";
          right: 0;
          bottom: 0;
          background: rgb(95, 187, 146);
          height: 8px;
          width: 8px;
          border-radius: 50%;
        }
      }
      p {
        color: rgb(41, 42, 43);
      }
    }
    .meal-wrap {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      overflow: hidden;
      .meal {
        display: flex;
        justify-content: space-between;
        margin: 0 0 20px 0;
        .item {
          &.left {
            margin-left: -45px;
          }
          &.right {
            margin-right: -45px;
          }
          .img-wrap {
            img {
            }
          }
        }
      }
      h6.signiture {
        color: rgb(41, 42, 43);
        text-align: center;
        font-family: jua;
        font-size: 22px;
        line-height: 24px;
        letter-spacing: 4.4px;
        color: rgb(41, 42, 43);
          transition:.5s;
      }
    }
    .login-function {
      position: absolute;
      bottom: 150px;
      width: calc(100% - 100px);
      margin: 0 auto;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
        transition:.5s;
      .button-wrap {
        margin: 0 0 15px 0;
        height: 50px;
        background: rgb(36, 34, 73);
        position: relative;
        display: flex;
        align-content: center;
        justify-content: center;
        border-radius: 10px;
        button {
          background: transparent;
          color: #fff;
          text-align: center;
          border: 0;
          width: 100%;
          height: 100%;
          font-size: 18px;
          line-height: 24px;
          cursor: pointer;
        }
      }
      a {
        color: rgb(141, 143, 145);
        text-align: center;
        text-decoration: underline;
        cursor: pointer;
        display: block;
      }
    }
  }
}
</style>
