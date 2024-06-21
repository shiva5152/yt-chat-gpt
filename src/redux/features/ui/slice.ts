import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UIState = {
    isAddVideoPopup: boolean,
    isSidebarVisible: boolean,
    currentVideoId: string,
}

const initialState: UIState = {
    isAddVideoPopup: false,
    isSidebarVisible: true,
    currentVideoId: "",

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
        },

        setCurrentVideoId: (state, action: PayloadAction<string>) => {
            state.currentVideoId = action.payload
        }
    },
})

export const { setIsAddVideoPopup, setCurrentVideoId, setIsSidebarVisible } = uiSlice.actions

export default uiSlice.reducer