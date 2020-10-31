<template>
  <div class="my-container">
          <!-- 登录页面 -->
    <div class="hearde-btn" v-if="user">
      <!-- 上部区域 -->
      <div class="baes-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{userInfo.intro}}</span>
        </div>
        <div class="rigth">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <!-- 下部区域 -->
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header" v-else>
      <!-- 没有登录页面 -->
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile-img" >
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 收藏历史区域 -->
    <van-grid column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-info">
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-info">
        <i slot="icon" class="iconfont iconlishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 退出登录 -->
    <van-cell title="消息通知" is-link url=""></van-cell>
    <van-cell title="小智同学" is-link url=""></van-cell>
    <van-button @click="quitDataList" block v-if="user">退出登录</van-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/user'
export default {
  name: 'HomePage',
  components: {},
  props: {},
  data () {
    return {
      userInfo:''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if(this.user){
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    //退出登录
    quitDataList(){
      this.$dialog.confirm({
      title: '退出提示',
      message: '确定退出嘛',
    })
      .then(() => {
        this.$store.commit('sendSms',null)
      })
      .catch(() => {
        console.log('取消退出');
      });
    },
    async loadUserInfo(){
      try{
        const {data} = await getUserInfo()
        console.log(data);
        this.userInfo = data.data
      }catch (err){
        console.log('获取数据失败',err);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container{
  .header{
    height: 361px;
    background: url('../../assets/banner.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hearde-btn{
    height: 361px;
    background: url('../../assets/banner.png');
    .baes-info{
      height: 231px;
      padding: 76px 32px 23px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      .left{
        display: flex;
        align-items: center;
        .avatar{
          width: 132px;
          height: 132px;
          margin-right: 23px;
        }
        .name{
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats{
      height: 130px;
      display: flex;
      .data-item{
        flex: 1;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count{
          font-size: 36px;
        }
        .text{
          font-size: 23px;
        }
      }
    }
  }
  .login-btn{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile-img{
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text{
      font-size: 28px;
      color: #fff;
    }
  }
  .grid-nav{
    .grid-info{
      height: 141px;
      .iconfont{
        font-size: 45px;
      }
      .text{
        font-size: 28px;
      }
    }
  }
}
</style>