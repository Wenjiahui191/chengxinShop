<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-if="cartInfoList.length == 0">
        <div class="empty">
          <img src="./images/empty.gif" />
        </div>
        <ul
          class="cart-list"
          v-for="(cartInfo, index) in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @click="changeCheckedById(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <!-- 数量增减改变 -->
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('mins', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change', $event.target.value, cartInfo)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('plus', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteShopCart(cartInfo)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isCheckAll && cartInfoList.length > 0"
          @change="allCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ total }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" lass="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  mounted() {
    // 挂在完毕获取购物车数据
    this.getData();
  },
  computed: {
    ...mapGetters("shopcart", ["cartList"]),
    // 购物车商品列表
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 是否全选
    isCheckAll() {
      return this.cartInfoList.every((cart) => {
        return cart.isChecked == 1;
      });
    },
    // 选中的总数
    total() {
      let num = 0;
      this.cartInfoList.forEach((cart) => {
        if (cart.isChecked == 1) {
          num++;
        }
      });
      return num;
    },
    // 购物车总价
    totalPrice() {
      let totalPrice = 0;
      this.cartInfoList.forEach((cart) => {
        totalPrice += cart.skuNum * cart.skuPrice;
      });
      return totalPrice;
    },
  },
  methods: {
    // 获取服务器购物车数据
    getData() {
      this.$store.dispatch("shopcart/getShopCartInfo");
    },

    // 改变购物车商品的数量 加入节流 防止用户操作过快
    changeSkuNum: throttle(async function (type, disNum, cart) {
      //  根据类型进行判别
      switch (type) {
        // 点击加
        case "add":
          disNum = 1;
          break;
        case "mins":
          // skuNum>1才发生改变
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        // 用户输入
        case "change":
          // 合法性校验
          disNum =
            isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cart.skuNum;
          break;
      }
      // 计算完改变完的数量，派发action更新购物车
      try {
        await this.$store.dispatch("detail/addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 成功后重新获取购物车数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 1000),

    // 删除购物车商品并判断是否成功
    async deleteShopCart(cart) {
      try {
        await this.$store.dispatch("shopcart/deleteShopCart", cart.skuId);
        // 重新获取购物车数据
        this.getData();
      } catch (error) {
        alert("删除操作失败");
      }
    },
    // 修改商品选中状态并且判断是否成功
    async changeCheckedById(cart, e) {
      let isChecked = e.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("shopcart/changeCheckedById", {
          skuId: cart.skuId,
          isChecked: isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除所有选中的产品
    async deleteAllCheckedCart() {
      try {
        // 派发清除所有选中商品的action
        await this.$store.dispatch("shopcart/deleteAllCheckedCart");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 全选商品
    async allCartChecked(e) {
      let isChecked = e.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("shopcart/allCartChecked", isChecked);
        // 成功再次更新购物车列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .empty {
        padding-top: 55px;
        text-align: center;
      }
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>