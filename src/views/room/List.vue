<template>
  <div class="app-wrap own-room">
    <app-header
      :transDataSet="transData"
      @prevSection="prev()"
    ></app-header>
      <div class="own-room">
        <tabs @reloadRoomList="reload($event)"> 
          <tab :tabData="tab[0]">
            <div class="container">
              <div class="item" v-for="(lisItem, index) in room" :key="index">
               <div class="list">
                <div class="status" :class="{ active: lisItem.isProceeding }">
                  <span class="scale-caption" v-if="lisItem.isProceeding">진행중</span>
                  <span class="scale-caption" v-else>진행종료</span>
                </div>
                <h4 class="title scale-subtitle">{{ lisItem.title }}</h4>
                <div class="info">
                  <p class="scale-body">{{ lisItem.time }}</p>
                  <div class="flex-paragraph">
                    <p class="scale-body">{{ lisItem.content }}</p>
                    <span class="scale-caption">{{ lisItem.currentPersonnel }}/{{ lisItem.maxPersonnel }}</span>
                  </div>
                </div>
               </div>
              <div class="action" :class="{ isProceeding: lisItem.isProceeding }">
                <div class="a-item-wrap" v-if="lisItem.isProceeding">
                <div class="a-item" @click="deleteRoom()">
                  <span class="scale-body-2">방 삭제</span>
                </div>
                <div class="a-item">
                  <span class="scale-body-2">방 정보 수정</span>
                </div>
                <div class="a-item">
                  <span class="scale-body-2">신청자 목록</span>
                </div>
                </div>
                <div class="a-item-wrap" v-else>
                <div class="a-item">
                  <span class="scale-body-2">방 상세보기</span>
                </div>
                <div class="a-item">
                  <span class="scale-body-2">신청자 목록보기</span>
                </div>
                
                </div>
              </div>
              </div>
            </div>
          </tab>
          <tab :tabData="tab[1]">
            <div class="container">
              <div class="item" v-for="(lisItem, index) in room" :key="index">
               <div class="list">
                <div class="status" :class="{ active: lisItem.isProceeding }">
                  <span class="scale-caption" v-if="lisItem.isProceeding">진행중</span>
                  <span class="scale-caption" v-else>진행종료</span>
                </div>
                <h4 class="title scale-subtitle">{{ lisItem.title }}</h4>
                <div class="info">
                  <p class="scale-body">{{ lisItem.time }}</p>
                  <div class="flex-paragraph">
                    <p class="scale-body">{{ lisItem.content }}</p>
                    <span class="scale-caption">{{ lisItem.currentPersonnel }}/{{ lisItem.maxPersonnel }}</span>
                  </div>
                </div>
               </div>
              <div class="action" :class="{ isProceeding: lisItem.isProceeding }">
                <div class="a-item-wrap" v-if="lisItem.isProceeding">
                <div class="a-item" @click="deleteRoom()">
                  <span class="scale-body-2">방 삭제</span>
                </div>
                <div class="a-item">
                  <span class="scale-body-2">방 정보 수정</span>
                </div>
                <div class="a-item">
                  <span class="scale-body-2">신청자 목록</span>
                </div>
                </div>
                <div class="a-item-wrap" v-else>
                <div class="a-item">
                  <span class="scale-body-2">방 상세보기</span>
                </div>
                <div class="a-item">
                  <span class="scale-body-2">신청자 목록보기</span>
                </div>
                
                </div>
              </div>
              </div>
            </div>
          </tab>
        </tabs>
      </div>
    <app-footer :footerSet="footerSet"></app-footer>
    <default-popup v-if="checkPopup" :popupSet="popupSet" />
  </div>
</template>
<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import Tabs from "@/components/Tabs.vue";
import Tab from "@/components/Tab.vue";
import DefaultPopup from "@/components/DefaultPopup";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    AppHeader,
    AppFooter,
    Tab,
    DefaultPopup,
    Tabs,
  },
  data() {
    return {
      popupSet: {
        confirmBtnText: "삭제",
        cancelBtnText: "취소",
        nextLink: null,
        buttonType: "default",
        iconUrl: "cancel_alert_icon.svg"
      },
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
  computed: {
      ...mapState("basic", ["checkPopup"]),
  },
  created() {
  },
  methods: {
    ...mapMutations("basic", ["SET_POPUP"]),
    reload(order) {
      let room;
      if (order === 0) {
        room = [
          {
            isProceeding: true,
            title: "짜장면 먹으러가실 분!",
            time: "PM 12:30",
            content: "중화요리전문점",
            maxPersonnel: 6,
            currentPersonnel: 2,
          },
          {
            isProceeding: true,
            title: JSON.parse(sessionStorage.getItem("roomInfo")).title,
            time: "PM 19:30",
            content: JSON.parse(sessionStorage.getItem("roomInfo")).store,
            maxPersonnel: JSON.parse(sessionStorage.getItem("roomInfo")).personel,
            currentPersonnel: 1,
          }
        ];
      } else if (order === 1) {
        room = [
          {
            isProceeding: true,
            title: "짜장면 먹으러가실 분!",
            time: "PM 12:30",
            content: "중화요리전문점",
            maxPersonnel: 6,
            currentPersonnel: 2,
          },
           {
            isProceeding: true,
            title: JSON.parse(sessionStorage.getItem("roomInfo")).title,
            time: "PM 19:30",
            content: JSON.parse(sessionStorage.getItem("roomInfo")).store,
            maxPersonnel: JSON.parse(sessionStorage.getItem("roomInfo")).personel,
            currentPersonnel: 1,
          },
            {
            isProceeding: false,
            title: "쌀국수 어때요?",
            time: "PM 18:30",
            content: "미분당",
            maxPersonnel: 2,
            currentPersonnel: 1,
          }
        ];
      }
      this.room = room;
    },
    deleteRoom() {
      const sampleRoom = [
         {
            isProceeding: true,
            title: "짜장면 먹으러가실 분!",
            time: "PM 12:30",
            content: "중화요리전문점",
            maxPersonnel: 6,
            currentPersonnel: 2,
          }
      ]
       this.SET_POPUP(true);
        this.popupSet.title = "방 관리";
        this.popupSet.content =
          "방을 정말 삭제할까요?";
        this.popupSet.popType = "defaultType";
        this.popupSet.buttonType = "default",
        this.popupSet.nextLink = null
      setTimeout(() => {
        this.room = sampleRoom;
      }, 1500); 
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
    }
   .container {
     padding: 0 0 72px 0;
     .item {
       .list {
          padding: 30px 24px;
          cursor:pointer;
          &:hover {
            background:rgba(95,187,146,0.25);
          }
         .status {
           border-radius: 6px;
           background:rgb(141,143,145);
           margin:0 0 8px 0;
           width:fit-content;
           &.active {
             background:rgb(35,204,137);
           }
           span {
             color:#fff;
             padding:0 5px;
             display:block;
             line-height: 22px;
           }
         }
         .title {
           margin:0 0 10px 0;
           font-weight:normal;
         }
       }
       .info {
         .flex-paragraph {
           display:flex;
           justify-content: space-between;
           p {

           }
           span {
             color:rgb(141,143,145);
           }
         }
         p {
           &:first-of-type {
             margin:0;
           }
           margin:8px 0 0 0;
         }
       }
       .action {
          border: 0px solid rgb(215, 218, 220);
          border-width:1px 0;
          .a-item-wrap {
            display:flex;
         .a-item {
           border:0px solid rgb(215,218,220);
           border-width:0 0 0 1px;
           width:calc(100% / 2);
           text-align:center;
           padding:10px 0;
           cursor:pointer;
           &.isProceeding {
              width:calc(100% / 3);
           }
           &:first-of-type {
             border-width:0 0 0 0;
           }
           &:hover {
             background:#e9e9e9;
           }
           span {
             color:rgb(41,42,43);
             font-weight:normal;
           }
         }
          }
       }
     }
   }
  }
}
</style>
