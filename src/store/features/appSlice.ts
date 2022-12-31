import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IAppState {
	setting: {
		fontSize: number
		darkMode: boolean
		dyslexic: boolean
		rtlLayout: boolean
		locale: ILocale
		isOpen: string
		showBar: boolean
	}
}

interface ILocale {
	label: string
	value: string
}

const initialApp: IAppState = {
	setting: {
		fontSize: 0,
		darkMode: false,
		dyslexic: false,
		rtlLayout: false,
		locale: {
			label: 'Español',
			value: 'es'
		},
		isOpen: 'dashboard',
		showBar: true
	}
}

/* Creating a slice of the Redux store. */
export const appSlice = createSlice({
	name: 'app',
	initialState: initialApp,
	reducers: {
		setOpen: (state: IAppState, action: PayloadAction<string>) => {
			state.setting.isOpen = action.payload
		},
		setShowBar: (state: IAppState, action: PayloadAction<boolean>) => {
			state.setting.showBar = action.payload
		},
		setLocale: (state: IAppState, action: PayloadAction<ILocale>) => {
			state.setting.locale = action.payload
		},
		setDarkMode: (state: IAppState, action: PayloadAction<boolean>) => {
			state.setting.darkMode = action.payload
		},
		setDyslexic: (state: IAppState, action: PayloadAction<boolean>) => {
			state.setting.dyslexic = action.payload
		},
		setFontSize: (state: IAppState, action: PayloadAction<number>) => {
			state.setting.fontSize = action.payload
		}
	}
})

// Action creators are generated for each case reducer function
export const {
	setOpen,
	setShowBar,
	setLocale,
	setDarkMode,
	setDyslexic,
	setFontSize
} = appSlice.actions

export default appSlice.reducer
