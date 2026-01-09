import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface UserSlice {
    data?: {
        id: string
        username: string
        token: string
    },
    onBookmakrks: boolean
}

const initialState: UserSlice = {
    onBookmakrks: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        setData: (state, action: PayloadAction<UserSlice['data']>) => {
            state.data = action.payload
        },

        reset: (state) => {
            state.data = undefined
            state.onBookmakrks = false
        },

        showBookmarks: (state, action: PayloadAction<boolean>) => {
            state.onBookmakrks = action.payload
        }
    }
})

export const {
    setData,
    reset,
    showBookmarks
} = userSlice.actions

export const userReducer = userSlice.reducer