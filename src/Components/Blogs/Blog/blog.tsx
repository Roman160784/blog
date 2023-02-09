import React from 'react';
import { BlogType, getBlogTC } from '../../../redux/BlogReducer';
import { useAppDispatch } from '../../../redux/store';
import st from './blog.module.css'

type BlogsPrpsType = {
    blog: BlogType
}



export const Blog = ({blog, ...props}: BlogsPrpsType) => {

    
    const dispatch = useAppDispatch() 

    const onClickBlogHandler = (blogId: string) => {
        dispatch(getBlogTC({blogId}))
    }
    return(
        <div className={st.blogBlock} 
        onClick={()=> onClickBlogHandler(blog.id)}>
            <div>
                <img className={st.avatar} src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg"
                 alt="avatar" />
            </div>
            
            <div className={st.textBlog}>
                <div>
                <h5>{blog.name}</h5>
                </div>
                <div>
                    <span>Website:</span>
                    <a className={st.link} href={blog.websiteUrl}>  </a>
                </div>
                <div className={st.discription}>
                    <span>{blog.description}</span>
                    
                </div>
            </div>
           
        </div>
        
    )
}


