import { api } from "../api";
import { AuthorizationDto, SigninResponseDto } from "./user.dto";

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
            queryFn: () => {
                throw new Error()
            }
        }),

        removeBookmark: builder.mutation<void, string>({
            queryFn: () => {
                throw new Error()
            }
        })

    })

})

export const {
    useSignupMutation,
    useSigninMutation,

    useSaveBookmarkMutation,
    useRemoveBookmarkMutation
} = userApi