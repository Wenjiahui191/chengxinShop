<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!--面包屑-->
          <ul class="fl sui-tag">
            <!-- 分类名面包屑 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i class="el-icon-close" @click="removeCategoryName"></i>
            </li>
            <!-- 搜索关键字面包屑 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i class="el-icon-close" @click="removeKeyword"></i>
            </li>
            <!-- 品牌名面包屑 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i class="el-icon-close" @click="removeTrademark"></i>
            </li>
            <!-- 参数属性面包屑 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="attr.split(':')[0]"
            >
              {{ attr.split(":")[1] }}
              <i class="el-icon-close" @click="removeAttr(index)"></i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector ref="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOrderOne }" @click="changeOrder('1')">
                  <a href="#"
                    >综合<i
                      :class="{
                        'el-icon-sort-up': isUp,
                        'el-icon-sort-down': isDown,
                      }"
                      v-show="isOrderOne"
                    ></i
                  ></a>
                </li>
                <li :class="{ active: isOrderTwo }" @click="changeOrder('2')">
                  <a href="#"
                    >价格<i
                      :class="{
                        'el-icon-sort-up': isUp,
                        'el-icon-sort-down': isDown,
                      }"
                      v-show="isOrderTwo"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器组件 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continuous="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        //产品相应的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 8,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  computed: {
    ...mapGetters("search", ["goodsList", "total"]),
    // 判断排序是否为1
    isOrderOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    // 判断排序是否为2
    isOrderTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    // 判断箭头类型
    isUp() {
      return this.searchParams.order.split(":")[1] === "asc";
    },
    isDown() {
      return this.searchParams.order.split(":")[1] === "desc";
    },
  },
  // 挂载之前整理信息
  beforeMount() {
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 组件挂载完毕调用一次获取商品列表的函数
    this.getList();
    // 绑定自定义事件
    this.$refs.trademarkInfo.$on("trademarkInfo", (trademark) => {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getList();
    });
  },
  methods: {
    // 定义方法，可多次执行发送数据到服务器
    getList() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    // 点击X关闭tag标签
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getList();
      // 清除路径当中的query，如果有param参数，则在跳转时携带
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
    },
    // 关闭关键词生成的标签
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getList();
      // 激发Header关键字清除事件
      this.$bus.$emit("clear");
      // 清除路径当中的params，如果有query参数，则在跳转时携带
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    // 关闭品牌标签
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getList();
    },
    // 删除属性标签
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getList();
    },
    // 绑定自定义事件，接受属性值
    attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
        this.getList();
      }
    },
    // 排序点击事件
    changeOrder(flag) {
      // 初始数据中的flag
      let originFlag = this.searchParams.order.split(":")[0];
      // 初始的排序
      let originSort = this.searchParams.order.split(":")[1];
      // 点击后sort
      let newOder = "";
      if (flag == originFlag) {
        newOder = `${flag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOder;
      this.getList();
    },
    // 自定义时间获取点击的页码
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getList();
    },
  },
  watch: {
    $route(newValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 请求发送后清除Id属性
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getList();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .el-icon-close {
    color: #e1251b;
    margin-left: 0;
    margin-top: 3px;
  }

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #e1251b;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 0px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #e1251b;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: 100%;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>