import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './features/ui/slice'
import userReducer from './features/user/slice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            ui: uiReducer,
            user: userReducer,
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']