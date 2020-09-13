<template>
  <transition name="modal">
    <div class="modal-mask" @click="overlayClick($event)">
      <div class="modal-wrapper" :style="{ height: screenHeight }">
        <div class="modal-container" @click.stop>
          <div class="modal-flex" :style="computedModalContentHeight">
            <div class="modal-header">
              <slot name="header"></slot>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="SET_POPUP(false)">OK</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { hasNotch, NOTCH_HEIGHT } from "../utils/checkDevice";
import { mapMutations } from "vuex";
export default {
  props: {},
  data() {
    return {
      calculatedHeight: 0
    };
  },
  computed: {
    computedModalContentHeight() {
      return {
        height: this.calculatedHeight + "px"
      };
    }
  },
  methods: {
    ...mapMutations("basic", ["SET_POPUP"]),
    overlayClick(event) {
      var target = event.target;
      // console.log(target);

      // 1. review_write_info 영역 이면 pass
      if (target == event.currentTarget.querySelector(".modal-container"))
        return;

      // 2. review_write_info 영역 내 span이면 pass
      const headerTags = event.currentTarget
        .querySelector(".modal-header")
        .querySelectorAll(
          ".modal_imgWrap, .modal_imgWrap img, .modal_closeBtn, .modal_closeBtn img"
        );
      if (headerTags === target) return;
      const bodyTags = event.currentTarget
        .querySelector(".modal-body")
        .querySelectorAll("p");
      for (var i = 0; i < bodyTags.length; i++) {
        if (bodyTags[i] == target) return;
      }
      const footerTags = event.currentTarget
        .querySelector(".modal-footer .modal_btnWrap")
        .querySelectorAll("button");
      for (var j = 0; j < footerTags.length; j++) {
        if (footerTags[j] == target) return;
      }
      this.SET_POPUP(false);
    },
    measureWholeHeight() {
      const wholeHeight = document.querySelector(".modal-container")
        .clientHeight;
      const footerHeight = document.querySelector(".modal-footer").clientHeight;
      this.calculatedHeight = wholeHeight - footerHeight;
    }
  },
  mounted() {
    this.measureWholeHeight();
  },
  created() {
    this.screenHeight = hasNotch()
      ? screen.height - NOTCH_HEIGHT + "px"
      : screen.height + "px";
  }
};
</script>

<style lang="scss" scoped></style>
