<template>
  <div class="app">
    <main>
      <search-input />
      <ul class="card-wrapper">
        <product-item
          v-for="item in products"
          :key="item.id"
          class=""
          v-bind:price="item.price"
          v-bind:id="item.id"
          v-bind:name="item.name"
          v-bind:image-url="item.imageUrl"
          v-on:onClick="handleProductClick(item.id)"
        >
          <img class="product-image" :src="item.imageUrl" alt="" />
          <p>{{ item.name }}</p>
          <span>{{ item.price }}</span>
        </product-item>
      </ul>
      <div class="cart-wrapper">
        <button class="btn">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import ProductItem from '@/components/ProductItem.vue'
import SearchInput from '@/components/SearchInput.vue'
import generateImgUrl from '@/utils/generateImgUrl.js'

export default {
  async asyncData({ error }) {
    try {
      const response = await axios.get('http://localhost:3000/products')

      const { data } = response

      debugger
      return {
        products: data.map((item) => ({
          ...item,
          imageUrl: generateImgUrl(item.imageUrl, item.id),
        })),
      }
    } catch (e) {
      console.log(e)
      error({
        statusCode: 503,
        message: '상품 정보 불러오는 데 문제가 있습니다.',
      })
    }
  },
  components: {
    ProductItem,
    SearchInput,
  },
  data() {
    return {
      products: [],
    }
  },
  methods: {
    handleProductClick(id) {
      this.$router.push(`/product/${id}`)
    },
  },
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
ul {
  padding: 0;
}
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, auto));
  gap: 0.5rem;
}

.card-wrapper li {
  cursor: pointer;
}
.flex {
  display: flex;
  justify-content: center;
}
.item {
  display: inline-block;
  width: 400px;
  height: 300px;
  text-align: center;
  margin: 0 0.5rem;
  cursor: pointer;
}
.product-image {
  width: 400px;
  height: 250px;
}
.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
