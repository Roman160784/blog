import { createSlice } from "@reduxjs/toolkit"

export type UsersType = {
    pagesCount:number
    page: number
    pageSize: number
    totalCount: number
    items: UserType[]
}

export type UserType = {
    id: string
    login: string
    email: string
    createdAt: string
}

const initialState: UsersType ={
    pagesCount: 0,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    items: []
}

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
   
    },
})

export const UsersReducer = slice.reducer