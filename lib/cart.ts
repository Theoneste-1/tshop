import type { Product } from "./products"

export interface CartItem extends Product {
  quantity: number
}

export const addToCart = (product: Product): CartItem[] => {
  const existingCart = getCart()
  const existingItem = existingCart.find((item) => item.id === product.id)

  let updatedCart: CartItem[]

  if (existingItem) {
    updatedCart = existingCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
  } else {
    updatedCart = [...existingCart, { ...product, quantity: 1 }]
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart))
  return updatedCart
}

export const getCart = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

export const getCartItemsCount = (): number => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.quantity, 0)
}

export const removeFromCart = (productId: number): CartItem[] => {
  const existingCart = getCart()
  const updatedCart = existingCart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  return updatedCart
}

export const updateCartItemQuantity = (productId: number, quantity: number): CartItem[] => {
  const existingCart = getCart()
  const updatedCart = existingCart.map((item) => (item.id === productId ? { ...item, quantity } : item))
  localStorage.setItem("cart", JSON.stringify(updatedCart))
  return updatedCart
}

export const clearCart = (): void => {
  localStorage.removeItem("cart")
}
