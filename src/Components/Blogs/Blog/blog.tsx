import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../Common/Modal/modal';
import { BlogType, removeBlogTC } from '../../../redux/BlogReducer';
import { useAppDispatch } from '../../../redux/store';
import st from './blog.module.css'

type BlogsPrpsType = {
    blog: BlogType
}



export const Blog = ({ blog, ...props }: BlogsPrpsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [active, setActive] = useState<boolean>(false)

    const onClickBlogHandler = (blogId: string) => {
        navigate(`/oneBlogPage/${blogId}`)
    }

    const removeBlogHandler = () => {
        setActive(true)
        
    }
    
    const buttonNoHandler = () => {
        setActive(false)
    }

    const buttonYesHandler = (id: string) => {
         dispatch(removeBlogTC({id}))
        setActive(false)
    }

    return (
        <div>
            <Modal active={active} setActive={undefined} >
                <div className={st.modalBlock}>
                    <div className={st.modalTitle}>Are you really wants to delete Blog?</div>
                    <div className={st.buttonBlock}>
                        <button className={st.yesButton} onClick={()=> {buttonYesHandler(blog.id)}}>Yes</button>
                        <button className={st.noButton} onClick={buttonNoHandler}>No</button>
                    </div>
                </div>
            </Modal>
             <button className={st.buttonRemove} onClick={removeBlogHandler}>Remove blog</button>
        <div className={st.blogBlock}
            onClick={() => onClickBlogHandler(blog.id)}>
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
                    <a className={st.link} href={blog.websiteUrl}>{blog.websiteUrl}  </a>
                </div>
                <div className={st.discription}>
                    <span>{blog.description}</span>
                </div>
               
            </div>
        </div>
        </div>
    )
}


