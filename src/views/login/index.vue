<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <p class="title">
          <svg-icon icon-class="FEIcon" class="logo" />
          FLEET EDGE
        </p>
        <lang-select class="set-language" />
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.account"
          :placeholder="$t('login.username')"
          name="account"
          type="text"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <div class="captchaBox">
        <el-form-item prop="captcha">
          <el-input v-model="loginForm.captcha" :placeholder="$t('login.captcha')" @keyup.enter.native="handleLogin" />
        </el-form-item>
        <div style="height: 47px; margin-top: 1px;" @click="refreshCaptcha">
          <img :class="{ captchaImg: !!loginCaptcha.image , captchaDefaultImg: !loginCaptcha.image }" :src="loginCaptcha.image || invalidPic">
        </div>
      </div>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px; padding: 12px 20px;"
        @click.native.prevent="handleLogin"
      >
        {{ $t('login.logIn') }}
      </el-button>
    </el-form>
    <div class="footer">
      <p class="copyright">©2020 DINGLI CORP. , LTD</p>
    </div>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'
import { SetLocalStorageDict } from '@/utils/dictCache.js'
import { cacheDict } from '@/api/admin/dict'
import { mapState, mapActions } from 'vuex'
// 暂时把缓存字典放在首页
export default {
  name: 'Login',
  components: { LangSelect },
  data() {
    const validateUsername = (rule, value, callback) => {
      callback()
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      invalidPic: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk3Mjk2NjE4MjIzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyNDY0IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGNTZDNkMiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMiAyMkMyNDEuMzggMjIgMjIgMjQxLjM4IDIyIDUxMnMyMTkuMzggNDkwIDQ5MCA0OTAgNDkwLTIxOS4zOCA0OTAtNDkwUzc4Mi42MiAyMiA1MTIgMjJ6IG0yNjMuMzMgMzEyLjc0bC0yMy4xMSAxMjQuMi00LjAyIDIxLjYxYy0xLjgxIDkuNzEtMTEuMTQgMTYuMTItMjAuODUgMTQuMzFsLTIwLjU0LTMuODItMTI1LjQxLTIzLjMzYy05LjcxLTEuODEtMTYuMTItMTEuMTQtMTQuMzEtMjAuODZsNC4wMi0yMS42MWMxLjgxLTkuNzEgMTEuMTQtMTYuMTIgMjAuODUtMTQuMzFsNjEuOTMgMTEuNTJjLTQ2LjA1LTgwLjA2LTE0Ni45NC0xMTIuNzctMjMxLjkyLTcyLjctODkuNDYgNDIuMTgtMTI3LjkyIDE0OS4yOC04NS43NCAyMzguNzQgNDIuMTggODkuNDYgMTQ5LjI4IDEyNy45MiAyMzguNzQgODUuNzQgMTcuNjctOC4zMyAzOC43Ni0wLjc2IDQ3LjA5IDE2LjkxIDguMzMgMTcuNjcgMC43NiAzOC43NS0xNi45MSA0Ny4wOS00OS4yMiAyMy4yMS0xMDIuMjggMjguOTEtMTUyLjA5IDE5LjY0LTc2LjQyLTE0LjIyLTE0NS4yMS02My42OC0xODAuODItMTM5LjItNTguODItMTI0Ljc1LTUuMTktMjc0LjA5IDExOS41Ni0zMzIuOTIgMTE1LjE5LTU0LjMyIDI1MS4zNS0xMi43NCAzMTcuODUgOTIuMTZsOS45Ni01My41NWMxLjgxLTkuNzEgMTEuMTQtMTYuMTIgMjAuODUtMTQuMzFsMjAuNTQgMy44MmM5LjczIDEuODIgMTYuMTMgMTEuMTYgMTQuMzMgMjAuODd6IiBwLWlkPSIxMjQ2NSI+PC9wYXRoPjwvc3ZnPg==',
      loginForm: {
        account: '',
        password: '',
        captcha: ''
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        captcha: [
          {
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!/([^\s])/.test(value)) {
                callback(new Error(this.$t('login.tips.requiredCaptcha')))
              } else {
                callback()
              }
            }
          }
        ]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  computed: {
    ...mapState({
      loginCaptcha: state => state.user.loginCaptcha
    })
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    // 获取登录验证码
    this.getLoginCaptcha()
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    ...mapActions({
      getLoginCaptcha: 'getLoginCaptcha'
    }),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = Object.assign({}, { captchaKey: this.loginCaptcha.key }, this.loginForm)
          this.$store.dispatch('Login', params).then(() => {
            this.cacheDictAsync()
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
            this.refreshCaptcha()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async cacheDictAsync() {
      cacheDict().then(res => {
        SetLocalStorageDict(res.data.data)
      })
    },
    /**
    * 刷新验证码
    */
    refreshCaptcha() {
      this.getLoginCaptcha()
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg: #283443;
  $light_gray: #eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: absolute;
      width: 520px;
      max-width: 100%;
      padding: 0 35px;
      left: 50%;
      top: 170px;
      transform: translate(-50%, 0);

      .captchaBox {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: auto 137px;

        .captchaImg {
          height: 47px;
          width: 127px;
          border-radius: 5px;
          float: right;
        }
        .captchaDefaultImg {
          height: 39px;
          border-radius: 5px;
          margin: 4px 20px;
        }
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .logo {
        margin-right:6px;height: 28px;width: 28px;
      }

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-family: Arial,serif;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 11px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    .footer .copyright {
      color: $light_gray;
      text-align: center;
      font-size: 14px;
      letter-spacing: 2px;
    }
  }
</style>
