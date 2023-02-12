import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import {  useParams} from 'react-router-dom';
import { getBlogsPostsTC } from '../../../redux/BlogReducer';
import { selectBlogs } from '../../../redux/selectors/blogs-selectors';
import { useAppDispatch } from '../../../redux/store';
import { Post } from '../Post/post';




export const PostsOfBlog = () => {
    const pageBlog = useSelector(selectBlogs)
    const dispatch = useAppDispatch() 

    const params = useParams<'blogId'>();
    const blogId = params.blogId
   

    
    useEffect(() => {
        if(blogId){
            dispatch(getBlogsPostsTC({blogId}))
        }  
    }, [])

    return (
        <>
        {
            pageBlog.map(p => {
                return (
                    <div key={p.id}>
                        <li>{p.id}</li>
                        <li>{p.description}</li>
                        <li>{p.name}</li>
                        
                    </div>
                    // <Post post={p.}/>
                    )
            })
        }
        </>
    )
}