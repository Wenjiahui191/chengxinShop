<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
// 引入节流函数
import throttle from "lodash/throttle";

export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  computed: {
    imgObj() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    // 接受兄弟组件传递的当前点击图片的索引值
    this.$bus.$on("currentIndex", (currentIndex) => {
      this.currentIndex = currentIndex;
    });
  },
  methods: {
    // 未使用节流的图片放大预览
    // #region
    // move(event) {
    //   let mask = this.$refs.mask;
    //   let left = event.offsetX - mask.offsetWidth / 2;
    //   let top = event.offsetY - mask.offsetHeight / 2;
    //   // 约束范围
    //   if (left <= 0) left = 0;
    //   if (left >= mask.offsetWidth) left = mask.offsetWidth;
    //   if (top <= 0) top = 0;
    //   if (top >= mask.offsetHeight) top = mask.offsetHeight;
    //   // 让mask的定位g跟随计算出来的数值
    //   mask.style.left = left + "px";
    //   mask.style.top = top + "px";
    // },
    // #endregion
    move: throttle(function (event) {
      let mask = this.$refs.mask;
      let big = this.$refs.big;
      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;
      // 约束范围
      if (left <= 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight;
      // 让mask的定位g跟随计算出来的数值
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      big.style.left = -2 * left + "px";
      big.style.top = -2 * top + "px";
    }, 16),
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>