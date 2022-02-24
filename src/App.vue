<template>
  <div>
    <Header />
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter" />
  </div>
</template>

<script>
// 引入静态组件
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派获取三级列表数据 避免重复请求性能优化
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style lang="css">
/* 解决elementUI弹框使得画面抖动的问题 */
body {
  padding-right: 0px !important;
  overflow: hidden;
}
</style>