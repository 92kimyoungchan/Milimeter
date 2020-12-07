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
              <div class="circle-ab">
                 <img src="@/assets/images/unlike_icon.svg" v-if="!rItem.isPick"/>
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
                <h5 class="title">{{ rItem.title }}</h5>
                <div class="notification">
                <p class="time">{{ rItem.time }}</p>
                <div class="n-flex">
                <p>{{ rItem.content }}</p><span>{{ rItem.currentPersonnel }}/{{ rItem.maxPersonnel }}</span>
                </div>
                </div>
              </div>
            </div>
          </tab>
          <tab :tabData="tab[1]">
            <div class="room" v-for="(rItem, index) in room" :key="index + 'B'">
              <div class="circle-ab">
                 <img src="@/assets/images/unlike_icon.svg" v-if="!rItem.isPick"/>
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
                <h5 class="title">{{ rItem.title }}</h5>
                <div class="notification">
                <p class="time">{{ rItem.time }}</p>
                <div class="n-flex">
                <p>{{ rItem.content }}</p><span>{{ rItem.currentPersonnel }}/{{ rItem.maxPersonnel }}</span>
                </div>
                </div>
              </div>
            </div>
          </tab>
      </tabs>
    </div>
    </div>
    <app-footer></app-footer>
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
      area: {
        options: ["노원구", "강서구"],
        value: "" || "노원구"
      },
        tab: [
          {
            title: "신청가능한 방"
          },
          {
            title: "모두보기"
          }
        ],
        room : []
    };
  },
  mounted() {},
  computed: {},
  methods: {
    reload(order) {
      let room
      if (order === 0) {
         room = [
                {
                  isPick: false,
                  title: "짜장면 먹으러가실 분!",
                  time: "PM 12:30",
                  content: "중화요리전문점",
                  maxPersonnel:6,
                  currentPersonnel:2
                }
              ]
      } else if (order === 1) {
          room = [
                {
                  isPick: false,
                  title: "쌀국수 어때요?",
                  time: "PM 18:30",
                  content: "미분당",
                  maxPersonnel:2,
                  currentPersonnel:1
                }
              ]
      }   
      this.room = room;
    }
  },
};
</script>

<style lang="scss" scoped>
.app-wrap {
  &.room {
    .r-navigation {
      display: flex;
      padding: 0;
      justify-content: space-between;
      width: calc(100% - 70px);
      margin: 0 auto 20px auto;
      .select-wrap {
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
      
    }
  }
}
</style>
