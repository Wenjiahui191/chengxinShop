<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(list, index) in floorList" :key="list.id" :list="list" />
    <Brand />
    <FootBanner />
  </div>
</template>

<script>
// 引入组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import FootBanner from "@/pages/Home/FootBanner";
import { mapState, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
    FootBanner,
  },
  mounted() {
    // 派发action
    this.$store.dispatch("home/getFloorList");
  },
  computed: {
    // 从仓库中获取floor数据
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style lang="css">
</style>