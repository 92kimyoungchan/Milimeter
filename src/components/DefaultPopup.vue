<template>
  <modal :priority="isTopPriority">
    <template v-slot:body>
      <div class="pop" v-if="popType === 'defaultType'">
        <div class="context">
          <div class="p-icon" v-if="iconUrl !== null">
            <img :src="require(`@/assets/images/${iconUrl}`)" />
          </div>
          <h5 class="p-title scale-subtitle" v-html="titleMutated"></h5>
          <p class="p-content scale-body" v-html="contentMutated"></p>
        </div>
        <div class="p-btn-wrap">
          <div
            class="item"
            v-if="buttonType === 'alone'"
            :class="{ alone: buttonType === 'alone' }"
          >
              <button type="button" v-text="confirmBtnText" @click="confirm()"></button>
          </div>
          <div
            class="item"
            v-if="buttonType === 'default'"
            :class="{ default: buttonType === 'default' }"
          >
            <button
              class="scale-subtitle"
              type="button"
              v-text="cancelBtnText"
              @click="prev()"
            ></button>
            <button
              class="scale-subtitle"
              type="button"
              v-text="confirmBtnText"
              @click="next()"
            ></button>
          </div>
        </div>
      </div>
      <div class="pop" v-if="popType === 'pick'">
        <div class="context">
          <div class="p-icon" v-if="iconUrl !== null">
            <img :src="require(`@/assets/images/${iconUrl}`)" />
          </div>
          <h5 class="p-title scale-subtitle" v-html="titleMutated"></h5>
          <p class="p-content scale-body" v-html="contentMutated"></p>
        </div>
        <div class="p-btn-wrap">
          <div
            class="item"
            v-if="buttonType === 'default'"
            :class="{ default: buttonType === 'default' }"
          >
            <button
              class="scale-subtitle"
              type="button"
              v-text="cancelBtnText"
              @click="pickCancel()"
            ></button>
            <button
              class="scale-subtitle"
              type="button"
              v-text="confirmBtnText"
              @click="pickConfirm(pickOrder, pickFlag)"
            ></button>
          </div>
        </div>
      </div>
      <div class="pop" v-if="popType === 'listDelete'">
        <div class="context">
          <div class="p-icon" v-if="iconUrl !== null">
            <img :src="require(`@/assets/images/${iconUrl}`)" />
          </div>
          <h5 class="p-title scale-subtitle" v-html="titleMutated"></h5>
          <p class="p-content scale-body" v-html="contentMutated"></p>
        </div>
        <div class="p-btn-wrap">
          <div
            class="item"
            v-if="buttonType === 'default'"
            :class="{ default: buttonType === 'default' }"
          >
            <button
              class="scale-subtitle"
              type="button"
              v-text="cancelBtnText"
              @click="listDeleteCancel()"
            ></button>
            <button
              class="scale-subtitle"
              type="button"
              v-text="confirmBtnText"
              @click="listDeleteConfirm()"
            ></button>
          </div>
        </div>
      </div>
      <div class="pop" v-if="popType === 'refuseApply'">
        <div class="context">
          <div class="p-icon" v-if="iconUrl !== null">
            <img :src="require(`@/assets/images/${iconUrl}`)" />
          </div>
          <h5 class="p-title scale-subtitle" v-html="titleMutated"></h5>
          <p class="p-content scale-body" v-html="contentMutated"></p>
        </div>
        <div class="p-btn-wrap">
          <div
            class="item"
            v-if="buttonType === 'default'"
            :class="{ default: buttonType === 'default' }"
          >
            <button
              class="scale-subtitle"
              type="button"
              v-text="cancelBtnText"
              @click="refuseApplyCancel()"
            ></button>
            <button
              class="scale-subtitle"
              type="button"
              v-text="confirmBtnText"
              @click="refuseApplyConfirm()"
            ></button>
          </div>
        </div>
      </div>
    </template>
  </modal>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Modal from "./Modal.vue";

export default {
  props: {
    popupSet: {
      title: {
        type: String,
      },
      content: {
        type: String,
      },
      confirmBtnText: {
        type: String,
      },
      iconUrl: {
        type: String,
      },
      cancelBtnText: {
        type: String,
      },
      popType: {
        type: String,
      },
      nextLink: {
        type: String,
      },
      prevLink: {
        type: String,
      },
      isTopPriority: {
        type: Boolean,
      },
      buttonType: {
        type: String,
      },
      pickFlag: {
        type: Boolean
      },
      pickOrder: {
        type: String
      }
    },
  },
  components: {
    Modal,
  },
  data() {
    return {
      input: "",
      valid: false,
      popType: this.popupSet.popType,
      title: this.popupSet.title,
      content: this.popupSet.content,
      confirmBtnText: this.popupSet.confirmBtnText || "확인",
      cancelBtnText: this.popupSet.cancelBtnText || "취소",
      nextLink: this.popupSet.nextLink || null,
      prevLink: this.popupSet.prevLink || null,
      isTopPriority: this.popupSet.isTopPriority,
      iconUrl: this.popupSet.iconUrl || null,
      buttonType: this.popupSet.buttonType || "default",
      pickFlag: this.popupSet.pickFlag,
      pickOrder: this.popupSet.pickOrder
    };
  },
  watch: {},
  mounted() {},
  computed: {
    ...mapState("basic", ["checkCustomPopup"]),
    titleMutated() {
      if (this.title !== undefined) {
        return this.title.split("\n").join("<br />");
      } else {
        return "";
      }
    },
    contentMutated() {
      if (this.content !== undefined) {
        return this.content.split("\n").join("<br />");
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapMutations("basic", ["SET_POPUP"]),
    listDeleteCancel() {
      this.SET_POPUP(false);
    },
    listDeleteConfirm() {
       this.$emit("receive-deleteList")
        this.SET_POPUP(false);
    },
    refuseApplyCancel(){
        this.SET_POPUP(false);
    },
    refuseApplyConfirm(){
        this.$emit("receive-refuseApply")
        this.SET_POPUP(false);
    },
    confirm() {
      if (this.nextLink !== null) {
        this.SET_POPUP(false);
        this.$router.push(this.nextLink);
      } else {
        this.SET_POPUP(false);
      }
    },
    prev() {
      if (this.prevLink !== null) {
        this.SET_POPUP(false);
        this.$router.push(this.prevLink);
      } else {
        this.SET_POPUP(false);
      }
    },
    next() {
      if (this.nextLink !== null) {
        this.$router.push(this.nextLink);
      } else {
        this.SET_POPUP(false);
      }
    },
     pickConfirm(order, flag) {
       this.$emit("receive-pick", order, !flag)
        this.SET_POPUP(false);
      },
      pickCancel() {
        this.SET_POPUP(false);
      },
    callApi() {
      this.SET_POPUP(false);
      this.$emit("callApi");
    },
  },
  created() {
    console.log("가입", this.title);
    console.log("팝타입", this.popType);
  },
};
</script>

<style lang="scss" scoped></style>
