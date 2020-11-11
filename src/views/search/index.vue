<template>
  <div class="search-container">
    <form action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" background="#3296fa" @search="onSearch" @cancel="onCancel" @focus="isResultShow=false"></van-search>
      <!-- /搜索栏 -->
      <!-- 历史记录 -->
      <search-result v-if="isResultShow" :search-text="searchText" />
      <!-- /历史记录 -->

      <!-- 联想建议 -->
      <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />
      <!-- /联想建议 -->

      <!-- 搜索历史记录 -->
      <search-history v-else />
      <!-- /搜索历史记录 -->
    </form>
  </div>
</template>

<script>
import SearchHistory from '../page/components/search-history'
import SearchSuggestion from '../page/components/search-suggestion'
import SearchResult from '../page/components/search-result'
  export default {
    components: {
      SearchHistory,
      SearchSuggestion,
      SearchResult
    },
    props: {},
    data() {
      return {
        searchText: '',
        isResultShow : false
      };
    },
    computed: {},
    watch: {},
    created() {},
    methods: {
      onSearch (val) {
      console.log(val)
      this.searchText = val
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
  };
</script>

<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>