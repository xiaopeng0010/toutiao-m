<template>
  <div>
    <van-nav-bar class="page-nav-bar" title="登录" left-arrow @click-left="onClickLeft">
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="numble"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>

      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type="numble"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
          v-if="isCountDownShow"
          slot="button"
          :time="1000 * 60"
          format="ss s"
          @finish="isCountDownShow = false"/>
          <van-button v-else native-type="button"  class="send-sms-btn" round size="small" type="default" @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <div style="margin: 16px" class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>




<script>
import { login, sendSms } from '@/api/user.js';
export default {
  data() {
    return {
      user: {
        mobile: 13911111111,
        code: 246810,
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' },
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' },
        ],
      },
      isCountDownShow: false
    };
  },
  methods: {
    //表单验证
    async onSubmit(){
      // 1. 获取表单数据
      const user = this.user;
      // 开始转圈圈
      // 登录状态提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认 2000，0 表示持续展示不关闭
      })
      try {
        const { data } = await login(user)
        this.$store.commit('sendSms',data.data)
        this.$toast.success('登录成功')
        // 登录成功，跳转回原来页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    //验证码处理
    async onSendSms(){
      // console.log('onSendSms');
      // 1. 校验手机号
        try {
          await this.$refs.loginForm.validate('mobile')
        } catch (err) {
          return console.log('验证失败', err)
        }
    // 2. 验证通过，显示倒计时
        this.isCountDownShow = true
    // 3. 请求发送验证码
        try{
         const {data} = await sendSms(this.user.mobile)
          this.$toast('发送成功')
          console.log(data);
        } catch(err) {
          this.isCountDownShow = false
          if(err.response.status === 429){
            this.$toast('发送太频繁了，请稍后重试')
          }else{
            this.$toast('发送失败，请稍后重试')
          }
        }
      },
      onClickLeft(){
        this.$router.back('/my')
      }
  }
};
</script>




<style lang="less" scoped>
.iconfont {
  font-size: 37px;
}
.send-sms-btn {
  width: 158px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  font-size: 22px;
  color: #666;
}
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}
</style>