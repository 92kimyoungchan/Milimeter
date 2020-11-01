<template>
  <div class="about">
    <div class="container">
      <div class="swiper-wrap">
        <swiper
          :options="swiperOption"
          ref="mySwiperRef"
          @slideChange="changeSwiperIndex"
        >
          <swiper-slide v-for="(swiper, index) in swiperItem" :key="index">
            <div class="img-wrap">
              <img :src="swiper.img" />
            </div>
            <div class="content">
              <h6 class="scaleTitle">{{ swiper.title }}</h6>
              <p class="scaleBody" v-html="computedContentBody"></p>
            </div>
            <div class="button-wrap">
              <button class="scaleSubtitle" type="button" @click="nextSlide()">
                다음으로
              </button>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
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
      currentIndex: "0",
      swiperOption: {
        autoHeight: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiperItem: [
        {
          img: require("@/assets/images/intro1_img.svg"),
          title: "mealimeter[밀리미터]는",
          body:
            "바쁜 일상 속에서 끼니는 챙겨야 하지만\n" +
            "혼밥은 부담스러운 현대인들에게"
        },
        {
          img: require("@/assets/images/intro2_img.svg"),
          title: "mealimeter[밀리미터]는",
          body: "함께 식사할 사람들을 매칭시켜주는\n" + "애플리케이션입니다."
        }
      ]
    };
  },
  mounted() {},
  computed: {
    computedContentBody() {
      return this.swiperItem[this.currentIndex].body.split("\n").join("<br />");
    }
  },
  methods: {
    nextSlide() {
      if (this.currentIndex !== 1) {
        this.$refs.mySwiperRef.$swiper.slideNext();
      } else {
        alert("으아");
      }
    },
    changeSwiperIndex() {
      this.currentIndex = this.$refs.mySwiperRef.$swiper.activeIndex;
      return this.$refs.mySwiperRef.$swiper.activeIndex;
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  .container {
    .swiper-wrap {
      display: flex;
      align-items: center;
      height: inherit;
      .swiper-container {
        .swiper-wrapper {
          .swiper-slide {
            padding: 0;
            .img-wrap {
              text-align: center;
              margin: 0 0 40px 0;
              img {
                max-width: 100%;
              }
            }
            .content {
              text-align: center;
              margin: 0 0 65px 0;
              h6 {
                color: rgb(41, 42, 43);
                margin: 0 0 10px 0;
                font-weight: normal;
              }
              p {
              }
            }
            .button-wrap {
              width: 120px;
              height: 50px;
              border-radius: 10px;
              overflow: hidden;
              background-color: #242249;
              margin: 0 30px 0 auto;
              button {
                height: 100%;
                width: 100%;
                color: #fff;
                border: 0;
                background: transparent;
              }
            }
            &.active {
            }
          }
        }
        .swiper-pagination {
          left: 30px;
          text-align: left;
        }
      }
    }
  }
}
</style>
