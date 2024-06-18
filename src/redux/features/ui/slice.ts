import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UIState = {
    isAddVideoPopup: boolean
}

const initialState: UIState = {
    isAddVideoPopup: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsAddVideoPopup: (state, action: PayloadAction<boolean>) => {
            state.isAddVideoPopup = action.payload
        }
    },
})

export const { setIsAddVideoPopup } = uiSlice.actions

export default uiSlice.reducer