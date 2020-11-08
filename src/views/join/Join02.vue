<template>
  <div class="app-wrap join">
    <app-header
      :transDataSet="transData"
      :style="computedTopWidgetHeight"
    ></app-header>
    <div class="bgimg rotate" :style="computedStyleBg"></div>
    <div class="container">
      <div class="title">
        <p class="welcome-comment scale-body">레이똥꾸호이박사 님 반가워요:)</p>
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
                  v-if="genderComputed"
                />
                <img src="@/assets/images/uncheck_icon.svg" v-else />
              </div>
              <span class="radio-name scale-body">남성</span>
            </div>
            <div class="item" @click="selectGender(1)">
              <div class="img-wrap">
                <img
                  src="@/assets/images/uncheck_icon.svg"
                  v-if="genderComputed"
                />
                <img src="@/assets/images/check_icon.svg" v-else />
              </div>
              <span class="radio-name scale-body">여성</span>
            </div>
          </div>
        </div>
        <div class="article">
          <label class="scale-body">생년월일</label>
          <div class="input-wrap center">
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
        leftButton: "prev"
      },
      form: {
        birth: {
          value: "",
          flag: false,
          hasError: false,
          errorTxt: "*6자리의 숫자를 입력해주세요."
        },
        gender: {
          value: "",
          hanValue: "",
          flag: false,
          hasError: false,
          errorTxt: "성별을 선택해주세요."
        }
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
    },
    genderComputed() {
      if (this.form.gender.value === "") {
        return null;
      } else {
        if (this.form.gender.value === "M") {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    selectGender(order) {
      if (
        !document
          .querySelector(".radio-btn-wrap")
          .children[order].classList.contains("active")
      ) {
        if (order === 0) {
          this.form.gender.value = "M";
          this.form.gender.flag = true;
        } else {
          this.form.gender.value = "F";
          this.form.gender.flag = true;
        }
      }
    },
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
