<template>
  <div class="app-wrap room">
    <div class="r-navigation">
      <div class="select-wrap">
        <v-select
          :options="area.options"
          :searchable="false"
          v-model="area.value"
        ></v-select>
      </div>
      <div class="function">
        <div class="item" @click="reloadGps()">
          <img src="@/assets/images/gps_icon.svg" />
        </div>
        <div class="item" @click="setSorting()">
          <img src="@/assets/images/filter_icon.svg" />
        </div>
        <div class="item" @click="goPushList()">
          <img src="@/assets/images/bell_icon.svg" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="room-list">
        <tabs @reloadRoomList="reload($event)">
          <tab :tabData="tab[0]">
            <div class="room-wrap" v-if="room.length !== 0">
            <div class="room" v-for="(rItem, index) in room" :key="index + 'A'" >
              <div class="circle-ab" @click="pickItem(index)">
                <img src="@/assets/images/unlike_icon.svg" v-if="!rItem.isPick" />
                <img src="@/assets/images/like_icon.svg" v-else />
              </div>
              <ul class="decorateBg">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div class="r-info">
                <h5 class="title scale-subtitle">{{ rItem.title }}</h5>
                <div class="notification">
                  <p class="time scale-body">{{ rItem.time }}</p>
                  <div class="n-flex">
                    <p class="scale-body">{{ rItem.content }}</p>
                    <span class="scale-caption"
                      >{{ rItem.currentPersonnel }}/{{ rItem.maxPersonnel }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="empty" v-else>
              <div class="notice">
                <h5 class="scale-subtitle">신청가능한 방이 없네요 :)</h5>
                <h5 class="scale-subtitle">방을 직접 생성하시겠어요?</h5>
                <div class="btn-wrap">
                  <button type="button" class="scale-caption" @click="goWrite()">방 만들기</button>
                </div>
              </div>
            </div>
          </tab>
          <tab :tabData="tab[1]">
            <div class="room-wrap" v-if="room.length !== 0">
            <div class="room" v-for="(rItem, index) in room" :key="index + 'B'">
              <div class="circle-ab"  @click="pickItem(index)">
                <img src="@/assets/images/unlike_icon.svg" v-if="!rItem.isPick" />
                <img src="@/assets/images/like_icon.svg" v-else />
              </div>
              <ul class="decorateBg">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <div class="r-info">
                <h5 class="title scale-subtitle">{{ rItem.title }}</h5>
                <div class="notification">
                  <p class="time scale-body">{{ rItem.time }}</p>
                  <div class="n-flex">
                    <p class="scale-body">{{ rItem.content }}</p>
                    <span class="scale-caption"
                      >{{ rItem.currentPersonnel }}/{{ rItem.maxPersonnel }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div class="empty" v-else>
              <div class="notice">
                <h5 class="scale-subtitle">신청가능한 방이 없네요 :)</h5>
                <h5 class="scale-subtitle">방을 직접 생성하시겠어요?</h5>
                <div class="btn-wrap">
                  <button type="button" class="scale-caption" @click="goWrite()">방 만들기</button>
                </div>
              </div>
            </div>
          </tab>
        </tabs>
      </div>
    </div>
    <app-footer :footerSet="footerSet"></app-footer>
     <default-popup v-if="checkPopup" :popupSet="popupSet" @receive-pick="doPick"/>
  </div>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import vSelect from "vue-select";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import DefaultPopup from "@/components/DefaultPopup";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
export default {
  components: {
    AppFooter,
    Tab,
    Tabs,
    DefaultPopup,
    vSelect,
  },
  data() {
    return {
       popupSet: {
        confirmBtnText: "확인",
        nextLink: null,
        buttonType: "default",
        iconUrl: "cancel_alert_icon.svg"
      },
      footerSet: {
        activeOrder: 0,
      },
      area: {
        options: ["노원구", "강서구"],
        value: "" || "노원구",
      },
      tab: [
        {
          title: "신청가능한 방",
        },
        {
          title: "모두보기",
        },
      ],
      room: [],
    };
  },
  mounted() {},
  created() {
    console.log("가져온 방 생성 정보", this.GET_ROOM)
    console.log("가져오기 카운트", this.GET_ROOM.title !== null)
  },
  computed: {
      ...mapState("basic", ["checkPopup"]),
      ...mapGetters("room", ["GET_ROOM"]),
  },
  methods: {
    ...mapMutations("basic", ["SET_POPUP"]),
    goWrite() {
      this.$router.push("/createRoom");
    },
    doPick(order,flag) {
      this.room[order].isPick = flag;
    },
    pickItem(order) {
       this.SET_POPUP(true);
       this.popupSet.buttonType = "default";
      this.popupSet.popType = "pick";
      this.popupSet.cancelBtnText = "취소" 
      this.popupSet.pickFlag = this.room[order].isPick;
      this.popupSet.pickOrder = order;
      if (this.room[order].isPick) {
        this.popupSet.title = "찜 목록에서 삭제";
        this.popupSet.content =
          "찜목록에서 삭제할까요?";
        this.popupSet.confirmBtnText = "삭제";
      } else {
        this.popupSet.title = "찜 목록에 추가";
        this.popupSet.content =
          "찜목록에 추가할까요?";
        this.popupSet.confirmBtnText = "추가";
      } 
    },
    reload(order) {
      let room;
        if (order === 0) {
          room = [];
          if (this.GET_ROOM.title !== null) {
          const item = {
            isPick: false,
            title: this.GET_ROOM.title,
            time: this.GET_ROOM.mealTime,
            content: this.GET_ROOM.store,
            maxPersonnel: this.GET_ROOM.personel,
            currentPersonnel: 1
          }
          room.push(item)
        } 
        this.room = room;
      } else if (order === 1) {
        room = [
          {
            isPick: false,
            title: "쌀국수 어때요?",
            time: "PM 18:30",
            content: "미분당",
            maxPersonnel: 2,
            currentPersonnel: 2,
          },
          {
            isPick: true,
            title: "짜장면 먹으러가실 분!",
            time: "PM 12:30",
            content: "중화요리전문점",
            maxPersonnel: 6,
            currentPersonnel: 6,
          },
        ];
        if (this.GET_ROOM.title !== null) {
          const item = {
            isPick: false,
            title: this.GET_ROOM.title,
            time: this.GET_ROOM.mealTime,
            content: this.GET_ROOM.store,
            maxPersonnel: this.GET_ROOM.personel,
            currentPersonnel: 1
          }
          room.unshift(item)
        }
        console.log("변경할 룸", room);
        this.room = room;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.app-wrap {
  &.room {
    padding: 15px 0;
    background: rgb(239, 248, 244);
    .r-navigation {
      display: flex;
      padding: 0;
      justify-content: space-between;
      width: calc(100% - 70px);
      margin: 0 auto 20px auto;
      .select-wrap {
        min-width: 95px;
      }
      .function {
        display: flex;
        .item {
          &:first-of-type {
            margin: 0;
          }
          margin: 0 0 0 8px;
        }
      }
    }
    .container {
      padding: 0 35px;
      .room-list {
        .room-wrap {

        }
        .empty {
              display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - 125px);
    left: 50%;
    transform: translate(-50%, -50%);
    width: 265px;
    background: #efefef;
    height: 140px;
    border-radius: 12px;
          .notice {
            h5 {
              color: rgb(141,143,145);
              margin: 5px 0 0 0;
              font-weight: normal;
              &:first-of-type {
                margin:0;
              }
            }
            .btn-wrap {
              width: 86px;
    height: 30px;
    position: relative;
    background: #eef1f3;
    margin: 12.5px auto 0;
    border: 1px solid #757676;
    border-radius: 6px;
    overflow: hidden;
              button {
                background: transparent;
                border:0;
                width: inherit;
                line-height:30px;
              }
              &:hover {
                border: 1px solid rgb(95, 187, 146);
                button {
                  background:rgb(95, 187, 146);
                  color: #fff;
                }
              }
            }
          }
        }
        .room {
          display: flex;
          align-items: center;
          background: #fff;
          position: relative;
          min-height: 130px;
          box-shadow: 0px 3px 15px 0px rgba(95, 187, 146, 0.5);
          flex-direction: row-reverse;
          margin: 25px 0 0 0;
          border-radius: 12px;
          &:first-of-type {
            margin: 0;
          }
          .circle-ab {
            border-radius: 50%;
            overflow: hidden;
            display: flex;
            background: transparent;
            position: absolute;
            left: -45px;
            box-shadow: inset 0 0 0px 22.5px rgb(239, 248, 244);
          }
          ul.decorateBg {
            position: absolute;
            left: 55px;
            top: 0;
            li {
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: rgb(238, 241, 243);
              margin: 10px 0 0 0;
              &:first-of-type {
                margin: 0;
              }
            }
          }
          .r-info {
            width: calc(100% - 60px);
            padding: 0 0 0 20px;
            h5 {
              color: rgb(41, 42, 43);
              margin: 0 0 10px 0;
              font-weight: normal;
            }
            .notification {
              p {
                &.time {
                  color: rgb(95, 187, 146);
                }
              }
              .n-flex {
                display: flex;
                p {
                  width: calc(100% - 40px);
                }
                span {
                  width: 40px;
                  display: block;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
