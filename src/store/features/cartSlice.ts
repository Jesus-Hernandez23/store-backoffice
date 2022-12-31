/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface ICartState {
	cart: []
	favorites: []
}

const initialFavorites: ICartState = {
	cart: [],
	favorites: []
}

/* Creating a slice of the Redux store. */
export const shopSlice = createSlice({
	name: 'cart',
	initialState: initialFavorites,
	reducers: {
		addItem: (state: ICartState, action: PayloadAction<[]>) => {
			state.cart = [action.payload, ...state.cart]
		},
		editItem: (state: ICartState, action: PayloadAction<[]>) => {
			const { id, quantity } = action.payload
			state.cart = state.cart.map(value => {
				if (value.id === id) value.quantity = quantity
				return value
			})
		},
		removeItem: (state: ICartState, action: PayloadAction<[]>) => {
			const { id } = action.payload
			state.cart = state.cart.filter(value => value.id !== id)
		},
		nukeCart: state => {
			state.cart = []
		},
		addFav: (state: ICartState, action: PayloadAction<string>) => {
			state.favorites = [action.payload, ...state.favorites]
		},
		removeFav: (state: ICartState, action: PayloadAction<string>) => {
			const { id } = action.payload
			state.favorites = state.favorites.filter(value => value.id !== id)
		},
		nukeFavs: state => {
			state.favorites = []
		}
	}
})

// Action creators are generated for each case reducer function
export const { addFav, editFav, removeFav, nukeFavs } = shopSlice.actions
export const { addItem, editItem, removeItem, nukeCart } = shopSlice.actions

export default shopSlice.reducer
