<template>
  <div class="app-wrap comprise-footer">
    <div class="controller">
      <div class="submit-wrap">
        <span class="cancel scale-subtitle" @click="prev()">취소</span>
        <span class="done scale-subtitle" @click="create()">완료</span>
      </div>
      <h3 class="title scale-title">방 만들기</h3>
    </div>
    <div class="divider"></div>
    <div class="room-info comprise-footer">
      <div class="article">
        <h5 class="title scale-subtitle">방 제목</h5>
        <div class="input-wrap">
          <input type="text"
                 placeholder="방 제목을 입력하세요"
                 v-model="form.title.value"
                 class="scale-body"
                 @keyup="checkTitle()"
                 @blur="checkTitle()"

          />
        </div>
      </div>
      <div class="article slider-wrap">
        <div class="title-flex">
        <h5 class="title scale-subtitle">참여 인원 수 <b>(최대 8명)</b></h5>
        <span class="count scale-body">{{ form.personel.value }}명</span>
        </div>
        <div class="range-wrap">
          <vue-range-slider
            :min="0"
            :max="8"
            ref="slider"
            v-model="form.personel.value"
            @onChange="touchSlider()"
          ></vue-range-slider>
        </div>
      </div>
      <div class="article">
        <h5 class="title scale-subtitle">성별</h5>
        <div class="radio-input-wrap">
          <div class="item">
              <input
                type="radio"
                id="both"
                v-model="form.gender.value"
                value="both"
                @click="checkGender(form.gender.value)"
              />
              <label class="scale-subtitle" for="both">무관</label>
            </div>
            <div class="item">
              <input
                type="radio"
                id="male"
                v-model="form.gender.value"
                value="male"
                @click="checkGender(form.gender.value)"
              />
              <label class="scale-subtitle" for="male">남성</label>
            </div>
            <div class="item">
              <input
                type="radio"
                id="female"
                v-model="form.gender.value"
                value="female"
                @click="checkGender(form.gender.value)"
              />
              <label class="scale-subtitle" for="female">여성</label>
            </div>
          </div>
      </div>
      <div class="article">
        <h5 class="title scale-subtitle">식사시간</h5>
        <div class="input-wrap">
          <input type="text"
                 placeholder="식사시간을 입력해주세요."
                 class="special scale-body"
                 v-model="form.mealTime.value"
                 @keyup="checkTime()"
                 @blur="checkTime()"
          />
        </div>
      </div>
      <div class="article">
        <h5 class="title scale-subtitle">나이제한</h5>
        <div class="cluster">
          <div class="input-wrap"
          :class="{ active: form.minAge.hasError}">
            <input type="text"
                 placeholder="최소"
                 class="special scale-body"
                 v-model="form.minAge.value"
                 @keyup="checkMinAge()"
                 @blur="checkMinAge()"
          />
          <span class="scale-body">세 ~</span>
          </div>
          
           <div class="input-wrap"
           :class="{ active: form.maxAge.hasError}">
             <input type="text"
                 placeholder="최대"
                 class="special scale-body"
                 v-model="form.maxAge.value"
                 @keyup="checkMaxAge()"
                 @blur="checkMaxAge()"
          />
           <span class="scale-body">세</span>
          </div>
        </div>
      </div>
      <div class="article">
        <h5 class="title scale-subtitle">음식점 <b>(선택사항)</b></h5>
        <div class="input-wrap">
          <input type="text"
                 placeholder="음식점을 입력해주세요."
                 v-model="form.store.value"
                 class="scale-body"
                 @keyup="checkStore()"
                 @blur="checkStore()"
          />
        </div>
      </div>
    </div>
    <app-footer :footerSet="footerSet"></app-footer>
     <default-popup v-if="checkPopup" :popupSet="popupSet" />
    </div>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import VueRangeSlider from "vue-range-component";
import "vue-range-component/dist/vue-range-slider.css";
import DefaultPopup from "@/components/DefaultPopup";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    AppFooter,
    VueRangeSlider,
    DefaultPopup,
  },
  data() {
    return {
      footerSet: {
        activeOrder: 2,
      },
      popupSet: {
        confirmBtnText: "확인",
        nextLink: null,
        buttonType: "default",
        iconUrl: "cancel_alert_icon.svg"
      },
     form: {
       title: {
         flag: false,
         value: "",
         hasError: false,
         errorTxt: ""
       },
       personel: {
         flag: false,
         value: "" || "0"
       },
       gender: {
          value: null,
          hanValue: "",
          flag: false,
          hasError: false,
          errorTxt: "성별을 선택해주세요.",
       },
       mealTime: {
          flag: false,
          value: "",
          hasError: false,
          errorTxt: ""
       },
        minAge: {
          flag: false,
          value: "",
          hasError: false,
          errorTxt: ""
       },
        maxAge: {
          flag: false,
          value: "",
          hasError: false,
          errorTxt: ""
       },
       store: {
          flag: false,
          value: "",
          hasError: false,
          errorTxt: ""
       }
     }
    };
  },
  mounted() {},
  computed: {
      ...mapState("basic", ["checkPopup"]),
  },
  methods: {
        ...mapMutations("basic", ["SET_POPUP"]),
        ...mapMutations("room", ["SET_ROOM"]),
        
    prev() {
      this.$router.push("/room")
    },
    create() {
      const roomInfo = {
        title: this.form.title.value,
        personel: this.form.personel.value,
        gender: this.form.gender.value,
        mealTime: this.form.mealTime.value,
        minAge: this.form.minAge.value,
        maxAge: this.form.maxAge.value,
        store: this.form.store.value,
        personelStatus: false
      }
      this.SET_ROOM(roomInfo);
       this.SET_POPUP(true);
        this.popupSet.title = "방 관리";
        this.popupSet.content =
          "방 생성이 완료됬습니다!";
        this.popupSet.popType = "defaultType";
        this.popupSet.confirmBtnText = "확인";
        this.popupSet.buttonType = "alone"
        this.popupSet.nextLink = "/room";
    },
    checkTitle() {
      this.form.title.flag = false;
      this.form.title.hasError = true;
      const Title = this.form.title.value.replace(/\s/gi, "");
      if (Title === "") {
        this.form.title.flag = false;
        return false;
      }
      this.form.title.flag = true;
      this.form.title.hasError = false;
      return true;
    },
    touchSlider() {
      this.form.personel.flag = true;
      this.form.personel.hasError = false;
    },
   checkGender(data) {
      if (data === "male") {
          this.form.gender.hanValue = "남성";
        } else if (data === "female") {
          this.form.gender.hanValue = "여성";
        } else {
            this.form.gender.hanValue = "무관";
        }
        this.form.gender.flag = true;
        this.form.gender.hasError = false;
   },
   checkTime() {
      this.form.mealTime.flag = false;
      this.form.mealTime.hasError = true;
      const MealTime = this.form.mealTime.value.replace(/\s/gi, "");
      if (MealTime === "") {
        this.form.mealTime.flag = false;
        return false;
      }
      this.form.mealTime.flag = true;
      this.form.mealTime.hasError = false;
      return true;
   },
   checkMinAge() {
      this.form.minAge.flag = false;
      this.form.minAge.hasError = true;
      const MinAge = this.form.minAge.value.replace(/\s/gi, "");
      if (MinAge === "") {
        this.form.minAge.flag = false;
        return false;
      }
      if (MinAge.length < 2) {
        this.form.minAge.flag = false;
        this.form.minAge.hasError = true;
        this.form.minAge.errorTxt = "*2자리 숫자를 입력해주세요.";
        return false;
      }
      const isMinAge = /^[0-9]{2}$/;
      if (!isMinAge.test(MinAge)) {
        this.form.minAge.errorTxt =
          "*2자리 숫자를 입력해주세요.";
        this.form.minAge.flag = false;
        this.form.minAge.hasError = true;
        return false;
      }
      this.form.minAge.flag = true;
      this.form.minAge.hasError = false;
      return true;
   },
   checkMaxAge() {
      this.form.maxAge.flag = false;
      this.form.maxAge.hasError = true;
      const MaxAge = this.form.maxAge.value.replace(/\s/gi, "");
      if (MaxAge === "") {
        this.form.maxAge.flag = false;
        return false;
      }
        if (MaxAge.length < 2) {
        this.form.maxAge.flag = false;
        this.form.maxAge.hasError = true;
        this.form.maxAge.errorTxt = "*2자리 숫자를 입력해주세요.";
        return false;
      }
      const isMaxAge = /^[0-9]{2}$/;
      if (!isMaxAge.test(MaxAge)) {
        this.form.maxAge.errorTxt =
          "*2자리 숫자를 입력해주세요.";
        this.form.maxAge.flag = false;
        this.form.maxAge.hasError = true;
        return false;
      }
      this.form.maxAge.flag = true;
      this.form.maxAge.hasError = false;
      return true;
   },
   checkStore() {
      this.form.store.flag = false;
      this.form.store.hasError = true;
      const Store = this.form.store.value.replace(/\s/gi, "");
      if (Store === "") {
        this.form.store.flag = false;
        return false;
      }
      this.form.store.flag = true;
      this.form.store.hasError = false;
      return true;
   }
  },
};
</script>

<style lang="scss" scoped>
.app-wrap {
  .divider {
    height: 10px;
    background:linear-gradient(to bottom, #eeeeee, rgba(215, 218, 220, 0.31));
    margin:0;
    top:52px;
  }
  .controller {
    position: relative;
    height: 52px;
    display: flex;
    align-items:center;
    width: calc(100% - 70px);
    margin: 0 auto 10px;
    h3.title {
      top:50%;
      position:absolute;
      left:50%;
      transform:translate(-50%, -50%);
      font-weight:normal;
    }
    .submit-wrap {
      display:flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      span {
        display:block;
      }
    }
  }
  .room-info {
    margin:0;
    &.comprise-footer {
    padding: 0 0 72px 0;
  }
    .article {
      padding:35px;
      border: 0px solid rgb(238,241,243);
      border-width:0 0 1px 0;
      .title-flex {
      display:flex;
      justify-content: space-between;
      h5.title {

      }
      span {

      }
    }
      h5.title {
        font-weight: normal;
        margin:0 0 12px 0;
        b {
          font-family: "AppleSDGothicNeoR00";
  line-height: 19px;
  font-size: 13px;
  font-weight:normal;
        }
      }
      .cluster {
        display:flex;
        .input-wrap {
          display:flex;
          &:first-of-type {
            span {
              margin: 0 6px 0 0;
            }
          }
          &.active {
            input {
            border-bottom:1px solid  #5fbb92;
            }
            span {
                color: #5fbb92;
               }
          }
          input {
            width:60px;
            text-align:center;
            border-bottom:1px solid  rgb(215,218,220);
            margin:0 6px 0 0;
          }
          span {
            display:block;
            min-width:30px;
        }
        }
        
      }
      .input-wrap {
        input {
           &.special {
             color:#5fbb92;
          &::placeholder {
            color: rgb(215,218,220);
             font-family: "AppleSDGothicNeoR00";
  line-height: 22px;
  font-size: 16px;
  font-weight:normal;
          }
        }
      }
    }
  }
}
}
</style>
