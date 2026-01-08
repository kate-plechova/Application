import type { RootState } from "../app/store";

export const selectUserData = (state: RootState) => state.user.data

export const selectIsOnBookmarks = (state: RootState) => state.user.onBookmakrks