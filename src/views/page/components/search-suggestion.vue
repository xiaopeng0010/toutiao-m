<template>
  <div class="search-suggestion">
    <van-cell v-for="(value,index) in suggestion" :key="index" :title="value" icon="search" @click="$emit('search',value)"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '../../../api/user'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText:{
      type:String,
      required:true
    }
  },
  data () {
    return {
      suggestion:[]
    }
  },
  computed: {},
  watch: {
    searchText:{
       handler: debounce(async function(value){
        // try{
         const { data } = await getSearchSuggestion(this.searchText)
          // console.log(data);
          this.suggestion = data.data.options
        // }catch (err){
          // this.$toast('失败')
        // }
      },2000),
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>