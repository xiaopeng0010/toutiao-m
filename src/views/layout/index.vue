<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->
    <!-- 标签导航栏 -->


    <van-tabbar  class="layout-tabbar">
      <van-tabbar-item icon="home-o" to="/home">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="">{{$store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>




<script>
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>




<style lang="less" scoped>
.layout-container{
  .layout-tabbar{
    .iconfont{
      font-size: 40px;
    }
    .text{
       font-size: 20px;
    }
  }
}
</style>