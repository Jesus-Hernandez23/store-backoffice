/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IChatState {
	rooms: []
	currentRoom: string
	messages: Record<string, unknown>
}

interface IRoom {
	room: string
	message: string
}

const initialChat: IChatState = {
	rooms: [],
	currentRoom: '',
	messages: {}
}

/* Creating a slice of the Redux store. */
export const socketSlice = createSlice({
	name: 'chat',
	initialState: initialChat,
	reducers: {
		addRooms: (state: IChatState, action: PayloadAction<[]>) => {
			state.rooms = action.payload
		},
		setRoom: (state: IChatState, action: PayloadAction<string>) => {
			state.currentRoom = action.payload
		},
		addMessage: (state: IChatState, action: PayloadAction<IRoom>) => {
			const { room, message } = action.payload
			state.messages[room] = state.messages[room]
				? [...state.messages[room], message]
				: [message]
		},
		nukeMessage: state => {
			state.messages = {}
		}
	}
})

// Action creators are generated for each case reducer function
export const { addRooms, setRoom, addMessage, nukeMessage } =
	socketSlice.actions

export default socketSlice.reducer
