import React from 'react';
import { BlogType } from '../../../redux/BlogReducer';
import st from './blog.module.css'

type BlogsPrpsType = {
    blog: BlogType
}

export const Blog = ({blog, ...props}: BlogsPrpsType) => {
    return(
        <div className={st.blogBlock}>
            <div>
                <img className={st.avatar} src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg"
                 alt="avatar" />
            </div>
            
            <div>
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