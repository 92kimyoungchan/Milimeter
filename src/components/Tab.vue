<template>
  <div class="tab-wrapper" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    tabData: {
      title: {
        type: String,
        default: "Tab"
      },
      progressNum: {
        type: Number
      }
    }
  },
  data() {
    return {
      isActive: true,
      title: this.tabData.title,
      progressNum: this.tabData.progressNum
    };
  },
  created() {},
  methods: {},
  computed: {},
  components: {}
};
</script>
<style lang="scss" scoped></style>
