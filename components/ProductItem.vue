<template>
  <li>
    <img class="product-image" :src="item.imageUrl" alt="" @click="handleItemClick" />
    <p>{{ item.name }}</p>
    <span>{{ item.price }}</span>
    <button @click="handleAddCart">
      <template v-if="isAdded">
        REMOVE CART (-)
      </template>
      <template v-else>
        ADD CART (+)
      </template>
    </button>
  </li>
</template>

<script>
export default {
  name: 'ProductView',
  props: ['item', 'isAdded'],
  data() {
    return {
      isAddedCart: false,
    }
  },
  methods: {
    handleItemClick() {
      this.$emit('onClick')
    },
    handleAddCart() {
      this.$emit('onAddCart', this.item);
    }
  },
}
</script>

<style scoped>
.product-image {
  width: 100%;
}
</style>
