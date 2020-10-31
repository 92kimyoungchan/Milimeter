<template>
  <div class="about">
    <h1 @click="checkPop()">This is an about page</h1>
    <add-popup v-if="checkPopup" :popupSet="popupSet" />
  </div>
</template>

<script>
import AddPopup from "@/components/AddPopup";
import { mapMutations, mapState } from "vuex";
export default {
  name: "TestPage",
  data() {
    return {
      popupSet: {
        confirmBtnText: "확인",
        nextLink: "/"
      }
    };
  },
  created() {},
  methods: {
    checkPop() {
      this.popupSet.count = "rating";
      this.SET_POPUP(true);
      this.popupSet.title = "제공해드린 서비스는 어떠셨나요?";
      this.popupSet.content =
        "&quot;경과기록&quot; 서비스를 통해 내 상처를 지속적으로 관리할 수 있습니다.";
    },
    ...mapMutations("basic", ["SET_POPUP"])
  },
  computed: {
    ...mapState("basic", ["checkPopup"])
  },
  components: {
    AddPopup
  }
};
</script>
