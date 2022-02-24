<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>橙心爱购欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-if="userInfo.name">
            <a href="#">{{ userInfo.name }}</a>
            <a href="#" class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的橙心爱购</a>
          <a href="###">橙心爱购会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注橙心爱购</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="橙心爱购" target="_self" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            ref="search"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    goSearch() {
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
      }
    },
    // 退出登录
    async logout() {
      try {
        await this.$store.dispatch("user/logout");
        // 退出成功重新进入home
        this.$router.push({ name: "home" });
      } catch (error) {
        alert(error.message);
      }
    },
  },
  mounted() {
    // 注册清除事件clear
    this.$bus.$on("clear", () => {
      this.keyword = "";
    });
    // 优化体验 按s键直接进入搜索输入框
    this.$nextTick(() => {
      document.addEventListener("keyup", (e) => {
        if (e.keyCode == 83) {
          this.$refs.search.focus();
        }
      });
      // enter直接搜索
      document.addEventListener("keyup", (e) => {
        if (e.code == "Enter") {
          this.goSearch();
        }
      });
    });
  },
  computed: {
    // 计算出获取到的用户信息
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  a:hover {
    color: #ea4a36;
  }
  & > .top {
    background-color: #f1f1f1;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>