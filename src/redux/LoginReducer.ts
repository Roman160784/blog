import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authApi, LoginisationType } from "../api/bloggerPlatformAPI"



export const loginisationTC = createAsyncThunk(
    'auth/isLoginisation',
    async (param: {login: LoginisationType}, {dispatch, rejectWithValue}) => {
        try{
            await authApi.logIn(param.login)
            return true
          }catch(e: any) {
            
          }
    }

)


export type LoginStateType = {
    isLogin: boolean
}

const initialState: LoginStateType = {
    isLogin: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
  },
  extraReducers: builder => {
    // Is Login
    builder.addCase(loginisationTC.fulfilled, (state, action) => {
        return state
      })
      
      builder.addCase(loginisationTC.rejected, (state, { payload }) => {
        //to do something inside
      })
  }
})