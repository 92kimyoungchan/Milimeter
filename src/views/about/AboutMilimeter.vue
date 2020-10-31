<template>
  <div class="about">
    <div class="container">
      <div class="swiper-wrap">
        <swiper :options="swiperOption">
          <swiper-slide>
            <p>테스트입니다. 1</p>
          </swiper-slide>
          <swiper-slide>
            <p>테스트입니다. 2</p>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.about {
  .container {
    .swiper-wrap {
      
    }
  }
}
</style>
