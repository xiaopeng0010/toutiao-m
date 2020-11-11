<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '../../../api/user'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText:{
      type:String,
      required:true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page:1,
      per_page:20
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
  async onLoad () {
      const { data } = await getSearchResult({
        page:this.page,
        per_page:this.per_page,
        q:this.searchText
      })
      // console.log(data);
      const { results } = data.data
      this.list.push(...results)
    }
  }
}
</script>

<style scoped lang="less"></style>