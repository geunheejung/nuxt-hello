<template>
  <div>
    <!-- <input type="text" v-model.lazy="keyword" @input="handleChange" /> -->
    <input
      type="text"
      :value="searchKeyword"
      @input="$emit('search', $event.target.value)"
    />
    <button @click="handleSearch">search</button>
  </div>
</template>

<script>
export default {
  props: {
    searchKeyword: String,
  },
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    handleSearch() {
      this.$emit('submit')
    },
    // handleChange(payload: Event) {
    //   const { data } = payload as InputEvent
    //   this.$emit('search', data)
    //   // 검색 api를 요청하거나 또는 키워드에 따라 상위에서 필터링 해야 함.
    // },
  },
}
</script>

<style></style>
