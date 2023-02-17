import axios, { AxiosResponse } from "axios";
import { BlogsType, BlogType } from "../redux/BlogReducer";
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

export type OneBlogResponseType = {
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
        return instance.get<BlogsType>('blogs')
    },
    getOneBlog(id: string) {
        return instance.get<{ id: string }, AxiosResponse<OneBlogResponseType>>(`blogs/${id}`)
    },
    getBlogPosts(blogId: string) {
        return instance.get<PostsType>(`blogs/${blogId}/posts`)
    },
    addBlog(fields: AddBlogType) {
        return AdminInstance.post<BlogType>('blogs', fields)
    },
    removeBlog(id: string) {
        return AdminInstance.delete(`blogs/${id}`)
    },
    updateBlog(id: string, param: AddBlogType) {
        return AdminInstance.put<BlogType>(`blogs/${id}`, param)
    }
}

export type CreatePostType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
}

export const postsAPI = {
    getPosts() {
        return AdminInstance.get<PostsType>('posts')
    },
    getPost(id: string) {
        return AdminInstance.get<PostType>(`posts/${id}`)
    },
    addPost(param: CreatePostType) {
        return AdminInstance.post<CreatePostType>(`posts`, param)
    },
    removePost(id: string) {
        return AdminInstance.delete(`posts/${id}`)
    },
    updatePost(id: string, param: CreatePostType) {
        return AdminInstance.put<CreatePostType>(`posts/${id}`, param)
    }
}

