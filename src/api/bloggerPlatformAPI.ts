import axios, { AxiosResponse } from "axios";
import { BlogsType } from "../redux/BlogReducer";
import { getPostsTC, PostsType, PostType } from "../redux/PostsReducer";

 export const instance = axios.create({
    baseURL: 'https://ht-02-03.vercel.app/api/',
    headers: {
        Authorization: "Basic YWRtaW46cXdlcnR5",
      },
})
 export const AdminInstance = axios.create({
    baseURL: 'https://ht-02-03.vercel.app/api/',
    headers: {
        Authorization: "Basic YWRtaW46cXdlcnR5",
      },
})

export type OneBlogResponseType ={
    id: string
    name: string
    description: string
    websiteUrl: string
}

export type AddBlogType = {
    name: string
    description: string
    websiteUrl: string
}

export const blogsAPI = {
    
    getBlogs() {
        return  instance.get<BlogsType>('blogs')  
    },
    getOneBlog(id: string){
        return instance.get<{ id: string }, AxiosResponse <OneBlogResponseType>>(`blogs/${id}`)
    },
    getBlogsPosts(blogId: string) {
        return instance.get<BlogsType>(`blogs/${blogId}/posts`)
    },
    addBlog(fields: AddBlogType){
        return AdminInstance.post<AddBlogType>('blogs', fields)
    },
    removeBlog(id: string){
        return AdminInstance.delete(`blogs/${id}`)
    },
    updateBlog(id: string, param: AddBlogType){
        return AdminInstance.put<AddBlogType>(`blogs/${id}`, param)
    }
}

export const postsAPI = {
    getPosts() {
        return instance.get<PostsType>('posts')
    },
    getPost(id: string) {
        return instance.get<PostsType>(`posts/${id}`)
    },
    addPost() {

    }
}

