<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="continuousStarEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="continuousStarEndNum.start > 2">···</button>

    <button
      v-for="(page, index) in continuousStarEndNum.end"
      :key="index"
      v-if="page >= continuousStarEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="continuousStarEndNum.end < pageTotal - 1">···</button>
    <button
      v-if="continuousStarEndNum.end < pageTotal"
      @click="$emit('getPageNo', pageTotal)"
    >
      {{ pageTotal }}
    </button>
    <button
      :disabled="pageNo == pageTotal"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continuous"],
  computed: {
    //   根据总数据计算出总的页数
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算分页器连续显示的页数
    continuousStarEndNum() {
      let { pageTotal, continuous, pageNo } = this;
      let start = 0;
      let end = 0;
      if (continuous > pageTotal) {
        start = 1;
        end = pageTotal;
      } else {
        start = pageNo - parseInt(continuous / 2);
        end = pageNo + parseInt(continuous / 2);
        if (start < 1) {
          start = 1;
          end = continuous;
        }
        if (end > pageTotal) {
          end = pageTotal;
          start = pageTotal - continuous + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e83829;
      color: #fff;
    }
  }
}
</style>