import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreatePostType, postsAPI } from "../api/bloggerPlatformAPI";

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

type initialStateType = {
    posts : PostsType
    onePost: PostType
}



export const getPostsTC = createAsyncThunk(
    'posts/getPosts',
    async (param, { dispatch: rejectWithValue }) => {
        try {
            const res = await postsAPI.getPosts()
            return { data: res.data.items }
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

export const getPostTC = createAsyncThunk(
    'posts/getPost',
    async (param: { id: string }, { dispatch: rejectWithValue }) => {
        try {
            const res = await postsAPI.getPost(param.id)
            return { data: res.data }
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

export const addPostTC = createAsyncThunk(
    'posts/createPost',
    async (param: {args: CreatePostType}, {dispatch: rejectWithValue}) => {
        try{
            const res = await postsAPI.addPost(param.args)
            return {data: res.data}
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

export const removePostTC = createAsyncThunk(
    'posts/removePost',
    async (param : {id: string}, {dispatch: rejectWithValue}) => {
        try {
            const res = await postsAPI.removePost(param.id)
            return param.id
        }catch (e: any) {
            //return rejectedWithValue({Error: что то описать}) 
        }
    }
)

const initialState: initialStateType = {
    posts: {
        pagesCount: 0,
        page: 0,
        pageSize: 0,
        totalCount: 0,
        items: []
    },
    onePost: {
        id: "",
        title: "",
        shortDescription: "",
        content: "",
        blogId: "",
        blogName: "",
        createdAt: ""
    }
}

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        //Get all posts
        builder.addCase(getPostsTC.fulfilled, (state, action) => {
            if(action.payload?.data){
                state.posts.items = action.payload?.data
            }
            return state
        })
        builder.addCase(getPostsTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Get one post
        builder.addCase(getPostTC.fulfilled, (state, action) => {
            if(action.payload?.data){
                state.onePost = action.payload?.data
            }
            return state
        })
        builder.addCase(getPostTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Create post
        builder.addCase(addPostTC.fulfilled, (state, action) => {
            return state
        })
        builder.addCase(addPostTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove post
        builder.addCase(removePostTC.fulfilled, (state, action) => {
            state.posts.items.forEach((el, i) => el.id === action.payload ? state.posts.items.splice(i, 1) : el)
            return state
        })
        builder.addCase(removePostTC.rejected, (state, { payload }) => {
            //to do something inside
        })
    }
})

export const PostsReducer = slice.reducer