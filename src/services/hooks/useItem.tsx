import React from 'react'

//redux
import { addFav, addItem, editItem, removeItem, removeFav } from '@/redux/features/cartSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook'

const selectById = (state, id) => state.shopping.cart.find((value) => value.id === id)
const someById = (state, id) => state.shopping.favorites.some((value) => value.id === id)

const useItem = ({ id, name, image, price }) => {
  //redux
  const dispatch = useAppDispatch()
  const cart = useAppSelector((state) => selectById(state, id))
  const isFavorite = useAppSelector((state) => someById(state, id))

  //callback
  const handleAdd = () => {
    dispatch(addItem({ id, name, price, quantity: 1, image }))
  }

  const handleEdit = (e) => {
    const {
      target: { value: quantity },
    } = e
    dispatch(editItem({ id, quantity }))
  }

  const handleRemove = () => {
    dispatch(removeItem({ id }))
  }

  const handleFav = () => {
    if (isFavorite) {
      dispatch(removeFav({ id }))
    } else {
      dispatch(addFav({ id, name, price, image }))
    }
  }

  return {
    cart,
    isFavorite,
    actions: {
      handleAdd,
      handleEdit,
      handleRemove,
      handleFav,
    },
  }
}

export default useItem
