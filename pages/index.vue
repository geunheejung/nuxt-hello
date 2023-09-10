<template>
  <div class="app">
    <main>
      <search-input
        v-bind:searchKeyword="searchKeyword"
        v-on:search="handleSearch"
        v-on:submit="handleSearchSubmit"
      />
      <ul class="card-wrapper">
        <product-item
          v-for="item in filteredProducts"
          :key="item.id"
          v-bind:item="item"
          v-bind:isAdded="getCartItemList.some(row => row.id === item.id)"
          v-on:onClick="handleProductClick(item.id)"
          v-on:onAddCart="handleAddCart(item)"
        >

        </product-item>
      </ul>
      <div class="cart-wrapper">
        <!--   장바구니 목록    -->
        <ul :class="{ 'cart-list': true, 'hide': !getCartItemList.length }">
          <li v-for="item in getCartItemList" v-bind:key="item.uuid">
            {{ item.name }}
            {{ item.price }}
          </li>
        </ul>
        <button class="btn" @click="handleGoToCart">장바구니 바로가기</button>

      </div>
    </main>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import axios from 'axios'
import ProductItem from '@/components/ProductItem.vue'
import SearchInput from '@/components/SearchInput.vue'

export default {
  async asyncData(context) {
    const { error, $replaceImgUrl, $store } = context

    try {
      const response = await axios.get('http://localhost:3000/products')

      // const cartItemRes = await $store.dispatch({ type: 'fetchCartItemList' });

      const { data } = response

      return {
        products: data.map((item) => ({
          ...item,
          imageUrl: $replaceImgUrl(item.imageUrl, item.id),
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
      cart: [],
      keyword: '',
      searchKeyword: '',
      isShowCartList: false,
    }
  },
  methods: {
    handleProductClick(id) {
      this.$router.push(`/product/${id}`)
    },
    handleSearch(searchKeyword) {
      this.searchKeyword = searchKeyword;
    },
    async handleSearchSubmit() {
      const res = await axios('http://localhost:3000/products', {
        params: { name: this.searchKeyword },
      });

      this.products = res.data;
    },
    async handleAddCart(item) {
      const cartItem = this.getCartItemList.find(row => row.id === item.id)
      if (cartItem) {
        await this.$store.dispatch({ type: 'fetchDeleteCartItemList', payload: cartItem });
      } else {
        await this.$store.dispatch({ type: 'fetchSetCartItemList', payload: item });
      }
      await this.$store.dispatch({ type: 'fetchCartItemList' });
    },
    handleGoToCart() {
      this.$router.push('/cart');
    },
  },
  computed: {
    ...mapGetters(['getCartItemList']),
    filteredProducts() {
      if (!this.searchKeyword) return this.products
      return this.products.filter(({ name = '' }) =>
        (name.toLowerCase()).includes(this.searchKeyword.toLowerCase())
      )
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

.app {
  position: relative;
}
.cart-wrapper {
  position: sticky;
  align-items: center;
  justify-content: flex-end;
  float: right;
  bottom: 50px;
  right: 50px;
}
.cart-wrapper .btn {
  width: 200px;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}

.cart-list {

  height: 200px;
  overflow-y: scroll;
  background: #fff;
  border: 1px solid #34495E;
  padding: 1rem;
}

.cart-list.hide {
  height: 0px;
  display: none;
}

.cart-list li {
  height: 40px;
  display: flex;
  align-items: center;
}

li {
  display: inherit;
  list-style-type: none;
}
</style>

