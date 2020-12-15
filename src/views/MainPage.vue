<template>
  <div class="home app-wrap">
    <div class="container own">
      <div class="welcome">
        <h1 class="scale-h1">Hello</h1>
        <p class="scale-subtitle">혼밥 말고</p>
        <p class="scale-subtitle">함께 모여 식사해요!</p>
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
        <h6 class="signiture scale-subtitle">밀리미터</h6>
      </div>
      <div class="login-function">
        <div class="button-wrap">
          <button type="button" class="scale-title" @click="goAbout()">
            Google 로그인
          </button>
        </div>
        <router-link to="/about" class="scale-body">
          밀리미터에 대해 더 알고 싶나요?
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { setCookie } from "@/utils/cookie";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import Firebase from "firebase";
export default {
  components: {},
  data() {
    return {
      appData: "",
      appLoginPassed: false,
    };
  },
  mounted() {
    this.transedMain();
  },
  methods: {
    ...mapActions("maintaince", ["LOGIN"]),
    transedMain() {
      console.log("before-screenHeight", screen.height);
      setTimeout(() => {
        if (screen.height < 812) {
          document.querySelector(".container").classList.add("small");
        }
        document.querySelector(".signiture").classList.add("loaded");
        document.querySelector(".welcome").classList.add("loaded");
        document.querySelector(".login-function").classList.add("loaded");
        console.log("after-screenHeight", screen.height);
      }, 2200);
    },
    appAuthCheck() {
      if (!Firebase.apps.length) {
        const config = {
          apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
          appId: process.env.VUE_APP_FIREBASE_APP_ID,
          projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
          authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
        };
        this.appData = Firebase.initializeApp(config);
      }
    },
    async goAbout() {
      await this.appAuthCheck();
      await this.carry();
    },
    async doLoginOwnApp() {
      try {
        await this.LOGIN().then(() => {
          this.appLoginPassed = this.GET_JOIN_DONE;
          if (this.appLoginPassed) {
             this.$router.push("/room");
          } else {
            this.$router.push("/join");
          }
        });
      } catch (error) {
        console.log("앱 자체 로그인");
        console.log("오류메시지 찍기", error);
      }
    },
    carry() {
      const provider = new Firebase.auth.GoogleAuthProvider();
      Firebase.auth()
        .signInWithPopup(provider)
        .then(async (user) => {
          let getToken;
          await Firebase.auth()
            .currentUser.getIdToken(true)
            .then((response) => {
              getToken = response;
              console.log("구글로그인 후 추출된 토근", getToken);
              setCookie("token", getToken, { secure: true, expires: 30 });
              this.doLoginOwnApp();
            });
          // action
        });
    },
  },
  computed: {
    ...mapGetters("maintaince", ["GET_JOIN_DONE"]),
  },
};
</script>

<style lang="scss" scoped>
.home {
  .container {
    &.small {
      .welcome {
        top: 12.5%;
      }
      .login-function {
        bottom: 10%;
      }
    }
    .welcome {
      width: 100%;
      position: Absolute;
      text-align: center;
      top: 110px;
      opacity: 0;
      transition: 0.5s;
      &.loaded {
        opacity: 1;
      }
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
        transition: 0.5s;
        margin: 20px 0 0 0;
        &.loaded {
          display: none;
        }
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
      transition: 0.5s;
      &.loaded {
        opacity: 1;
      }
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
