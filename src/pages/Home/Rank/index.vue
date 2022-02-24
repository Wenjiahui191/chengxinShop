<template>
  <!-- 商品排行 -->
  <div class="rank">
    <div class="tab">
      <div class="tab-tit clearfix">
        <a
          href="javascript:;"
          v-for="(t, index) in title"
          :key="index"
          @click="chooseType(index)"
        >
          <p class="img">
            <i :class="{ active: currentIndex == index }"></i>
          </p>
          <p :class="{ text: currentIndex == index }">{{ t }}</p>
        </a>
      </div>
    </div>
    <div class="content">
      <ul class="recomList">
        <li>
          <div class="img-item" v-for="(i, index) in 4" :key="index">
            <p class="tab-pic">
              <a href="#">
                <img
                  src="./images/1.jpg"
                  @mouseenter="imgIn"
                  @mouseout="imgOut"
                />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="#"
                  >【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
                  移动联通电信4G手机</a
                >
              </div>
              <p class="info-price">定金：¥{{ getNumber(200, 300) }}.00</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rank",
  data() {
    return {
      title: ["热卖排行", "特价排行", "新品排行"],
      currentIndex: 0,
    };
  },
  methods: {
    getNumber(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },
    chooseType(index) {
      this.currentIndex = index;
    },
    imgIn(e) {
      let img = e.target;
      img.style.transform = "scale(1.1)";
      img.style.opacity = ".6";
      img.style.transition = "1s";
    },
    imgOut(e) {
      let img = e.target;
      img.style.transform = "scale(1)";
      img.style.opacity = "1";
    },
  },
};
</script>

<style lang="less" scoped>
@orange: #f19501;
.rank {
  width: 1200px;
  margin: 0 auto;

  .tab {
    margin: 0 auto;
    overflow: hidden;
    width: 312px;

    .tab-tit {
      text-align: center;
      a {
        display: block;
        padding: 0 18px;
        float: left;
        text-decoration: none;
        font-size: 16px;
        color: #999;
      }

      p {
        margin: 5px 0;
        &.text {
          color: #e1251b;
        }
      }

      .img {
        i {
          width: 35px;
          height: 35px;
          display: block;
          background: url(./images/bg0.png);
          margin-left: 10px;
          &.active {
            background-position: -35px 0;
            color: #e1251b;
          }
        }
      }

      .text {
        line-height: 28px;
      }
    }

    .img {
      i {
        background-position: -35px 0;
      }
    }
  }
}

.content {
  overflow: hidden;
  padding: 10px;

  ul {
    // 解决缩放过程中排版出现错乱
    width: 1210px;
    li {
      overflow: hidden;
      list-style: none;
      line-height: 18px;

      .img-item {
        border: 1px solid #e1251b;
        border-radius: 2px;
        width: 269px;
        float: left;
        overflow: hidden;
        margin: 0 12px 10px;
        background: #fff;
        &:hover {
          border: 1px solid @orange;
        }
        .tab-pic {
          width: 230px;
          height: 210px;
          overflow: hidden;
          text-align: center;
          margin: 15px auto 10px;

          a {
            img {
              width: 200px;
              height: 200px;
            }
          }
        }

        .tab-info {
          background: #fafafa;

          .info-title {
            height: 50px;
            line-height: 28px;
            overflow: hidden;
            margin: 0 auto;
            padding-left: 10px;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .info-price {
            font-size: 20px;
            color: #e1251b;
            height: 35px;
            padding-left: 10px;
            display: block;
            line-height: 24px;
            margin: 10px auto 0;
          }
        }
      }
    }
  }
}
</style>