import axios from "axios";
import { BlogsType } from "../redux/BlogReducer";
import { getPostsTC, PostsType, PostType } from "../redux/PostsReducer";

 export const instance = axios.create({
    baseURL: 'https://ht-02-03.vercel.app/api/',
    headers: {
        Authorization: "Basic YWRtaW46cXdlcnR5",
      },
})

export const blogsAPI = {
    
    getBlogs() {
        return  instance.get<BlogsType>('blogs')  
    },
    getBlog(blogId: string) {
        return instance.get<BlogsType>(`blogs/${blogId}/posts`)
    }
}

export const postsAPI = {
    getPosts() {
        return instance.get<PostsType>('posts')
    },
    getPost(id: string) {
        return instance.get<PostsType>(`posts/${id}`)
    }
}

