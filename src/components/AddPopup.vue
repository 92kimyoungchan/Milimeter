<template>
  <Modal :isFit="isFit" :footerLess="footerLess">
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
      <div class="inImgPop-topImg" v-if="count === 'inImgPop'">
        <div class="imgWrap">
          <img :src="require(`@/assets/images/${modalImg}`)" />
        </div>
      </div>
      <div class="noticePop-topImg" v-if="count === 'noticePop'">
        <div class="imgWrap">
          <img :src="require(`@/assets/images/${modalImg}`)" />
        </div>
      </div>
      <div class="noticePop-topImg" v-if="count === 'causeActionApi'">
        <div class="imgWrap">
          <img :src="require(`@/assets/images/${modalImg}`)" />
        </div>
      </div>
      <div class="noticePop-topImg" v-if="count === 'contentCustomPop'">
        <div class="imgWrap">
          <img :src="require(`@/assets/images/${modalImg}`)" />
        </div>
      </div>
      <div class="cameraPop-topImg" v-if="count === 'cameraPop'">
        <div class="imgWrap absolute">
          <img :src="require(`@/assets/images/${modalImg}`)" />
        </div>
        <div class="imgWrap huge" :class="{ active: isImgEffect === true }">
          <img :src="require(`@/assets/images/${modalImgHuge}`)" />
        </div>
      </div>
      <div class="noticePop-topImg" v-if="count === 'userinfoPop'">
        <div class="imgWrap">
          <img :src="require(`@/assets/images/${modalImg}`)" />
        </div>
      </div>
    </template>
    <template v-slot:body>
      <h3
        v-html="titleTransed"
        :class="{ withInput: count === 'causeActionInput' }"
      ></h3>
      <h3
        v-html="titleTransed"
        :class="{ withInput: count === 'causeActionApi' }"
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
      <div class="inImgPop-topBody" v-if="count === 'inImgPop'">
        <div class="article" v-for="(popItem, index) in inPopItem" :key="index">
          <h3 class="a-title">{{ popItem.title }}</h3>
          <p>{{ popItem.content }}</p>
        </div>
      </div>
      <div class="noticePop-Body" v-if="count === 'noticePop'">
        <div class="article" v-for="(popItem, index) in inPopItem" :key="index">
          <h3 class="a-title">{{ popItem.title }}</h3>
          <p v-html="popItem.content"></p>
        </div>
      </div>
      <div class="noticePop-Body" v-if="count === 'causeActionApi'">
        <div class="article" v-for="(popItem, index) in inPopItem" :key="index">
          <h3 class="a-title">{{ popItem.title }}</h3>
          <p v-html="popItem.content"></p>
          <div class="modalInput" v-if="onInput">
            <span class="warn" v-if="!inputError"
              >*비밀번호를 입력해주세요.</span
            >
            <input
              type="password"
              v-model="checkInput"
              id="onInput"
              ref="checkInput"
              class="trans"
              maxlength="20"
            />
          </div>
        </div>
      </div>
      <div class="contentCustomPop-Body" v-if="count === 'contentCustomPop'">
        <div class="article" v-for="(popItem, index) in inPopItem" :key="index">
          <h3 class="a-title">{{ popItem.title }}</h3>
        </div>
      </div>
      <div class="noticePop-Body put-footer" v-if="count === 'userinfoPop'">
        <div class="article" v-for="(popItem, index) in inPopItem" :key="index">
          <h3
            class="a-title multiple"
            v-for="(popChild, index) in popItem.titles"
            :key="index"
          >
            {{ popChild }}
          </h3>
          <p v-html="popItem.content"></p>
        </div>
      </div>
      <div class="cameraPop-Body put-footer" v-if="count === 'cameraPop'">
        <div
          class="context"
          v-for="(popContext, index) in inPopItem"
          :key="index + 'A'"
        >
          <div class="title">
            <h3>{{ popContext.comment.headTitle }}</h3>
            <p>{{ popContext.comment.comment }}</p>
          </div>
          <div class="camera-buttons">
            <button
              class=""
              v-for="(popItem, index) in popContext.buttonBox"
              :key="index + 'B'"
              @click="cameraButtonAct(index)"
            >
              {{ popItem }}
            </button>
            <input
              type="file"
              @change="uploadImgInsert"
              multiple=""
              class="imgUploadRequest"
            />
          </div>
        </div>
      </div>
      <p v-html="bodyTransed" v-if="!isMultiple"></p>
      <div v-else class="multipleContent">
        <p v-html="multipleTransed1"></p>
        <p v-html="multipleTransed2"></p>
        <p v-html="multipleTransed3"></p>
      </div>
      <!--
      <span v-if="count === 'causeActionInput'"
        >문의사항 ({{ inputCount }} / 100)</span
      >
      -->
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
      <div class="modal_btnWrap single default" v-if="count === 'userinfoPop'">
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="causeAction()"
          v-text="confirmBtnText"
        ></button>
      </div>
      <div class="modal_btnWrap single default" v-if="count === 'noticePop'">
        <button
          v-if="doQuit === true"
          class="btn confirm"
          :type="btnType"
          @click.prevent="btnMove()"
          v-text="confirmBtnText"
        ></button>
        <button
          v-else
          class="btn confirm"
          :type="btnType"
          @click.prevent="SET_POPUP(false)"
          v-text="confirmBtnText"
        ></button>
      </div>
      <div
        class="modal_btnWrap double default"
        v-if="count === 'causeActionApi'"
      >
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
      <div
        class="modal_btnWrap single default generously"
        v-if="count === 'contentCustomPop'"
      >
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="btnMove()"
          v-text="confirmBtnText"
        ></button>
      </div>
      <div class="modal_btnWrap single" v-if="count === 'rating'">
        <button
          class="btn confirm"
          :type="btnType"
          @click.prevent="SET_POPUP(false)"
          v-text="confirmBtnText"
        ></button>
      </div>
      <div
        class="modal_btnWrap hide"
        v-if="
          count === 'inImgPop' ||
          count === 'userinfoPop' ||
          count === 'cameraPop'
        "
        @click.prevent="inPopClose()"
      ></div>
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
        type: String,
      },
      modalImg: {
        type: String,
      },
      modalImgHuge: {
        type: String,
      },
      inPopItem: {
        type: Array,
      },
      content: {
        type: String,
      },
      multipleContent1: {
        type: String,
      },
      multipleContent2: {
        type: String,
      },
      multipleContent3: {
        type: String,
      },
      contentMultiple: {
        type: String,
      },
      confirmBtnText: {
        type: String,
      },
      cancelBtnText: {
        type: String,
      },
      anotherBtnText: {
        type: String,
      },
      btnType: {
        type: String,
      },
      count: {
        type: String,
        default: "double",
      },
      nextLink: {
        type: String,
      },

      closeType: {
        type: String,
        default: "close",
      },
      closeLink: {
        type: String,
        default: "/",
      },
      prevLink: {
        type: String,
      },
      nextLink_another: {
        type: String,
      },
      causeAction: {
        type: String,
      },
      popNum: {
        type: Number,
      },
      onInput: {
        default: false,
      },
      mobileLink: {
        type: String,
      },
      popHistory: {
        type: Array,
      },
      currentURL: {
        type: String,
      },
      modalBodyImgEffect: {
        type: Boolean,
      },
      isFit: {
        type: Boolean,
      },
      footerLess: {
        type: Boolean,
      },
      isMultiple: {
        type: Boolean,
      },
      doQuit: {
        type: Boolean,
      },
    },
  },
  components: {
    Modal,
    StarRating,
  },
  data() {
    return {
      input: "",
      valid: false,
      onInput: this.popupSet.onInput,
      inputCount: 0,
      modalImg: this.popupSet.modalImg,
      modalImgHuge: this.popupSet.modalImgHuge,
      isImgEffect:
        this.popupSet.modalBodyImgEffect === undefined
          ? false
          : this.popupSet.modalBodyImgEffect,
      modalTitle: this.popupSet.title,
      modalBody: this.popupSet.content,
      multipleContent1: this.popupSet.multipleContent1,
      multipleContent2: this.popupSet.multipleContent2,
      multipleContent3: this.popupSet.multipleContent3,
      confirmBtnText: this.popupSet.confirmBtnText,
      cancelBtnText: this.popupSet.cancelBtnText,
      anotherBtnText: this.popupSet.anotherBtnText,
      btnType: this.popupSet.btnType,
      count: this.popupSet.count,
      nextLink: this.popupSet.nextLink,
      nextLink_another: this.popupSet.nextLink_another,
      closeType: this.popupSet.closeType,
      closeLink: this.popupSet.closeLink,
      inPopItem: this.popupSet.inPopItem,
      currentURL: this.popupSet.currentURL,
      popHistory: this.popupSet.popHistory,
      popRouterBox: this.popupSet.popRouterBox,
      popNum: this.popupSet.popNum,
      isMultiple: this.popupSet.isMultiple,
      doQuit: this.popupSet.doQuit,
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
          17,
        ],
        number: 3,
        activeColor: "#fe6867",
        inactiveColor: "#fdd67c",
        starSize: 35,
      },
      uploadData: [
        {
          count: "",
          url: [],
          viewingUrl: [],
          isInArrived: true,
        },
        {
          count: "",
          url: [],
          viewingUrl: [],
          isInArrived: true,
        },
      ],
      isFit: this.popupSet.isFit,
      footerLess: this.popupSet.footerLess,
    };
  },
  watch: {
    checkInput(val) {
      if (val.trim().length > 7 && val.trim().length < 21) {
        this.inputError = true;
      } else {
        this.inputError = false;
      }
      this.inputCount = this.checkInput.length;
    },
  },
  mounted() {
    if (this.count === "cameraPop") {
      this.setCameraBtnEffect();
    }
  },
  computed: {
    ...mapState("basic", ["checkPopup"]),
    titleTransed() {
      if (this.modalTitle !== undefined) {
        return this.modalTitle.split("\n").join("<br />");
      } else {
        return "";
      }
    },
    bodyTransed() {
      if (this.modalBody !== undefined) {
        return this.modalBody.split("\n").join("<br />");
      } else {
        return "";
      }
    },
    multipleTransed1() {
      if (this.multipleContent1 !== undefined) {
        return this.multipleContent1.split("\n").join("<br />");
      } else {
        return "";
      }
    },
    multipleTransed2() {
      if (this.multipleContent2 !== undefined) {
        return this.multipleContent2.split("\n").join("<br />");
      } else {
        return "";
      }
    },
    multipleTransed3() {
      if (this.multipleContent3 !== undefined) {
        return this.multipleContent3.split("\n").join("<br />");
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapMutations("basic", ["SET_POPUP"]),
    ...mapMutations("paperweight", ["SET_UPLOADDDATA"]),
    setCameraBtnEffect() {
      document
        .querySelector(".camera-buttons")
        .childNodes[0].classList.add("active");
    },
    normalClose() {
      window.onpopstate = history.onpushstate = function () {
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
    bodyImgEffectInit() {
      alert("진입");
      let i;
      for (
        i = 0;
        i < document.querySelector(".cameraPop-topImg").childNodes.length;
        i++
      ) {
        if (
          document
            .querySelector(".cameraPop-topImg")
            .childNodes[i].classList.contains("huge")
        ) {
          const item = document.querySelector(".cameraPop-topImg").childNodes[
            i
          ];
          console.log("item", item);
          if (item.classList.contains("active")) {
            item.classList.remove("active");
          }
        }
      }
    },
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
    inPopClose() {
      this.inPopItem = undefined;
      this.SET_POPUP(false);
    },
    async onFileChange(e) {
      /* if (e.target.files.length > 3) {
          this.SET_POPUP(true)
          this.popupSet.content = '이미지를 3개이상 선택할 수 없습니다.'
          return false
        } */
      await this.uploadImgInsert(e);
    },
    async uploadImgInsert(e) {
      console.log("이거 가져갈 수 있어?", e.target.files.length);
      const imagefile = document.querySelector(".imgUploadRequest");
      const fileArray = [];
      const viewIngArray = [];
      for (let i = 0; i < e.target.files.length; i++) {
        fileArray.push(e.target.files[i]);
        viewIngArray.push(URL.createObjectURL(e.target.files[i]));
      }
      console.log("file", imagefile);
      console.log("file", imagefile.files);
      console.log("file", imagefile.files[0]);
      this.uploadData[this.popNum].count = this.popNum;
      this.uploadData[this.popNum].url = fileArray;
      this.uploadData[this.popNum].viewingUrl = viewIngArray;
      this.uploadData[this.popNum].trueImageName = imagefile.files[0];
      this.uploadData[this.popNum].flag = true;
      if (this.uploadData[this.popNum].viewingUrl.length >= 1) {
        this.uploadData[this.popNum].isInArrived = false;
      }
      this.SET_UPLOADDDATA(this.uploadData[this.popNum]);
      this.SET_POPUP(false);
      this.$emit("changeImg");
    },
    initUploadSet() {
      this.uploadData[this.popNum].url = [];
      this.uploadData[this.popNum].viewingUrl = [];
      this.uploadData[this.popNum].isInArrived = true;
    },
    callImage() {
      this.initUploadSet();
      document.querySelector(".imgUploadRequest").click();
    },
    cameraButtonAct(order) {
      this.isImgEffect = false;
      console.log("순번", order);
      console.log("길이", this.inPopItem[0].buttonBox.length);
      console.log("아이템", this.inPopItem[0].buttonBox[order]);
      if (order === this.inPopItem[0].buttonBox.length - 1) {
        this.SET_POPUP(false);
      } else if (order === 0) {
        this.SET_POPUP(false);
        /*this.$router.push(this.popRouterBox[0]);*/
        /**
         * 카메라 어태치
         */
        alert("카메라 어태치모드 실행");
      } else if (order === 1) {
        /*this.$router.push(this.popRouterBox[1]);*/
        this.callImage();
      }
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
    },
  },
  created() {
    this.prevAction();
  },
};
</script>

<style lang="scss" scoped></style>
