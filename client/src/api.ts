import { createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: import.meta.env.VITE_API_URL,
    endpoints: () => ({})
})