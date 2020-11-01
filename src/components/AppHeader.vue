<template>
  <div class="appHeader">
    <div class="direction left" @click="prev()" v-if="leftButton === 'prev'">
      <img src="@/assets/images/back.svg" />
    </div>
    <div
      class="direction left"
      @click="sideMenu()"
      v-if="leftButton === 'menu'"
    >
      <img src="@/assets/images/menu.svg" />
    </div>
    <h3 class="scaleBody">{{ headerTitle }}</h3>
    <div class="direction right" @click="home" v-if="rightButton === 'home'">
      <img src="@/assets/images/home.svg" />
    </div>
    <div class="direction right" @click="home" v-if="rightButton === 'alarm'">
      <img src="@/assets/images/alarm.svg" />
    </div>
  </div>
</template>

media( max-width:343px) { }
<script>
import { mapState } from "vuex";
export default {
  props: {
    transDataSet: {
      headerName: {
        type: String
      },
      prevUrl: {
        type: String
      },
      keyName: {
        type: String
      },
      leftButton: {
        type: String
      },
      rightButton: {
        type: String
      }
    }
  },
  data() {
    return {
      headerTitle: this.transDataSet.headerName,
      prevBtnUrl: this.transDataSet.prevUrl,
      keyName: this.transDataSet.keyName,
      leftButton: this.transDataSet.leftButton,
      rightButton: this.transDataSet.rightButton
    };
  },
  computed: {
    ...mapState(["prevUrl"])
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    prev() {
      this.$router.push("" + this.prevBtnUrl + "");
      console.log("this.keyname = ", this.keyName);
      if (this.keyName !== undefined) {
        sessionStorage.removeItem("" + this.keyName + "");
      }
      console.log("URL", this.prevBtnUrl);
    },
    prevGo() {
      return window.history?.length > 2;
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.appHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  position: fixed;
  width: inherit;
  z-index: 100;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  justify-content: space-between;

  h3 {
    color: rgb(41, 42, 43);
    text-align: center;
    margin: 0;
    flex: 1 1 auto;
  }
  .direction {
    cursor: pointer;
    padding: 0;
    top: 0;
    .icon-wrap {
      display: flex;
      align-items: center;
    }
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
    img {
    }
  }
}
</style>
