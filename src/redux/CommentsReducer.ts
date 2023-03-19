import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { commentsAPI, GetCommentsType } from "../api/bloggerPlatformAPI"
import { setAppStatusAC } from "./AppReducer"

export type CommentType = {
    id: string
    content: string
    commentatorInfo: CommentatorInfoType
    createdAt: string

}

export type CommentsType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: CommentType[]
}

type CommentatorInfoType = {
    userId: string
    userLogin: string
}


const initialState: CommentsType = {
    pagesCount: 0,
    page: 0,
    pageSize: 0,
    totalCount: 0,
    items: []
}

export const getCommentsTC = createAsyncThunk(
    'comments/getComments',
    async (param: { pageSize?: number, pageNumber?: number, postId: string, sortBy?: string, sortDirection?: string  },
         { dispatch, rejectWithValue }) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        try {
            const res = await commentsAPI.getComments({postId: param.postId, pageSize: param.pageSize})
            return { data: res.data }
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }
    }
)

export const addCommentTC = createAsyncThunk(
    'comments/addComment',
    async (param: { postId: string, content: string }, { dispatch, rejectWithValue }) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const accessToken = localStorage.getItem('token')
        try {
            const res = await commentsAPI.addComment(param.postId, param.content, accessToken)
            return { data: res.data }
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }
    }
)

export const updateCommentTC = createAsyncThunk(
    'comments/updateComment',
    async (param: { commentId: string, content: string }, { dispatch, rejectWithValue }) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const accessToken = localStorage.getItem('token')
        try {
            await commentsAPI.updateComment(param.commentId, param.content, accessToken)
            return { data: param.content,  commentId: param.commentId}
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }
    }
)

export const removeCommentTC = createAsyncThunk(
    'comments/removeComment',
    async (param: { commentId: string }, { dispatch, rejectWithValue }) => {
        dispatch(setAppStatusAC({ status: 'loading' }))
        const accessToken = localStorage.getItem('token')
        try {
            commentsAPI.removeComment(param.commentId, accessToken)
            return param.commentId
        } catch (e: any) {
            //return rejectedWithValue({Error: что то описать})
        } finally {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
        }
    }
)

const slice = createSlice({
    name: 'comments',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        //Get comments
        builder.addCase(getCommentsTC.fulfilled, (state, action) => {
            if (action.payload) {
                return state = action.payload.data
            }
        })
        builder.addCase(getCommentsTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Add comment 
        builder.addCase(addCommentTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.items.unshift(action.payload?.data)
            }
            return state
        })
        builder.addCase(addCommentTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Remove comment
        builder.addCase(removeCommentTC.fulfilled, (state, action) => {
            state.items.forEach((c, i) => c.id === action.payload ? state.items.splice(i, 1) : c)
            return state
        })
        builder.addCase(removeCommentTC.rejected, (state, { payload }) => {
            //to do something inside
        })
        //Update comment
        builder.addCase(updateCommentTC.fulfilled, (state, action) => {
            const items = state.items.map(c => c.id === action.payload?.commentId ? {...c, content: action.payload.data} : c)
            state.items = items
            return state
        })
        builder.addCase(updateCommentTC.rejected, (state, { payload }) => {
            //to do something inside
        })
    }
})


export const CommentsReducer = slice.reducer