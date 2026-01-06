import type { RootState } from "../app/store";

export const selectUserData = (state: RootState) => state.user.data