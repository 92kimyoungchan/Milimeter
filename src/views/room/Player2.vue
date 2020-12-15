<template>
  <div class="app-wrap own-room">
    <app-header
      :transDataSet="transData"
      @prevSection="prev()"
    ></app-header>
      <div class="own-room whole">
        <tabs @reloadRoomList="reload($event)"> 
          <tab :tabData="tab[0]">
            <div class="container">
              <div class="item" v-for="(lisItem, index) in room" :key="index">
              <div class="profile-complex">
                <div class="profile">
                  <div class="img-wrap">
                     <img :src="require(`@/assets/images/${lisItem.img}`)" />
                  </div>
                  <div class="p-info">
                    <h5 class="scale-body-2">{{ lisItem.id }}</h5>
                    <p class="scale-caption">{{ lisItem.age }}ㆍ{{ lisItem.gender }}</p>
                  </div>
                </div>
                <div class="btn-wrap">
                  <button class="scale-body" type="button">프로필</button>
                </div>
              </div>
              <div class="action">
                <div class="a-item-wrap">
                <div class="a-item">
                  <span class="scale-body-2">상세보기</span>
                </div>  
                 <div class="a-item">
                  <span class="scale-body-2">매너점수 주기</span>
                </div>
                </div>
              </div>
              </div>
            </div>
          </tab>
        </tabs>
      </div>
    <app-footer :footerSet="footerSet"></app-footer>
    <default-popup v-if="checkPopup" :popupSet="popupSet" @receive-refuseApply="refuseAct()"/>
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
        headerName: "신청자 목록",
        isOpaque: true,
        prevUrl: "/listRoom",
        leftButton: "prev",
      },
      tab: [
        {
          title: "모두보기",
        },
      ],
      room: []
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
        room = [
          {
            id: "나도Nado",
            age: "25",
            gender: "남",
            img:"profile-img.png"
          },
          {
             id: "레이똥꾸와 호이박사",
            age: "26",
            gender: "여",
             img:"yeti.jpg"
          },
           {
             id: "고양이는 귀여워",
            age: "30",
            gender: "여",
            img:"profile-img.png"
          }
        ];
      this.room = room;
    },
    deleteRoom() {
       this.SET_POPUP(true);
        this.popupSet.buttonType = "default";
        this.popupSet.popType = "refuseApply";
        this.popupSet.cancelBtnText = "취소" 
        this.popupSet.title = "신청자 관리";
        this.popupSet.content = "신청을 정말 거절할까요?";
        this.popupSet.confirmBtnText = "거절";
    },
     refuseAct() {
        const wholeArray = JSON.parse(JSON.stringify(this.room))
      this.removeA(wholeArray, wholeArray[0]);
      this.room = wholeArray;
    },
    removeA (arr) {
      let what
      const a = arguments
      let L = a.length
      let ax
      while (L > 1 && arr.length) {
        what = a[--L]
        while ((ax = arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1)
        }
      }
      return arr
    },
    prev() {
      this.transData.prevUrl = "/listRoom";
    }
  }
};
</script>

<style lang="scss" scoped>
.app-wrap {
  .own-room {
    position: relative;
    padding:54px 0 72px 0;
    .tab-wrapper {
    }
   .container {
     padding: 0;
     .item {
       .profile-complex {
         display: flex;
         align-items: center;
         padding:40px 30px;
         .profile {
           display:flex;
           align-items: center;
           width:calc(100% - 60px);
           .img-wrap {
             width:60px;
           height:60px;
           margin: 0 15px 0 0;
           border-radius:30px;
           overflow: hidden;
           img {
             max-width:100%;
             height: auto;
           }
           }
        
         .p-info {
           width:calc(100% - 75px);
           h5 {
             margin: 0 0 2px 0;
           }
           p {
             color: rgb(141,143,145);
           }
         }
          }
         .btn-wrap {
           width:60px;
           display:flex;
           justify-content: center;
           align-items: center;
           height:30px;
           background:rgb(95,187,146);
           border-radius:6px;
           overflow: hidden;
           button {
             border:0;
             background: transparent;
             color:#fff;
             line-height:30px;
           }
         }
       }
       .action {
          border: 0px solid rgb(215, 218, 220);
          border-width:1px 0;
          .a-item-wrap {
            display:flex;
            &.whole {
              .a-item {
                width: 100%;
              }
            }
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
