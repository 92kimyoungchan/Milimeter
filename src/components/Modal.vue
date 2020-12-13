<template>
  <transition name="modal">
    <div class="modal-mask" @click="overlayClick($event)" :class="{ isTopPriority: priority }">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    footerLess: {
      type: Boolean,
      default: false
    },
    priority: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    };
  },
  computed: {
     ...mapState("basic", ["checkPopup"]),
  },
  methods: {
    ...mapMutations("basic", ["SET_POPUP"]),
    overlayClick(event) {
      const target = event.target;
      console.log("타겟", target);
      console.log("커런트", event.currentTarget);
       this.SET_POPUP(false);
    }
  },
  mounted() {},
  created() {
  }
};
</script>

<style lang="scss" scoped></style>
