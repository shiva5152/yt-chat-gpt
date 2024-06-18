import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TVideo = {
    _id: string
    title: string
    videoId: string
}

export type UserState = {
    _id: string
    email: string
    userId: string
    tokenLeft: number
    videos: TVideo[];
    loading: boolean;
}

const initialState: UserState = {
    _id: '',
    email: '',
    userId: '',
    tokenLeft: 0,
    videos: [],
    loading: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state._id = action.payload._id
            state.email = action.payload.email
            state.userId = action.payload.userId
            state.tokenLeft = action.payload.tokenLeft
            state.videos = action.payload.videos
        },
        setTokenLeft: (state, action: PayloadAction<number>) => {
            state.tokenLeft = action.payload
        },

        addVideo: (state, action: PayloadAction<TVideo>) => {
            state.videos.push(action.payload)
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },


    },
})

export const { setTokenLeft, setUser, addVideo, setLoading } = userSlice.actions

export default userSlice.reducer