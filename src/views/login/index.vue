<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/logo.png" alt="">
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <span class="el-icon-mobile-phone" />
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="请输入账号"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <span class="el-icon-lock" />
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="text">
        <span class="svg-container">
          <span class="el-icon-key" />
        </span>
        <el-input
          v-model="loginForm.code"
          placeholder="请输入验证码"
          type="text"
        />
        <img class="imgcode" :src="imgUrl" @click="getNewCodeImg">
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
// 导入请求验证码的请求
import { imgCode } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin',
        code: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入账号' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        text: [{ required: true, trigger: 'blur', message: '请输入验证码' }]

      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      imgUrl: ''
    }
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
    this.getImgCode()
  },
  methods: {
    async getImgCode() {
      try {
        const { data } = await imgCode()
        // 验证码问题处理
        const blob = new Blob([data], { type: 'image/png' })
        const url = window.URL.createObjectURL(blob)
        this.imgUrl = url
      } catch (error) {
        alert('验证码获取失败')
      }
    },
    // 点击获取新的验证码
    getNewCodeImg() {
      this.getImgCode()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      console.log(1)
      // await this.$refs.loginForm.validate()
      console.log(this.loginForm)
      await this.$store.dispatch('user/login', this.loginForm)
    //  登录的操作 点击登录 需要发送请求 然后 校验得通过 验证码 还得一样 然后才可以登录进去
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#9b9aa6;
$cursor: black;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/background.png'); // 设置背景图片 设置背景图片不生效加波浪线就行
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
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #ededed;
    background: transparent;
    border-radius: 5px;
    color: #454545;
  }
  .loginBtn {
    background: #6578ed;
    height: 52px;
    line-height: 32px;
    font-size: 14px;
    width:100%;
    margin-bottom:30px;
    border: none;
    color:#fff;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 518px;
    height: 388px;
    background-color: #ffffff;
    max-width: 100%;
    padding: 40px 35px 0;
    margin: 160px auto;
    // overflow: hidden;
    border-radius: 10px;
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

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      img{
        width: 96px;
        height: 96px;
        position: absolute;
        top: -130px;
        left: 50%;
        margin-left: -48px;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.imgcode {
  position: absolute;
  left: 315px;
  top: 0;
}
</style>
