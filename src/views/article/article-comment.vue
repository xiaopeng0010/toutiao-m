<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- :comment="item" -->
      <comment-item v-for="(item,index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click',$event)">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="list.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ list.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{list.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{list.pubdata | relativeTime }}</span>
            <van-button size="mini" type="default">回复{{ list.reply_count }}</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </comment-item>
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getListComments } from '../../api/user'
import CommentItem from '../article/comment-item'

  export default {
    name: 'ArticleComment',
    components:{
      CommentItem
    },
    props: {
      source:{
        type:[Number,String,Object],
        required:true
      },
      list:{
        type:Array,
        default:() =>{}
      },
      type:{
        type:String,
        default:'a'
      }
    },
    data() {
      return {
        // list: [], // 评论列表
        loading: false, // 上拉加载更多的 loading
        finished: false, // 是否加载结束
        offset:null,
      };
    },
    methods: {
      async onLoad() {
        try{
        const { data } = await getListComments({
            type:this.type,
            source:this.source.toString(),
            offset:this.offset,
            limit:10
          })
          console.log(data);
          const { results } = data.data
          this.list.push(...results)
          this.loading = false
          if(results.length){
            this.offset = data.data.last_id
          }else{
            this.finished = true
          }
        }catch (err){}
      },
    }
  };
</script>

<style scoped lang="less">
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>