import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiDomain } from "../../utils/ApiDomain";

export type TUser = {
    userId: number
    name: string
    email: string
    password: string
    role: string
}
export const usersAPI = createApi({ 
    reducerPath: 'usersAPI', 
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        createUsers: builder.mutation<{ message: string }, Partial<TUser>>({
            query: (newUser) => ({
                url: '/users/register',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Users'] 
        }),
        verifyUser: builder.mutation<{ message: string }, { email: string, code: string }>({
            query: (data) => ({
                url: '/users/verify',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users']
        })


    })
})