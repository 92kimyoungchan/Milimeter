<template>
  <div>
    <ul class="tabs__header">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        :class="{ tab__selected: index == selectedIndex }"
      >
        {{ tab.tabData.title }}
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      selectedIndex: 0,
      currentProgressNum: 1,
      tabs: []
    };
  },
  created() {
    this.tabs = this.$children;
    console.log("정보", this.tabs);
  },
  mounted() {
    this.selectTab(0);
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;
      this.currentProgressNum = i + 1;
      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      }); 
      this.$emit("reloadRoomList", i);
    }
  },
  computed: {
   
  },
  components: {}
};
</script>
<style lang="scss" scoped></style>
