<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carouselObj in carouselList"
        :key="carouselObj.id"
      >
        <img :src="carouselObj.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: ["carouselList"],
  watch: {
    carouselList: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          // 实例化轮播图swiper
          var mySwiper = new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            autoplay: true,

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  --swiper-navigation-color: #ffffff;
  --swiper-pagination-color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>>
