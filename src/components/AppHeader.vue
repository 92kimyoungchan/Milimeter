<template>
  <div class="app-header">
    <div class="direction left" @click="prev()" v-if="leftButton === 'prev'">
      <img src="@/assets/images/back_icon.svg" />
    </div>
    <div
      class="direction left"
      @click="sideMenu()"
      v-if="leftButton === 'menu'"
    >
      <img src="@/assets/images/menu.svg" />
    </div>
    <h3 class="scale-title">{{ headerTitle }}</h3>
    <div class="direction right" @click="home" v-if="rightButton === 'home'">
      <img src="@/assets/images/home.svg" />
    </div>
    <div class="direction right" @click="home" v-if="rightButton === 'alarm'">
      <img src="@/assets/images/alarm.svg" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    transDataSet: {
      headerName: {
        type: String,
      },
      prevUrl: {
        type: String,
      },
      keyName: {
        type: String,
      },
      leftButton: {
        type: String,
      },
      rightButton: {
        type: String,
      },
    },
  },
  data() {
    return {
      headerTitle: this.transDataSet.headerName,
      prevBtnUrl: this.transDataSet.prevUrl,
      keyName: this.transDataSet.keyName,
      leftButton: this.transDataSet.leftButton,
      rightButton: this.transDataSet.rightButton,
    };
  },
  computed: {
    ...mapState(["prevUrl"]),
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    prev() {
      if (this.transDataSet.prevUrl === "another") {
        this.$emit("prevSection");
      } else {
        this.$router.push("" + this.prevBtnUrl + "");
        console.log("this.keyname = ", this.keyName);
        if (this.keyName !== undefined) {
          sessionStorage.removeItem("" + this.keyName + "");
        }
        console.log("URL", this.prevBtnUrl);
      }
    },
    prevGo() {
      return window.history?.length > 2;
    },
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  position: fixed;
  width: calc(100% - 48px);
  z-index: 2;
  //box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  box-shadow: none;
  background-color: #fff;
  height: 54px;
  transform: translateX(-50%);
  left: 50%;

  h3 {
    color: #292a2b;
    text-align: center;
    margin: 0;
    position: absolute;
    width: 100%;
    font-weight:normal;
  }
  .direction {
    cursor: pointer;
    padding: 0;
    top: 0;
    z-index: 2;
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
