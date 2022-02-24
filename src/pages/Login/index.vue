<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form>
              <div class="input-text clearFix">
                <span><i class="el-icon-user"></i></span>
                <input
                  placeholder="请输入你的邮箱/用户名/手机号"
                  v-model="phone"
                  name="phone"
                  v-validate="{
                    required: true,
                    regex: /^\d{11}$/,
                  }"
                  :class="{ invalid: errors.has('phone') }"
                />
              </div>
              <span class="error-msg">{{ errors.first("phone") }}</span>
              <div class="input-text clearFix">
                <span class="pwd"><i class="el-icon-lock"></i></span>
                <input
                  placeholder="请输入您的密码"
                  v-model="password"
                  name="password"
                  v-validate="{ required: true, regex: /^[a-zA-Z]\w{6,20}$/ }"
                  :class="{ invalid: errors.has('password') }"
                />
              </div>
              <span class="error-msg">{{ errors.first("password") }}</span>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="" />
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent="userLogin">
                登&nbsp;&nbsp;录
              </button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt="" /></li>
                <li><img src="./images/sina.png" alt="" /></li>
                <li><img src="./images/ali.png" alt="" /></li>
                <li><img src="./images/weixin.png" alt="" /></li>
              </ul>
              <router-link class="register" to="/register"
                >立即注册</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <CopyRight />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    // 用户登录 登陆成功跳转到主页 主页携带token向服务器请求用户信息
    async userLogin() {
      let { phone, password } = this;
      const success = await this.$validator.validateAll();
      if (success) {
        try {
          await this.$store.dispatch("user/userLogin", { phone, password });
          // 若用户在登录前对需登录才能访问的页面进行访问，登录后将继续跳转到用户之前的行为
          let toPath = this.$route.query.redirect || "/home";
          this.$router.push(toPath);
        } catch (error) {
          alert(error.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #fcdeac;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      background: url(./images/loginbg.jpg) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      border-radius: 4px;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #f8bc4e;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;
        .error-msg {
          display: block;
          width: 302px;
          height: 15px;
          margin-bottom: 10px;
          color: red;
        }
        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            padding-bottom: 10px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              text-align: center;
              line-height: 32px;
              border: 1px solid #ccc;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
              .el-icon-user,
              .el-icon-lock {
                font-size: 18px;
                color: #ccccce;
              }
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #f8bc4e;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1741b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }
    }
  }

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
}
</style>