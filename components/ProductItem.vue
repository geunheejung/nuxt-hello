<template>
  <li @click="handleItemClick">
    <img class="product-image" :src="imgUrl" alt="" />
    <p>{{ name }}</p>
    <span>{{ price }}</span>
  </li>
</template>

<script>
import generateImgUrl from '@/utils/generateImgUrl.js'
export default {
  name: 'ProductView',
  props: {
    id: Number,
    imageUrl: String,
    name: String,
    price: String,
  },
  methods: {
    handleItemClick() {
      this.$emit('onClick')
    },
  },
  computed: {
    imgUrl() {
      return generateImgUrl(this.imageUrl, this.id)
    },
  },
}
</script>

<style scoped></style>
