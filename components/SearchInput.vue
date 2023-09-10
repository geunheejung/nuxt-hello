<template>
  <div>
    <input type="text" v-model.lazy="keyword" @input="handleChange" />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    handleChange(e: any) {
      debugger
    },
  },
}
</script>

<style></style>
