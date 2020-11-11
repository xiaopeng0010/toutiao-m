<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" success-duration="1000">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
    <article-item v-for="(k,i) in list" :key="i" :article="k">
    </article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>



<script>
import { getDataInfoList } from '../../../api/user'
import ArticleItem from '../../../components/aritcle-item/index'
export default {
  props:{
    item:{
      type:Object,
      required:true
    }
  },
  components:{
    ArticleItem
  },
  data(){
    return{
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false, // 是否加载失败
      isLoading: false
    }
  },
  created(){},
  methods:{
    async onLoad() {
      try{
        const { data } = await getDataInfoList({
          channel_id:this.item.id,
          timestamp:this.timestamp || Date.now(),
          with_top:1
        })
        // console.log(data);
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if(results.length){
          this.timestamp = data.data.pre_timestamp
        }else{
          this.finished= true
        }
      } catch (err){
        // console.log('请求失败',err);
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },
    async onRefresh(){
      try{
        const { data } = await getDataInfoList({
          channel_id:this.item.id,
          timestamp: Date.now(),
          with_top:1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false;
      }catch (err){
        this.isRefreshLoading = false // 关闭下拉刷新的 loading 状态
        this.$toast('刷新失败')
      }
    }
  },
}
</script>



<style lang="less" scoped>

</style>