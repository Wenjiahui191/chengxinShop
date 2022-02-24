<template>
  <!-- 底部 -->
  <div class="copyright">
    <ul>
      <li>关于我们</li>
      <li>联系我们</li>
      <li>联系客服</li>
      <li>商家入驻</li>
      <li>营销中心</li>
      <li>手机橙心爱购</li>
      <li>销售联盟</li>
      <li>橙心爱购社区</li>
    </ul>
    <div class="address">地址：江西省南昌市青山湖区</div>
    <div class="beian">赣ICP备19006430号</div>
  </div>
</template>

<script>
export default {
  name: "CopyRight",
};
</script>

<style lang="less" scoped>
.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;

  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>