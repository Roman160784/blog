import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { usersAPI } from "../api/bloggerPlatformAPI"

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

export const getUsersTC = createAsyncThunk(
    'users/getUsers',
    async(param: { sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number, searchLoginTerm?: string, searchEmailTerm?: string}, {dispatch, rejectWithValue }) => {
        try{
            const res = await usersAPI.getUsers(param)
            return res.data
        }catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        }
    }
)

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
   
    },
    extraReducers: builder => {
        //Get users
        builder.addCase(getUsersTC.fulfilled, (state, action) => {
            debugger
            const users = action.payload
            if(users){
                return state = users
            } 
          })
          builder.addCase(getUsersTC.rejected, (state, { payload }) => {
            //to do something inside
          })
    }
})

export const UsersReducer = slice.reducer