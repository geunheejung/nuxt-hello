<template>
  <div>
    <div class="container">
      <div class="main-panel">
        <img
          class="product-image"
          :src="product.imageUrl"
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

<script>
import { Context } from '@nuxt/types'
import { getProduct } from '@/api'

export default {
  async asyncData(context) {
    const {
      params: { index },
    } = context
    const { data } = await getProduct(index)

    const [product] = data
    return {
      product: {
        ...product,
        imageUrl: context.$replaceImgUrl(product.imageUrl, product.id),
      },
    }
  },
  head() {
    return {
      title: `Item Detail - ${this.product.name}`,
      meta: [
        {
          // hid 값과 매칭되는 메타 태그를 아래 내용으로 덮어씌운다.
          hid: 'description',
          name: 'description',
          content: `이 상품은 ${this.product.name} 입니다.`,
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: '상품 상세 페이지',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: '상품의 상세 정보를 확인해보세요',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'http://placeimg.com/640/480/fashion',
        },
      ],
    }
  },
  data() {
    return {
      // productItem: {},
    }
  },
  methods: {
    async addToCart() {
      this.addCartFlow()
    },
    async addCartFlow() {
      await this.$store.dispatch({
        type: 'fetchSetCartItemList',
        payload: this.product,
      })
      this.$router.push('/cart')
    },
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
