import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authApi, LoginisationType } from "../api/bloggerPlatformAPI"



export const loginisationTC = createAsyncThunk(
    'auth/isLoginisation',
    async (param: {args: LoginisationType}, {dispatch, rejectWithValue}) => {
        try{
           const res = await authApi.logIn(param.args)
            if(res.data){
              return true
            }
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
      if(action.payload){
       state.isLogin = action.payload
      }
        return state
      })
      
      builder.addCase(loginisationTC.rejected, (state, { payload }) => {
        //to do something inside
      })
  }
})

export const AuthReducer = slice.reducer