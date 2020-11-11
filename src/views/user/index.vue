<template>
  <div class="user-container">
    <van-nav-bar
    class="nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像">
      <van-image
        class="avatar"
        fit="cover"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" value="内容"></van-cell>
    <van-cell title="性别" value="内容"></van-cell>
    <van-cell title="生日" value="内容"></van-cell>
  </div>
</template>

<script>
import { getUserById } from '../../api/user'
export default {
  name: 'UserPage',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserById()
  },
  mounted () {},
  methods: {
    loadUserById(){
      const {data} = this.getUserById()
      console.log(data);
    }
  }
}
</script>

<style scoped >
.nav-bar{
  background-color: #ccc;
}
.avatar{
  width: 60px;
  height: 60px;
}
</style>
