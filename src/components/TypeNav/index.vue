<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派 |事件代理 鼠标移入触发背景样式 鼠标移出触发-->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 | 一级标题 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch($event)">
              <div
                class="item"
                v-for="(c1, index) in categoryLists"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="currentBg(index)"
                  :class="{ currentBg: currentIndex === index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <i class="el-icon-arrow-right"></i>
                </h3>
                <!-- 二级标题 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="c3 in c2.categoryChild"
                          :key="c3.categoryChild"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">橙心超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入节流函数
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 初始化分类列表停留的index
      currentIndex: -1,
      // 是否展开下拉列表 | 初始值为true
      show: true,
    };
  },
  // 当分类导航栏挂载完毕调用action发送请求
  mounted() {
    // console.log(this.$route);
    // 当路由路径不为主页时，typeNav不展开
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    // 从仓库获取三级列表数据
    ...mapState("home", ["categoryLists"]),
  },
  methods: {
    currentBg: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标移出导航列表样式消失，且利用事件代理让移出事件在离开父盒子才生效
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },

    // 鼠标进入展示列表，此事件为路由路径为'/search'触发
    enterShow() {
      this.show = true;
    },

    goSearch(event) {
      //event.target:获取到的是出发事件的元素(div、h3、a、em、dt、dl)
      let node = event.target;
      //给a标签添加自定义属性data-categoryName,全部的字标签当中只有a标签带有自定义属性，别的标签名字----dataset纯属扯淡
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      //第二个问题解决了：点击的到底是不是a标签（只要这个标签身上带有categoryname）一定是a标签
      //当前这个if语句：一定是a标签才会进入
      if (categoryname) {
        //准备路由跳转的参数对象
        let loction = { name: "search" };
        let query = { categoryName: categoryname };
        //一定是a标签：一级目录
        if (category1id) {
          query.category1Id = category1id;
          //一定是a标签：二级目录
        } else if (category2id) {
          query.category2Id = category2id;
          //一定是a标签：三级目录
        } else {
          query.category3Id = category3id;
        }
        //判断：如果路由跳转的时候，带有params参数，捎带脚传递过去
        if (this.$route.params) {
          loction.params = this.$route.params;
          //动态给location配置对象添加query属性
          loction.query = query;
          //路由跳转
          this.$router.push(loction);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        &:hover {
          color: #e1251b;
        }
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 47px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            position: relative;
            line-height: 28.8px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            cursor: pointer;
            .el-icon-arrow-right {
              position: absolute;
              top: 8px;
              right: 5px;
              color: #ccc;
            }
            a {
              color: #333;
            }
          }
          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
            .el-icon-arrow-right {
              color: #fff;
            }
          }
        }
        .currentBg {
          background-color: #e83829;
          a {
            color: #f7f7f7 !important;
            cursor: pointer !important;
          }
        }
      }
    }
  }
}
.sort-enter {
  height: 0px;
  opacity: 0;
}
.sort-enter-to {
  height: 461px;
  opacity: 1;
}
.sort-enter-active {
  transition: 0.3s linear;
}
</style>