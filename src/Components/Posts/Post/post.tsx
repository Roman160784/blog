import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getPostTC, PostType } from '../../../redux/PostsReducer';
import { useAppDispatch } from '../../../redux/store';
import st from './post.module.css'

type PostPropType = {
    post: PostType
}

export const Post = ({ post, ...props }: PostPropType) => {

    const navigate = useNavigate() 
    
    const onClickPostHandler = (id: string) => {
        navigate(`/postPage/${id}`)
    }

    return (
        <div className={st.container} onClick={()=> onClickPostHandler(post.id)}>
            <img className={st.picture} src="https://st2.depositphotos.com/1006899/8421/i/600/depositphotos_84219350-stock-photo-word-blog-suspended-by-ropes.jpg" alt="post picture" />


            <div className={st.postBlock}>

                <img className={st.avatar} src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg" alt="avatar" />

                <div className={st.items}>
                <h4>{post.title}</h4>
                <span>{post.shortDescription}</span>

                <div>{post.createdAt.slice(0, 10)}</div>
                </div>
                
            </div>
        </div>
    )
}