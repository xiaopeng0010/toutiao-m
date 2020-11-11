<template>
  <div class="home-container">
    <!-- 导航栏区域 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search" to="/search">
        搜索
      </van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs van-tabs__wrap" border type="line">
      <van-tab v-for="item in channels" :key="item.id" :title=item.name>
        <!-- 文章列表 -->
        <article-list :item = 'item'></article-list>
      </van-tab>
      <div slot="nav-right" class="placegolder"></div>
      <div slot="nav-right" class="hanmburger-btn" @click="isEditChannelShow = true">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出框 -->
    <van-popup class="edit-channel-popup" v-model="isEditChannelShow" closeable close-icon-position="top-left" position="bottom" :style="{ height: '100%' }">
    <channel-edit :active="active" :myChannels="channels" @update-active="onUpdateActive"/>
    </van-popup>
  </div>
</template>

<script>
import { getDataInfo } from '../../api/user'
import { getItem } from '../../utils/storage'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
export default {
  name: 'HomePage',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active:0,
      channels:[],
      isEditChannelShow: false// 控制编辑频道弹出层的显示状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels(){
      try{
        // const { data } = await getDataInfo()
        // this.channels = data.data.channels
        let channels = []
        // 如果登录了 直接掉接口请求数据
        if(this.user){
          const { data } = await getDataInfo()
          console.log(data);
          channels = data.data.channels
        }else{
          // 如果没有登录 从本地存储中拿数据
          const loadChannels = getItem('TOUTIAO_CHANNELS')
          if(loadChannels){
            channels = loadChannels
          }else{
            // 如果本地没有数据请求接口
            const { data } = await getDataInfo()
            channels = data.data.channels
          }
        }
        this.channels = channels
      }catch (err){
        this.$toast('获取频道数据失败')
      }
    },
    // showPopup(){
    //   this.isEditChannelShow = false;
    // },
    onUpdateActive (index, isEditChannelShow = false) {
      // 更新激活的频道项
      this.active = index

      // 关闭编辑频道弹层
      this.isEditChannelShow = isEditChannelShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  padding-bottom: 100px;
  padding-top: 174px;
  .van-icon{
    color: #fff;
    font-size: 32px;
  }
  /deep/.van-nav-bar__title{
    max-width: unset ;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    font-size: 28px;
  }
  /deep/.channel-tabs{
    .van-tabs__wrap{
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 82px;
    }
    .van-tab{
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active{
      color: #333;
    }
    .van-tabs__line{
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 32px;
    }
    .placegolder{
      width: 66px;
      height: 100%;
      flex-shrink: 0;
    }
    .hanmburger-btn{
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      .iconfont{
      font-size: 33px;
      }
      &:before{
        content: '';
        width: 2px;
        position: absolute;
        left: 0;
        height: 100%;
        background-image: url('../../assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
  .edit-channel-popup {
    padding-top: 100px;
    box-sizing: border-box;
  }
  
}
</style>