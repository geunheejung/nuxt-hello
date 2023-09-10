import { getCartItemList, setCartItemList, deleteCartItemList } from '@/api'

export const state = () => ({
  cartItemList: [],
})

export const getters = {
  getCartItemList(state) {
    return state.cartItemList
  },
}

export const mutations = {
  setChartItemList(state, chartItemList) {
    state.cartItemList = chartItemList
  },
  changeCartItemList(state, { payload: item }) {
    const addedItemIndex = state.cartItemList.findIndex(
      (row) => row.id === item.id
    )

    if (addedItemIndex !== -1) {
      state.cartItemList.splice(addedItemIndex, 1)
      return
    }

    state.cartItemList.push(item)
  },
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    const cartItemListRes = await dispatch('fetchCartItemList')
  },
  async fetchCartItemList(context) {
    const { data } = await getCartItemList()

    context.commit('setChartItemList', data)
  },
  async fetchSetCartItemList(context, { payload }) {
    const {
      state: { cartItemList },
    } = context
    const { id } = payload
    const cartItem = cartItemList.find((row) => row.id === id) || payload
    const { data } = await setCartItemList(cartItem)
  },
  async fetchDeleteCartItemList(context, { payload }) {
    const { data } = await deleteCartItemList(payload)
  },
}
