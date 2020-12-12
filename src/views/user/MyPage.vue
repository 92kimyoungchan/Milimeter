<template>
  <div class="app-wrap mypage">
    <div class="m-header">
      <h3 class="scale-title">마이페이지</h3>
      <div class="function">
        <img src="@/assets/images/setting_icon.svg" />
      </div>
      <div class="divider"></div>
    </div>

    <div class="interface-menu">
      <div class="profile">
        <div class="p-picture">
          <div class="user">
            <span class="circle"></span>
            <div class="img-wrap">
              <img
                class="bowl"
                src="@/assets/images/profile_signature_image.svg"
              />
              <div class="layered-img">
                <img
                  class="camera"
                  src="@/assets/images/profile_camera_icon.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="p-content">
          <h6 class="scale-subtitle">naddana9209</h6>
          <div class="button-wrap">
            <button class="scale-body" type="button">프로필 보기</button>
          </div>
        </div>
      </div>
      <div class="room-function">
        <div class="item">
          <div class="img-wrap">
            <img src="@/assets/images/createroom_icon.svg" />
          </div>
          <p class="scale-body">생성한 방</p>
        </div>
        <div class="item">
          <div class="img-wrap">
            <img src="@/assets/images/likeroom_icon.svg" />
          </div>
          <p class="scale-body">찜한 방</p>
        </div>
        <div class="item">
          <div class="img-wrap">
            <img src="@/assets/images/createroom_icon.svg" />
          </div>
          <p class="scale-body">신청한 방</p>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="menu social">
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/follower_icon.svg" />
        </div>
        <p class="scale-body">팔로워</p>
      </div>
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/following_icon.svg" />
        </div>
        <p class="scale-body">팔로잉</p>
      </div>
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/invite_icon.svg" />
        </div>
        <p class="scale-body">친구초대</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="menu">
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/notice_icon.svg" />
        </div>
        <p class="scale-body">공지사항</p>
      </div>
      <div class="item">
        <div class="img-wrap">
          <img src="@/assets/images/setting_icon.svg" />
        </div>
        <p class="scale-body">앱 설정</p>
      </div>
    </div>
    <app-footer :footerSet="footerSet"></app-footer>
  </div>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppFooter,
  },
  data() {
    return {
      footerSet: {
        activeOrder:99
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.divider {
  margin: 0px 0 0 0;
  height: 10px;
  background: rgb(238, 241, 243);
  border-top: 1px solid rgb(215, 218, 220);
  position: relative;
}
.mypage {
  padding: 60px 0 0 0;
  .m-header {
    width: 100%;
    background: #fff;
    height: 50px;
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 99;
    top: 0;
    .divider {
      position: absolute;
      bottom: -10px;
    }
    h3 {
      position: absolute;
      transform: translateX(-50%);
      font-weight: normal;
      left: 50%;
    }
    .function {
      position: absolute;
      right: 10px;
      img {
      }
    }
  }
  .interface-menu {
    padding: 30px;
    text-align: center;
    .profile {
      .p-picture {
        margin: 0 0 15px 0;
        .user {
          width: 91px;
          margin: 32.5px auto 0 auto;
          span.circle {
            display: block;
            width: 74px;
            height: 74px;
            margin: -32.5px auto;
            border-radius: 50%;
            background: rgb(238, 241, 243);
          }
          .img-wrap {
            position: relative;
            img.bowl {
            }
            .layered-img {
              position: absolute;
              top: 3px;
              right: 15px;
              img.camera {
              }
            }
          }
        }
      }
    }
    .p-content {
      margin: 0 0 30px 0;
      h6 {
        font-weight: normal;
        margin: 0 0 10px 0;
      }
      .button-wrap {
        width: 121px;
        height: 32px;
        background: rgb(95, 187, 146);
        margin: 0 auto;
        border-radius: 4px;
        overflow: hidden;
        button {
          padding: 0;
          border: 0;
          width: inherit;
          height: inherit;
          color: #fff;
          background: transparent;
        }
      }
    }

    .room-function {
      display: flex;
      justify-content: center;
      .item {
        margin: 0 0 0 30px;
        &:first-of-type {
          margin: 0;
        }
        .img-wrap {
          margin: 0 0 10px 0;
        }
      }
    }
  }
  .menu {
    padding: 30px;
    .item {
      display: flex;
      align-items: center;
      margin: 25px 0 0 0;
      .img-wrap {
        margin: 0 15px 0 0;
      }
      &:first-of-type {
        margin: 0;
      }
    }
  }
}
</style>
