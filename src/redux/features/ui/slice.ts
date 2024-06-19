import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UIState = {
    isAddVideoPopup: boolean,
    isSidebarVisible: boolean,
}

const initialState: UIState = {
    isAddVideoPopup: false,
    isSidebarVisible: true,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsAddVideoPopup: (state, action: PayloadAction<boolean>) => {
            state.isAddVideoPopup = action.payload
        },
        setIsSidebarVisible: (state, action: PayloadAction<boolean>) => {
            state.isSidebarVisible = action.payload
        }
    },
})

export const { setIsAddVideoPopup, setIsSidebarVisible } = uiSlice.actions

export default uiSlice.reducer