<template>
  <div>
    <ul class="card-wrapper">
      <product-item
        v-for="item in getCartItemList"
        :key="item.id"
        v-bind:item="item"
        v-bind:isAdded="true"
        v-on:onClick="handleProductClick(item.id)"
        v-on:onAddCart="handleAddCart(item)"
      >

      </product-item>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    handleProductClick(id) {
      this.$router.push(`/product/${id}`)
    },
    handleAddCart(item) {
      this.$store.commit({ type: 'changeCartItemList', payload: item })
      console.log(this.getCartItemList)
    },
  },
  computed: {
    ...mapGetters(['getCartItemList']),
  }

}
</script>

<style scoped>

</style>
