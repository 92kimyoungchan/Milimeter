<template>
  <div id="main-footer">
    <div class="mf-navigation">
      <router-link to="/">
        <div class="mf-nav-icon-wrap">
          <div class="mf-nav-icon" id="ubt-cn1">
            <img src="@/assets/images/ubt-cn1_off.svg" />
          </div>
          <span>홈</span>
        </div>
      </router-link>
      <router-link to="/">
        <div class="mf-nav-icon-wrap">
          <div class="mf-nav-icon" id="ubt-cn2">
            <img src="@/assets/images/ubt-cn2_off.svg" />
          </div>
          <span>화상정보</span>
        </div>
      </router-link>
      <router-link to="/">
        <div class="mf-nav-icon-wrap">
          <div class="mf-nav-icon" id="ubt-cn3">
            <img src="@/assets/images/ubt-cn3_off.svg" />
          </div>
          <span>온라인상담</span>
        </div>
      </router-link>
      <router-link to="/">
        <div class="mf-nav-icon-wrap">
          <div class="mf-nav-icon" id="ubt-cn4">
            <img src="@/assets/images/ubt-cn4_off.svg" />
          </div>
          <span>내 상처 관리</span>
        </div>
      </router-link>
      <router-link to="/">
        <div class="mf-nav-icon-wrap">
          <div class="mf-nav-icon" id="ubt-cn5">
            <img src="@/assets/images/ubt-cn5_off.svg" />
          </div>
          <span>정보공유</span>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    transOrder: {
      iconOrder: {
        type: Number
      }
    }
  },
  data() {
    return {
      effectOrder: this.transOrder.iconOrder
    };
  },
  methods: {
    test() {
      this.$router.push("/test");
    },
    example() {
      this.$router.push("/manageBurn/manageExample");
    }
  }
};
</script>
<style lang="scss"></style>
