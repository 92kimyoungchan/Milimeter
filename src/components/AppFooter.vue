<template>
  <div class="app-footer">
    <div class="menu">
      <div class="item" @click="moveMenu(index)" v-for="(menuItem,index) in menu" :key="index">
        <div class="img-wrap">
          <img :src="require(`@/assets/images/${menuItem.defaultUrl}`)" v-if="index !== activeOrder" />
          <img :src="require(`@/assets/images/${menuItem.ActiveUrl}`)" v-else />
        </div>
        <p class="scale-caption">{{ menuItem.title }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    footerSet: {
      activeOrder: {
        type: Number,
        default:null
      }
    }
  },
  data() {
    return {
      activeOrder: this.footerSet.activeOrder,
      menu:[
        {
          defaultUrl: "home_disabled_icon.svg",
          ActiveUrl: "home_active_icon.svg",
          title: "홈"
        },
        {
            defaultUrl: "list_disabled_icon.svg",
          ActiveUrl: "applylist_active_icon.svg",
          title: "신청목록"
        },
        {
            defaultUrl: "plusroom_disabled_icon.svg",
          ActiveUrl: "plusroom_disabled_icon.svg",
          title: "방만들기"
        },
        {
            defaultUrl: "mypage_disabled_icon.svg",
          ActiveUrl: "mypage_active_icon.svg",
          title: "마이페이지"
        }
      ]
    };
  },
  methods: {
    moveMenu(order) {
      if (order === 0) {
        this.$router.push('/room');
      } else if (order === 1) {
        
      } else if (order === 2) {
        this.$router.push('/createRoom');
      } else if (order === 3) {
        this.$router.push('/MyPage');
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.app-footer {
  position: fixed;
  bottom: 0;
  height: 72px;
  width: 100%;
  border-top: 1px solid #d7dadc;
  z-index: 1;
  background: #FFF;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.33);
  .menu {
    display: flex;
    justify-content: space-between;
    height: inherit;
    align-items: flex-end;
    text-align: center;
    padding: 0 35px 5px 35px;
    .item {
      .img-wrap {
        img {
        }
      }
      p {
      }
    }
  }
}
</style>
