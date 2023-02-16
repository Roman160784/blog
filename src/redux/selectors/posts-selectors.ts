import { RootReducerType } from "../store";


export const selectPosts = (state: RootReducerType) => state.posts.posts.items
export const selectOnePost = (state: RootReducerType) => state.posts.onePost