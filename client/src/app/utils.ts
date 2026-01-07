import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../user/user.slice";
import { api } from "../api";
import type { RootState } from "./store";

export const getStore = (init: Omit<RootState, "api">) => configureStore({
    reducer: {
        user: userReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(api.middleware),
    preloadedState: init
})