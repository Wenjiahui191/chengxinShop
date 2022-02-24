<template>
  <!--今日推荐-->
  <div class="today-recommend">
    <div class="banner">
      <img src="./images/banner1.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
};
</script>

<style lang="less" scoped>
.today-recommend {
  position: relative;
  margin: 0 auto;
  padding: 10px;
  width: 1200px;
  text-align: center;
  & img {
    width: 100%;
  }
  &::after {
    content: "X";
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    color: #fff;
    background-color: #ccc;
    opacity: 0.8;
  }
}
</style>
