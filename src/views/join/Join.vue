<template>
  <div class="app-wrap join">
    <app-header
      :transDataSet="transData"
      :style="computedTopWidgetHeight"
      @prevSection="test()"
    ></app-header>
    <div class="bgimg rotate" :style="computedStyleBg"></div>
    <div class="container" v-if="!step2">
      <div class="title">
        <h2 class="scale-h1">닉네임을<br />등록해 주세요!</h2>
        <span class="status scale-body">(1/2)</span>
      </div>
      <div class="article-wrapper">
        <div class="article">
          <label class="scale-body">닉네임</label>
          <div class="input-wrap">
            <input
              type="text"
              v-model="form.name.value"
              @keyup="checkName()"
              @blur="checkName()"
            />
          </div>
          <span class="warn-message scale-caption" v-if="form.name.hasError">{{
            form.name.errorTxt
          }}</span>
        </div>
      </div>
      <div class="button-wrap" :class="{active: form.name.flag}">
        <button type="button" class="scale-subtitle"  @click="goSecond()">다음</button>
      </div>
    </div>
    <div class="container" v-else>
      <div class="title">
        <p class="welcome-comment scale-body">{{ form.name.value }} 님 반가워요:)</p>
        <h2 class="scale-h1">성별과 연령대를<br />알려주세요!</h2>
        <span class="status scale-body">(2/2)</span>
      </div>
      <div class="article-wrapper">
        <div class="article">
          <label class="scale-body">성별</label>
          <div class="radio-btn-wrap">
            <div class="item" @click="selectGender(0)">
              <div class="img-wrap">
                <img
                  src="@/assets/images/check_icon.svg"
                  v-if="form.gender.value === 'M'"
                />
                <img src="@/assets/images/uncheck_icon.svg" v-else />
              </div>
              <span class="radio-name scale-body">남성</span>
            </div>
            <div class="item" @click="selectGender(1)">
              <div class="img-wrap">
                <img
                  src="@/assets/images/check_icon.svg"
                  v-if="form.gender.value === 'F'"
                />
                <img src="@/assets/images/uncheck_icon.svg" v-else />
              </div>
              <span class="radio-name scale-body">여성</span>
            </div>
            <span class="warn-message scale-caption" v-if="form.gender.hasError">{{
              form.gender.errorTxt
            }}</span>
          </div>
        </div>
        <div class="article">
          <label class="scale-body">생년월일</label>
          <div class="input-wrap center">
            <input
              type="text"
              v-model="form.birth.value"
              @keyup="birthDateCheck()"
              @blur="birthDateCheck()"
              @input="formatbirthDate(form.birth.value)"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <span class="warn-message scale-caption" v-if="form.birth.hasError">{{
            form.birth.errorTxt
          }}</span>
        </div>
      </div>
      <div class="button-wrap" :class="{active: form.birth.flag && form.gender.flag}">
        <button type="button" class="scale-subtitle" @click="done()">다음</button>
      </div>
    </div>
    <div class="bgimg"></div>
    <default-popup v-if="checkPopup" :popupSet="popupSet" />
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import DefaultPopup from "@/components/DefaultPopup";
import { mapActions, mapState, mapMutations } from "vuex";
import Firebase from "firebase";
import { setCookie } from "@/utils/cookie";
export default {
  components: {
    AppHeader,
    DefaultPopup
  },
  data() {
      return {
      popupSet: {
        confirmBtnText: "확인",
        nextLink: null,
        buttonType: "default",
        iconUrl: "cancel_alert_icon.svg"
      },
      transData: {
        headerName: "회원가입",
        isOpaque: true,
        prevUrl: "/about",
        leftButton: "prev",
      },
      appData: "",
      contextPaddingTop: 0,
      topWidgetHeight: null,
      step2: false,
      form: {
        name: {
          value: "",
          flag: false,
          hasError: false,
          errorTxt: "*14자리 이내의 문자를 입력해주세요.",
        },
        birth: {
          value: "",
          flag: false,
          hasError: false,
          errorTxt: "*6자리의 숫자를 입력해주세요.",
        },
        gender: {
          value: "",
          hanValue: "",
          flag: false,
          hasError: false,
          errorTxt: "성별을 선택해주세요.",
        },
      },
    };
  },
  mounted() {
    this.scrollBgSet();
  },
  computed: {
    ...mapState("basic", ["checkPopup"]),
    computedStyleObject() {
      return {
        paddingTop: this.contextPaddingTop + "px",
      };
    },
    computedStyleBg() {
      return {
        top: this.topWidgetHeight + "px",
      };
    },
    computedTopWidgetHeight() {
      return {
        height: this.topWidgetHeight + "px",
      };
    },
    genderComputed() {
      if (this.form.gender.value === "") {
        return null;
      } else {
        if (this.form.gender.value === "M") {
          return true;
        } else if (this.form.gender.value === "F") {
          return false;
        }
      }
    },
  },
  methods: {
    ...mapMutations("basic", ["SET_POPUP"]),
    ...mapActions("user", ["JOIN_USER"]),
    scrollBgSet() {
      const topWidget = document.querySelector(".app-header");
      const topBg = document.querySelector(".rotate");
      const topValue =
        topWidget.getBoundingClientRect().height + topBg.getBoundingClientRect().height;
      this.contextPaddingTop = topValue;
      this.topWidgetHeight = topWidget.getBoundingClientRect().height;
    },
    goSecond() {
      if (this.form.name.flag) {
        this.step2 = true;
        this.transData.prevUrl = "another";
      } else {
        this.form.name.hasError = true;
        this.SET_POPUP(true);
        this.popupSet.title = "닉네임 확인";
        this.popupSet.content =
          "닉네임을 확인해주세요.";
        this.popupSet.popType = "defaultType";
        this.popupSet.confirmBtnText = "확인";
        this.popupSet.buttonType = "alone"
      }
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
    preApi() {
      this.appAuthCheck();
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then(function (idToken) {
            setCookie("token", idToken, { secure: true, expires: 30 });
          });
        }
      });
    },
    async done() {
      const transPopItem = [];
      if (!this.form.name.flag) {
        this.form.name.hasError = true;
        this.step2 = false;
        this.SET_POPUP(true);
        this.popupSet.title = "닉네임 확인";
        this.popupSet.content =
          "닉네임을 확인해주세요.";
        this.popupSet.popType = "defaultType";
        this.popupSet.confirmBtnText = "확인";
        this.popupSet.buttonType = "alone"
        return false;
      }
      if (!this.form.gender.flag) {
        this.form.gender.hasError = true;
        this.SET_POPUP(true);
        this.popupSet.title = "성별 확인";
        this.popupSet.content =
          "성별을 확인해주세요.";
        this.popupSet.popType = "defaultType";
        this.popupSet.confirmBtnText = "확인";
        this.popupSet.buttonType = "alone"
        return false;
      }
      if (!this.form.birth.flag) {
        this.form.birth.hasError = true;
        this.SET_POPUP(true);
        this.popupSet.title = "생년월일 확인";
        this.popupSet.content =
          "생년월일을 확인해주세요.";
        this.popupSet.popType = "defaultType";
        this.popupSet.confirmBtnText = "확인";
        this.popupSet.buttonType = "alone"
        return false;
      }
      const userData = {
        birth: this.form.birth.value,
        deviceKey: "naddana9209",
        gender: this.form.gender.value,
        nickName: this.form.name.value,
        pushAgree: true,
      };
      await this.preApi();
      await this.JOIN_USER(userData).then(() => {
        sessionStorage.setItem("joinUserId", userData.userId);
         this.$router.push("/joinDone");
      });
      /* 
Firebase.auth()
        .currentUser.getIdToken(true)
        .then((response) => {
          getToken = response;
          setCookie("token", getToken, { secure: true, expires: 30 });
          this.JOIN_USER(userData).then(() => {
            sessionStorage.setItem("joinUserId", userData.userId);
            const item1 = {
              title: "회원가입 완료",
              content: "회원가입을 완료하였습니다.",
            };
            transPopItem.push(item1);
            this.popupSet.count = "noticePop";
            this.popupSet.inPopItem = transPopItem;
            this.SET_POPUP(true);
            this.popupSet.modalImg = "cha.svg";
            this.popupSet.doQuit = true;
            this.popupSet.title = undefined;
            this.popupSet.content = undefined;
            this.popupSet.nextLink = "/joinDone";
          });
        });
        */
    },
    test() {
      this.step2 = false;
      this.transData.prevUrl = "/about";
    },
    checkName() {
      this.form.name.flag = false;
      this.form.name.hasError = true;
      const name = this.form.name.value.replace(/\s/gi, "");
      if (name === "") {
        this.form.name.flag = false;
        this.form.name.hasError = true;
        this.form.name.errorTxt = "*닉네임을 입력해주세요.";
        return false;
      }
      const isHan = /^[a-z|A-Z|0-9|]{6,21}$/;
      if (!isHan.test(name)) {
        this.form.name.errorTxt = "*영문 및 숫자만 입력이 가능합니다.";
        this.form.name.flag = false;
        this.form.name.hasError = true;
        return false;
      }
      this.form.name.flag = true;
      this.form.name.hasError = false;
      this.form.name.errorTxt = "";
      return true;
    },
    selectGender(order) {
      const lengthValue = document.querySelector(".radio-btn-wrap").childElementCount;
      for (var i = 0; i < lengthValue; i++) {
        if (
          document
            .querySelector(".radio-btn-wrap")
            .children[i].classList.contains("active")
        ) {
          document
            .querySelector(".radio-btn-wrap")
            .children[i].classList.remove("active");
        }
      }
      document.querySelector(".radio-btn-wrap").children[order].classList.add("active");

      if (order === 0) {
        this.form.gender.value = "M";
      } else {
        this.form.gender.value = "F";
      }
      this.form.gender.flag = true;
      this.form.gender.hasError = false;
    },
    birthDateCheck() {
      this.form.birth.flag = false;
      this.form.birth.hasError = true;
      const birth = this.form.birth.value.replace(/\s/gi, "");
      if (birth === "") {
        this.form.birth.flag = false;
        this.form.birth.hasError = true;
        this.form.birth.errorTxt = "*생년월일 입력해주세요.";
        return false;
      }
      const isBirth = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (!isBirth.test(birth)) {
        this.form.birth.errorTxt = "*8자의 숫자로 입력해주세요";
        this.form.birth.flag = false;
        this.form.birth.hasError = true;
        return false;
      }
      this.form.birth.flag = true;
      this.form.birth.hasError = false;
      this.form.birth.errorTxt = "";
      return true;
    },
    formatbirthDate(obj) {
      this.form.birth.value = this.formatBirth(obj);
    },
    formatBirth(obj) {
      const number = obj.toString().replace(/[^0-9]/g, "");
      let birth = "";
      if (number.length < 5) {
        return number;
      } else if (number.length < 7) {
        birth += number.substr(0, 4);
        birth += "-";
        birth += number.substr(4, 5);
        return birth;
      } else {
        birth += number.substr(0, 4);
        birth += "-";
        birth += number.substr(4, 2);
        birth += "-";
        birth += number.substr(6, 2);
        return birth;
      }
    }
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/join.scss";
</style>
