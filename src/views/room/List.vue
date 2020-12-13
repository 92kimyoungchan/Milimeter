<template>
  <div class="app-wrap own-room">
    <app-header
      :transDataSet="transData"
      @prevSection="prev()"
    ></app-header>
      <div class="own-room">
        <tabs @reloadRoomList="reload($event)"> 
           <div class="divider"></div>
          <tab :tabData="tab[0]">
            <div class="container">11</div>
          </tab>
          <tab :tabData="tab[1]">
            <div class="container">22</div>
          </tab>
        </tabs>
      </div>
    <app-footer :footerSet="footerSet"></app-footer>
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
    Tab,
    Tabs,
  },
  data() {
    return {
      footerSet: {
        activeOrder: 1,
      },
        transData: {
        headerName: "생성한 방",
        isOpaque: true,
        prevUrl: "/room",
        leftButton: "prev",
      },
      tab: [
        {
          title: "진행중",
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
    prev() {
      this.transData.prevUrl = "/room";
    }
  },
};
</script>

<style lang="scss" scoped>
.app-wrap {
  .own-room {
    position: relative;
    padding:54px 0 0 0;
    .tab-wrapper {
      padding:10px 0 0 0;
    }
   .container {
     padding: 0;
   }
  }
}
</style>
