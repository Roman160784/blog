import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import { blogsAPI, OneBlogResponseType, AddBlogType } from "../api/bloggerPlatformAPI"

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
  createdAt?: string
  isMembership?: boolean
}

export type BlogsStateType = {
  blogs: BlogsType
  oneBlogPage : OneBlogResponseType
}


export const getBlogsTC = createAsyncThunk(
  'blogs/getBlogs',
  async (param, { dispatch: rejectWithValue }) => {
    try {
      const res = await blogsAPI.getBlogs()
      return { data: res.data, }
    } catch (e: any) {
      //return rejectedWithValue({Error: что то описать})
    }
  })

export const getBlogsPostsTC = createAsyncThunk(
  'blogs/getBlog',
  async (param: {blogId: string}, { dispatch: rejectWithValue }) => {
    try {
      const res = await blogsAPI.getBlogsPosts(param.blogId)
      return { data: res.data,blogId:param.blogId }
    } catch (e: any) {
      //return rejectedWithValue({Error: что то описать})
    }
  }
)

export const getOneBlogTС = createAsyncThunk(
  'blogs/getOneBlog',
  async (param: {id: string}, { dispatch: rejectWithValue }) => {
    try{
      const res = await blogsAPI.getOneBlog(param.id)
      return {data: res.data}
    }catch(e: any) {
      //return rejectedWithValue({Error: что то описать})
    }
  }
) 

export const addBlogTC = createAsyncThunk(
  'blogs/addBlog',
  async (param: {args: AddBlogType}, { dispatch: rejectWithValue }) => {
    try{
      const res = await blogsAPI.addBlog(param.args)
      return {data: res.data}
    }catch (e: any) {
      return rejectWithValue(e)
    }
  }
)

export const removeBlogTC = createAsyncThunk(
  'blogs/removeBlog',
  async (param: {id: string}, { dispatch: rejectWithValue }) =>{
    try{
      await blogsAPI.removeBlog(param.id)
      return param.id
    }catch (e: any) {
      return rejectWithValue(e)
    }
  }
)



const initialState: BlogsStateType = {
  blogs: {
    pagesCount: 0,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    items: []
  },
  oneBlogPage: {
    id: "",
    name: "",
    description: "",
    websiteUrl: ""
  }
}


const slice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getBlogsTC.fulfilled, (state, action) => {
      const allBlogs = action.payload?.data
      if(allBlogs) {
        state.blogs = allBlogs
      }
      return state
    })
    //Get Blogs
    builder.addCase(getBlogsTC.rejected, (state, { payload }) => {
      //to do something inside
    })
    builder.addCase(getBlogsPostsTC.fulfilled, (state, action) => {
      return state
    })
    //Get Plog's posts
    builder.addCase(getBlogsPostsTC.rejected, (state, { payload }) => {
      //to do something inside
    })
    //
    builder.addCase(getOneBlogTС.fulfilled, (state, action) =>{
      if(action.payload?.data){
        state.oneBlogPage = action.payload.data
      }
      return state
    })
    //Get one Blog
    builder.addCase(getOneBlogTС.rejected, (state, { payload }) => {
      //to do something inside
    })
    // Add Blog
    builder.addCase(addBlogTC.fulfilled, (state, action) => {
      state.blogs.items.unshift(action.payload.data)
      return state
    })
    builder.addCase(addBlogTC.rejected, (state, { payload }) => {
      //to do something inside
    })
    // Remove Blog
    builder.addCase(removeBlogTC.fulfilled, (state, action) => {
       state.blogs.items.forEach((el, i) => el.id === action.payload ? state.blogs.items.splice(i, 1) : el)
      return state
    })
    builder.addCase(removeBlogTC.rejected, (state, { payload }) => {
      //to do something inside
    })
  }
})

export const BlogsReducer = slice.reducer
