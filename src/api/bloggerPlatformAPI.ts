import axios from "axios";
import { BlogsType } from "../redux/BlogReducer";

 export const instance = axios.create({
    baseURL: 'https://ht-02-03.vercel.app/api/',
})

export const blogsAPI = {
    
    getBlogs(){
        return  instance.get<BlogsType>('blogs')  
    }
}