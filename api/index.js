import axios from 'axios'

export class Cart {
  constructor({ id, name, price, imageUrl, uuid }) {
    this.id = id
    this.name = name
    this.price = price
    this.imageUrl = imageUrl
    this.uuid = uuid
  }
}

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

export const getProduct = async (productId) => {
  const res = await instance.get('products', { params: { id: productId } })

  return res
}

export const getCartItemList = async () => {
  const res = await instance.get('carts')

  return res
}

export const setCartItemList = async (payload) => {
  const cart = new Cart(payload)
  try {
    if (!payload.uuid) {
      const res = await instance.post('carts', cart)

      return res
    }
    console.log('중복생성', payload)
    const res = await instance.put(`carts/${cart.uuid}`, cart)

    return res
  } catch (error) {
    console.log(error)
  }
}

export const deleteCartItemList = async (payload) => {
  const res = await instance.delete(`carts/${payload.uuid}`)

  return res
}
