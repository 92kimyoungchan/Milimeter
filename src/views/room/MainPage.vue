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
            <div class="room" v-for="(rItem, index) in room" :key="index + 'A'">
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
          </tab>
          <tab :tabData="tab[1]">
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
          </tab>
        </tabs>
      </div>
    </div>
    <app-footer :footerSet="footerSet"></app-footer>
  </div>
</template>
<script>
import AppFooter from "@/components/AppFooter.vue";
import vSelect from "vue-select";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
export default {
  components: {
    AppFooter,
    Tab,
    Tabs,
    vSelect,
  },
  data() {
    return {
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
  computed: {},
  methods: {
    pickItem(order) {
      if (this.room[order].isPick) {
       alert("찜 목록에 삭제되었습니다.")
       this.room[order].isPick = false;
      } else {
        alert("찜 목록에서 추가되었습니다.")
        this.room[order].isPick = true;
        
      }
     
    },
    reload(order) {
      let room;
      if (order === 0) {
        room = [
          {
            isPick: true,
            title: "짜장면 먹으러가실 분!",
            time: "PM 12:30",
            content: "중화요리전문점",
            maxPersonnel: 6,
            currentPersonnel: 2,
          },
          {
            isPick: false,
            title: "쌀국수 어때요?",
            time: "PM 18:30",
            content: "미분당",
            maxPersonnel: 2,
            currentPersonnel: 1,
          },
        ];
      } else if (order === 1) {
        room = [
          {
            isPick: false,
            title: "쌀국수 어때요?",
            time: "PM 18:30",
            content: "미분당",
            maxPersonnel: 2,
            currentPersonnel: 1,
          },
          {
            isPick: true,
            title: "짜장면 먹으러가실 분!",
            time: "PM 12:30",
            content: "중화요리전문점",
            maxPersonnel: 6,
            currentPersonnel: 2,
          },
        ];
      }
      this.room = room;
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
