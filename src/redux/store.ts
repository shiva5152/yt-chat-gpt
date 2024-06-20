import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/ui/slice'
import userReducer from './features/user/slice'
import { chatApi } from './features/chatlog/chatApi'

export const makeStore = () => {
    return configureStore({
        reducer: {
            ui: uiReducer,
            user: userReducer,
            [chatApi.reducerPath]: chatApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(chatApi.middleware),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']