import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postsAPI } from "../api/bloggerPlatformAPI";

export type PostsType = {
        pagesCount: number
        page: number
        pageSize: number
        totalCount: number
        items: PostType[]   
}

export type PostType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string,
    blogName: string
    createdAt: string
}



export const getPostsTC = createAsyncThunk(
    'posts/getPosts',
    async (param, { dispatch:  rejectWithValue }) => {
        try{
            const res = await postsAPI.getPosts()
            return {data: res.data}
        } catch (e: any) {
           //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

const initialState: PostsType = {
        pagesCount: 0,
        page: 0,
        pageSize: 0,
        totalCount: 0,
        items: []   
}

const slice = createSlice ({
    name: 'posts',
    initialState: initialState,
    reducers: {
  
    },
    extraReducers: builder => {
        builder.addCase(getPostsTC.fulfilled, (state, action) => {
            return action.payload?.data
        })
        builder.addCase(getPostsTC.rejected, (state, { payload }) => {
            //to do something inside
          })
    }
})

export const PostsReducer = slice.reducer