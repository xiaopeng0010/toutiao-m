<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false" >
      <van-button class="edit-btn" size="mini" type="danger" plain round @click="isEdit=!isEdit">{{isEdit ?'完成':'编辑'}}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
        <van-grid-item v-for="(value,index) in myChannels" :key="index" class="channel-item" :active="active" @click="onMyChannelClick(value,index)">
          <van-icon slot="icon" name="clear" v-show="isEdit"></van-icon>
          <span class="text" slot="text" :class="{active:active===index}">{{value.name}}</span>
        </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item v-for="value in recommendChannels" :key="value.id" :text="value.name" class="channel-item" @click="onAddChannel(value)"/>
    </van-grid>
  </div>
</template>


<script>
import { getAllchannels,editChannels,removeUserChannel } from '@/api/user'
import { mapState } from 'vuex'
import { setItem } from '../../../utils/storage'
export default {
  name: 'ChannelEdit',
  props:{
    myChannels:{
      type:Array,
      required:true
    },
    active:{
      type:Number,
      required:true
    }
  },
  components: {},
  data () {
    return {
      allChannel:[],
      isEdit:false // 控制编辑状态的显示
    }
  },
  computed: {
    recommendChannels (){
      return this.allChannel.filter(channel =>{
        return !this.myChannels.find(myChannel =>{
          return myChannel.id === channel.id
        })
      })  
    },
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadAllChannel()
  },
  mounted () {},
  methods: {
    async loadAllChannel(){
      try{
      const { data } = await getAllchannels()
      this.allChannel = data.data.channels
      // console.log(data);
      }catch (err){
        console.log('请求失败');
      }
    },
    async onAddChannel(value){
      this.myChannels.push(value)
      if(this.user){
        try{
        await editChannels({
          id:value.id,
          seq:this.myChannels.length
        })
        }catch (err){
          this.$toast('保存失败')
        }
      }else{
        setItem('TOUTIAO_CHANNELS',this.myChannels)
      }
    },
    // 删除操作
    onMyChannelClick(vaule,index){
      if(this.isEdit){
        this.myChannels.splice(index,1)
        if (index <= this.active) {
          // 让激活频道的索引 - 1
          this.$emit('update-active', this.active - 1, true)
        }
        this.deleteChannel(vaule)
      }else{
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel(vaule){
      try{
        if(this.user){
          await removeUserChannel(vaule.id)
        }else{
          setItem('TOUTIAO_CHANNELS',this.myChannels)
        }
      }catch (err) {
        this.$toast('请求失败')
      }
    }
  }
}
</script>



<style scoped lang="less">
.channel-edit{
  .channel-item{
    height: 86px;
    /deep/.van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
      .van-grid-item__icon-wrapper{
      position: unset;
      }
    }
  }
  /deep/.van-grid-item__text{
    font-size: 28px;
    margin-top: 0;
  }
  // /deep/.van-grid-item__icon{
  //   position: absolute;
  //   font-size: 36px;
  //   top: -5px;
  //   right: -5px;
  //   z-index: 2;
  //   color: #ccc;
  // }
  /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text, .text {
        color: #222;
        font-size: 28px;
      }
      .active {
        color: red;
      }
    }
    /deep/.van-grid-item__text{
      white-space: nowrap;
    }
    
  /deep/ .my-grid {
    .channel-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}

</style>