import { api } from "../api";
import { type RootState } from "../app/store";
import { AuthorizationDto, SigninResponseDto } from "./user.dto";
import { selectIsOnBookmarks } from "./user.selectors";

export const userApi = api.injectEndpoints({

    endpoints: builder => ({

        signup: builder.mutation<void, AuthorizationDto>({
            query: (auth) => ({
                url: "/signup",
                method: "POST",
                body: auth
            })
        }),

        signin: builder.mutation<SigninResponseDto, AuthorizationDto>({
            query: (auth) => ({
                url: "/signin",
                method: "POST",
                body: auth
            })
        }), 

        saveBookmark: builder.mutation<void, string>({
            query: (bookId) => ({
                url: `bookmarks/${bookId}`,
                method: "POST",
            }),
            onQueryStarted: async (id, { dispatch, queryFulfilled, getState }) => {
                try {
                    await queryFulfilled;
                    const onBookmarks = selectIsOnBookmarks(getState() as RootState);
    
                    if (!onBookmarks) {
                        dispatch(userApi.util.invalidateTags(['Search']));
                    }
                    dispatch(userApi.util.invalidateTags([{type: "Book", id}]))
                } catch {
                    // if the query fails, we don't want to invalidate anything
                }
            },
        }),

        removeBookmark: builder.mutation<void, string>({
            query: (bookId) => ({
                url: `bookmarks/${bookId}`,
                method: "DELETE",
            }),
            onQueryStarted: async (id, { dispatch, queryFulfilled, getState }) => {
                try {
                    await queryFulfilled;
                    const onBookmarks = selectIsOnBookmarks(getState() as RootState);
                    if (!onBookmarks) {
                        dispatch(userApi.util.invalidateTags(['Search']));
                    }
                    dispatch(userApi.util.invalidateTags([{type: "Book", id}]))
                } catch {
                    // if the query fails, we don't want to invalidate anything
                }
            },
        })

    })

})

export const {
    useSignupMutation,
    useSigninMutation,

    useSaveBookmarkMutation,
    useRemoveBookmarkMutation
} = userApi