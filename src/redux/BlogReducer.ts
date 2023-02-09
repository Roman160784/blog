import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { blogsAPI } from "../api/bloggerPlatformAPI"

export type BlogsType = {
  pagesCount: number
  page: number
  pageSize: number
  totalCount: number
  items: BlogType[]
}

export type BlogType = {
  id: string
  name: string
  description: string
  websiteUrl: string
  createdAt: Date
  isMembership: boolean
}


export const getBlogsTC = createAsyncThunk(
  'blogs/getBlogs',
  async (param, { dispatch: rejectWithValue }) => {
    try {
      const res = await blogsAPI.getBlogs()
      return { data: res.data }
    } catch (e: any) {
      //return rejectedWithValue({Error: что то описать})
    }
  })

export const getBlogTC = createAsyncThunk(
  'blogs/getBlog',
  async (param: { blogId: string }, { dispatch: rejectWithValue }) => {
    try {
      const res = await blogsAPI.getBlog(param.blogId)
      return { data: res.data }
    } catch (e: any) {
      //return rejectedWithValue({Error: что то описать})
    }
  }
)



const initialState: BlogsType = {
  pagesCount: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  items: [],
}


const slice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getBlogsTC.fulfilled, (state, action) => {
      return action.payload?.data
    })
    builder.addCase(getBlogsTC.rejected, (state, { payload }) => {
      //to do something inside
    })
    builder.addCase(getBlogTC.fulfilled, (state, action) => {
     return  action.payload?.data
    })
    builder.addCase(getBlogTC.rejected, (state, { payload }) => {
      //to do something inside
    })
  }
})

export const BlogsReducer = slice.reducer
