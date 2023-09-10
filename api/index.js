import axios from 'axios'

export class Cart {
  constructor({ id, name, price, imageUrl }) {
    this.id = id
    this.name = name
    this.price = price
    this.imageUrl = imageUrl
  }
}

export const getCartItemList = async () => {
  const res = axios.get('http://localhost:3000/carts')

  return res
}

export const setCartItemList = async (payload) => {
  const cart = new Cart(payload)
  const res = axios.post('http://localhost:3000/carts', cart)

  return res
}

export const deleteCartItemList = async (payload) => {
  const res = axios.delete(`http://localhost:3000/carts/${payload.uuid}`)

  return res
}
