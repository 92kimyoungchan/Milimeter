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
<style lang="scss" scoped>
.app-wrap {
  &.room {
.container {
   ul.tabs__header {
          position: absolute;
          width: 200px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: none;
          padding: 0;
          background: #5fbb92;
          height: 30px;
          align-items: center;
          overflow: hidden;
           border-radius: 6px;
          li {
            font-family: "AppleSDGothicNeoSB00";
            font-size:14px;
            line-height:28px;
            text-align:center;
            color:#fff;
            border: 1px solid #5fbb92;
            border-radius: 6px;
              
            &.tab__selected {
              background:#fff;
              color: rgb(95,187,146);
              border: 1px solid #5fbb92;
            }
          }
      }
      .tab-wrapper {
        padding:30px 0 0 0;
      }
      }
}
}
</style>
