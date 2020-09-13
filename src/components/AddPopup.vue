<template>
  <Modal>
    <template v-slot:header>
      <!-- 
      <div class="modal_imgWrap">
        <img :src="require(`@/assets/images/${modalImg}`)" />
      </div>
      <div class="modal_closeBtn" v-if="closeType === 'close'">
        <img src="@/assets/images/x_popup.svg" @click.prevent="SET_POPUP(false)" />
      </div>
      <div class="modal_closeBtn" v-if="closeType === 'nomalClose'">
        <img src="@/assets/images/x_popup.svg" @click.prevent="normalClose()" />
      </div>
      <div class="modal_closeBtn" v-if="closeType === 'action'">
        <img src="@/assets/images/x_popup.svg" @click.prevent="closeAction()" />
      </div>
      <div class="modal_closeBtn" v-if="closeType === 'mobileAction'">
        <img src="@/assets/images/x_popup.svg" @click.prevent="mobileAction()" />
      </div>
      <div class="modal_closeBtn" v-if="closeType === 'mobileDeleteAuth'">
        <img src="@/assets/images/x_popup.svg" @click.prevent="mobileDeleteAuth()" />
      </div>
      -->
    </template>
    <template v-slot:body>
      <h3
        v-html="titleTransed"
        :class="{ withInput: count === 'causeActionInput' }"
      ></h3>
      <div class="star-wrap" v-if="count === 'rating'">
        <div class="sw-img">
          <star-rating
            :rating="rating.number"
            :rounded-corners="true"
            :activeColor="rating.activeColor"
            :inactiveColor="rating.inactiveColor"
            :star-points="rating.starPoint"
            :starSize="rating.starSize"
            :increment="0.5"
          ></star-rating>
        </div>
      </div>
      <p v-html="modalBody"></p>
      <span v-if="count === 'causeActionInput'"
        >문의사항 ({{ inputCount }} / 100)</span
      >
    </template>
    <template v-slot:footer>
      <div class="modal_btnWrap single" v-if="count === 'single'">
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="SET_POPUP(false)"
          v-text="confirmBtnText"
        ></button>
      </div>
      <div class="modal_btnWrap double" v-if="count === 'double'">
        <button
          class="btn cancel"
          @click.prevent="SET_POPUP(false)"
          v-text="cancelBtnText"
        >
          취소
        </button>
        <button
          class="btn confirm"
          :type="btnType"
          v-text="confirmBtnText"
          @click.prevent="btnMove()"
        ></button>
      </div>
      <!-- <div slot="footer" v-if="count === 'triple'">
      <div class="modal_btnWrap triple">
        <button class="btn cancel" v-text="cancelBtnText" onclick="location.href='/login'">로그인</button>
        <button
          class="btn confirm"
          :type="btnType"
          v-text="confirmBtnText"
          onclick="location.href='/ChoiceType'"
        >전화예약상담</button>
      </div>
      <div class="modal_outSide">
        <div class="mo_imgWrap">
          <img src="@/assets/images/call.svg" />
        </div>
        <button
          class="btn"
          :type="btnType"
          v-text="anotherBtnText"
          @click.prevent="btnMoveClosed()"
        ></button>
      </div>
    </div>-->
      <div class="modal_btnWrap single" v-if="count === 'another'">
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="btnMoveClosed()"
          v-text="confirmBtnText"
        ></button>
      </div>

      <div class="modal_btnWrap single" v-if="count === 'causeAction'">
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="causeAction()"
          v-text="confirmBtnText"
        ></button>
      </div>
      <div class="modal_btnWrap single" v-if="count === 'causeActionNormal'">
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="causeAction()"
          v-text="confirmBtnText"
        ></button>
      </div>

      <div class="modal_btnWrap double" v-if="count === 'causeActionCancelBtn'">
        <button
          class="btn cancel"
          :type="btnType"
          v-text="cancelBtnText"
          @click.prevent="SET_POPUP(false)"
        ></button>
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="causeAction()"
          v-text="confirmBtnText"
        ></button>
      </div>

      <div class="modal_btnWrap double" v-if="count === 'actionBtn'">
        <button
          class="btn cancel"
          :type="btnType"
          v-text="cancelBtnText"
          @click.prevent="prevUrl()"
        ></button>
        <button
          class="btn confirm"
          :type="btnType"
          v-text="confirmBtnText"
          @click.prevent="btnClose()"
        ></button>
      </div>
      <div v-if="count === 'causeActionInput'">
        <div class="modalInput" v-if="onInput">
          <span v-if="!inputError">*내용을 입력해주세요.</span>
          <textarea
            type="text"
            v-model="checkInput"
            id="onInput"
            ref="checkInput"
            maxlength="100"
          />
        </div>
        <div class="modal_btnWrap double">
          <button
            class="btn cancel"
            :type="btnType"
            v-text="cancelBtnText"
            @click.prevent="SET_POPUP(false)"
          ></button>
          <button
            class="btn confirm"
            :type="btnType"
            :disabled="!inputError"
            v-text="confirmBtnText"
            @click.prevent="causeAction()"
          ></button>
        </div>
      </div>

      <div class="modal_btnWrap single" v-if="count === 'mobileAction'">
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="mobileAction()"
          v-text="confirmBtnText"
        ></button>
      </div>
      <div class="modal_btnWrap single" v-if="count === 'mobileDeleteAuth'">
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="mobileDeleteAuth()"
          v-text="confirmBtnText"
        ></button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Modal from "./Modal.vue";
import StarRating from "vue-star-rating";

export default {
  props: {
    popupSet: {
      title: {
        type: String
      },
      modalImg: {
        type: String
      },
      content: {
        type: String
      },
      confirmBtnText: {
        type: String
      },
      cancelBtnText: {
        type: String
      },
      anotherBtnText: {
        type: String
      },
      btnType: {
        type: String
      },
      count: {
        type: String,
        default: "double"
      },
      nextLink: {
        type: String
      },
      closeType: {
        type: String,
        default: "close"
      },
      closeLink: {
        type: String,
        default: "/"
      },
      prevLink: {
        type: String
      },
      nextLink_another: {
        type: String
      },
      causeAction: {
        type: String
      },

      onInput: {
        default: false
      },
      mobileLink: {
        type: String
      },
      popHistory: {
        type: Array
      },
      currentURL: {
        type: String
      }
    }
  },
  components: {
    Modal,
    StarRating
  },
  data() {
    return {
      input: "",
      valid: false,
      onInput: this.popupSet.onInput,
      inputCount: 0,
      modalImg: this.popupSet.modalImg,
      modalTitle: this.popupSet.title,
      modalBody: this.popupSet.content,
      confirmBtnText: this.popupSet.confirmBtnText,
      cancelBtnText: this.popupSet.cancelBtnText,
      anotherBtnText: this.popupSet.anotherBtnText,
      btnType: this.popupSet.btnType,
      count: this.popupSet.count,
      nextLink: this.popupSet.nextLink,
      nextLink_another: this.popupSet.nextLink_another,
      closeType: this.popupSet.closeType,
      closeLink: this.popupSet.closeLink,

      currentURL: this.popupSet.currentURL,
      popHistory: this.popupSet.popHistory,
      checkInput: "",
      inputError: false,
      mobileLink: this.popupSet.mobileLink,
      starOn: require("@/assets/images/star.svg"),
      starOff: require("@/assets/images/star_empty.svg"),
      rating: {
        starPoint: [
          23,
          2,
          14,
          17,
          0,
          19,
          10,
          34,
          7,
          50,
          23,
          43,
          38,
          50,
          36,
          34,
          46,
          19,
          31,
          17
        ],
        number: 3,
        activeColor: "#ff7f1f",
        inactiveColor: "#fdd67c",
        starSize: 35
      }
    };
  },
  watch: {
    checkInput(val) {
      this.inputError = !!val.trim().length;
      this.inputCount = this.checkInput.length;
    }
  },
  mounted() {},
  computed: {
    ...mapState("basic", ["checkPopup"]),
    titleTransed() {
      return this.modalTitle.split("\n").join("<br />");
    }
  },
  methods: {
    ...mapMutations("basic", ["SET_POPUP"]),
    normalClose() {
      window.onpopstate = history.onpushstate = function() {
        this.SET_POPUP(false);
        this.popupHistory.pop(); // 닫는 layer ID값 삭제
        this.$router.push(this.currentURL);
      };

      this.SET_POPUP(false);
    },

    /*
    mobileDeleteAuth() {
      console.log("권한에러 액션버튼 진입");
      this.SET_POPUP(false);
      if (sessionStorage.getItem("userAgent") === "mobile") {
        const url = "thanq://logout";
        document.location.href = url;
      }
      if (getCookie("token") === undefined) {
        this.$router.push(this.mobileLink);
        sessionStorage.removeItem("authErrorCause");
      } else {
        sessionStorage.setItem("authErrorCause", "mutated");
        window.location.reload();
      }
    },
    */
    mobileAction() {
      location.href = this.mobileLink;
    },
    addPopup() {
      this.SET_POPUP(false);
    },
    btnMove() {
      this.$router.push(this.nextLink);
    },
    btnMove_another() {},
    btnMoveClosed() {
      this.$router.push(this.nextLink);
      this.SET_POPUP(false);
    },
    causeAction() {
      this.SET_POPUP(false);
      this.$emit("causeAction");
    },
    prevUrl() {
      this.$router.go(-1);
      this.SET_POPUP(false);
    },
    btnClose() {
      this.SET_POPUP(false);
    },
    closeAction() {
      this.$router.push(this.closeLink);
      this.SET_POPUP(false);
    },
    prevAction() {
      // if (this.checkPopup(true)) {
      //   console.log('this.checkPopup: ', this.checkPopup)
      //   window.history.pushState(null, '', location.href)
      //   window.onpopstate = () => {
      //     history.go(1)
      //     this.SET_POPUP(false)
      //   }
      // } else if (this.checkPopup(false)) {
      //   console.log('this.checkPopup:: ', this.checkPopup)
      //   window.onpopstate = () => {
      //     history.go(-1)
      //   }
      // }
    }
  },
  created() {
    this.prevAction();
  }
};
</script>

<style lang="scss" scoped></style>
