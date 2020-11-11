<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="scroll-warp">
    <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />
    <article-comment :source="comment.com_id" type="c" :list="comments"></article-comment>
    </div>
    <!-- 评论的回复列表 -->
    <div class="article-bottom">
      <van-button
        class="post-warp"
        size="small"
        @click="showPopup"
      >写评论
      </van-button>
    </div>
    <!-- /评论的回复列表 -->
    <!-- 发布评论 -->
    <van-popup v-model="show" position="bottom">
      <van-field
      v-model="message"
        class="post-field"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        show-word-limit
      />
        <van-button
          type="primary"
          size="small"
          @click="addComments"
        >发布</van-button>
    </van-popup>
    <!-- /发布评论 -->
    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentItem from './comment-item'
import ArticleComment from './article-comment'
import { addCommentsList } from '../../api/user'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    ArticleComment
  },
  props: {
    comment:{
      type:Object,
      required:true
    },
  },
  data () {
    return {
      comments:[],
      show:false,
      message:'',
      commentList:[]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showPopup(){
      this.show = true
    },
    async addComments(){
      const {data} = await addCommentsList({
        target:this.comment.com_id,
        content:this.message,
        art_id:this.comment.art_id
      })
      console.log(data);
      this.$toast.success('发布成功')
      // 关闭发布评论的弹层
      this.show = false
      // 将最新发布的评论展示到列表的顶部
      this.commentList.unshift(data.data.new_obj)
      // 更新文章评论的总数量
      // 清空文本框
      this.message = '' 
    }
  }
}
</script>

<style scoped lang="less">
.scroll-warp{
  position: fixed;
  top: 150px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.post-warp{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
