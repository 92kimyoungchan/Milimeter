<template>
  <div class="app-footer">
    <div class="menu">
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/home_disabled_icon.svg" />
        </div>
        <p class="scale-caption">홈</p>
      </div>
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/list_disabled_icon.svg" />
        </div>
        <p class="scale-caption">신청목록</p>
      </div>
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/plusroom_disabled_icon.svg" />
        </div>
        <p class="scale-caption">방만들기</p>
      </div>
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/mypage_active_icon.svg" />
        </div>
        <p class="scale-caption">마이페이지</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.app-footer {
  position: fixed;
  bottom: 0;
  height: 72px;
  width: 100%;
  border-top: 1px solid #d7dadc;
  z-index: 10;
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
