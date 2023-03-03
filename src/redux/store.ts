import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { BlogsReducer } from "./BlogReducer";
import { AuthReducer } from "./LoginReducer";
import { PostsReducer } from "./PostsReducer";
import { UsersReducer } from "./UsersReducer";

const rootReducer = combineReducers({
    blogs: BlogsReducer,
    posts: PostsReducer,
    users: UsersReducer,
    auth: AuthReducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-ignore
window.store = store;
