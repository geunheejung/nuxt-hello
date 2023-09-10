<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="$replaceImgUrl(product.imageUrl, product.id)"
          :alt="product.name"
        />
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
        <button type="button" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Context } from '@nuxt/types'

export default {
  async asyncData(context: Context) {
    const {
      params: { index },
    } = context
    const { data } = await axios.get(`http://localhost:3000/products/${index}`)

    return { product: data }
  },
  data() {
    return {
      // productItem: {},
    }
  },
  methods: {
    addToCart() {},
  },
  computed: {},
  created() {},
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.product-image {
  width: 500px;
  height: 375px;
}
.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>
