<template>
  <div class="app-wrap">
    <app-header :transDataSet="transDate"></app-header>
    <div class="app-context">
      <div class="about">
        <h1 @click="checkRatingPop()">별점 팝업띄우기</h1>
      </div>
      <div class="about">
        <h1 @click="checkPop()">커스텀 팝업띄우기</h1>
      </div>
    </div>
    <app-footer :transOrder="iconOrderValue"></app-footer>
    <add-popup v-if="checkPopup" :popupSet="popupSet" />
  </div>
</template>

<script>
import AddPopup from "@/components/AddPopup";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import { mapMutations, mapState } from "vuex";
export default {
  name: "",
  data() {
    return {
      transDate: {
        headerName: "알림",
        prevUrl: "/",
        leftButton: "menu",
        rightButton: "alarm"
      },
      popupSet: {
        confirmBtnText: "확인",
        nextLink: "/"
      },
      iconOrderValue: {
        iconOrder: 1
      }
    };
  },
  created() {},
  methods: {
    checkRatingPop() {
      this.popupSet.count = "rating";
      this.SET_POPUP(true);
      this.popupSet.title = "제공해드린 서비스는 어떠셨나요?";
      this.popupSet.content =
        "&quot;경과기록&quot; 서비스를 통해 내 상처를 지속적으로 관리할 수 있습니다.";
    },
    checkPop() {
      const transPopItem = [];
      const item1 = {
        title: "[특징]",
        content:
          "표피충에 국한된 손상이 발생되며 색깔 변화, 통증, 수포 형성이 없습니다."
      };
      const item2 = {
        title: "[치료]",
        content:
          "화상을 당한 후 상처부위가 빨갛게 되고 아프지만 약 48시간 후에는 통증이 사라집니다. 수포는 발생하지 않고 대부분 7일 이내에 치유가 가능합니다."
      };
      transPopItem.push(item1);
      transPopItem.push(item2);
      this.popupSet.count = "inImgPop";
      this.popupSet.inPopItem = transPopItem;
      this.SET_POPUP(true);
      this.popupSet.modalImg = "burnPop.svg";
      this.popupSet.title = undefined;
      this.popupSet.content = undefined;
    },
    ...mapMutations("basic", ["SET_POPUP"])
  },
  computed: {
    ...mapState("basic", ["checkPopup"])
  },
  components: {
    AppHeader,
    AddPopup,
    AppFooter
  }
};
</script>
<style lang="scss" scoped></style>
