import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../Common/Modal/modal';
import { getPostTC, PostType, removePostTC } from '../../../redux/PostsReducer';
import { useAppDispatch } from '../../../redux/store';
import st from './post.module.css'

type PostPropType = {
    post: PostType
}

export const Post = ({ post, ...props }: PostPropType) => {

    const navigate = useNavigate() 
    const dispatch = useAppDispatch()
    const [modal, setModal] = useState<boolean>(false)
    
    
    
    const onClickPostHandler = (id: string) => {
        navigate(`/postPage/${id}`)
    }

    const removePostButton = () => {
        setModal(true)
    }

    const buttonNo = () => {
        setModal(false)
    }

    const buttonYes = (id: string) => {
        dispatch(removePostTC({id}))
        setModal(false)
    }

    return (
        <div className={st.container} >
            <img className={st.picture} src="https://st2.depositphotos.com/1006899/8421/i/600/depositphotos_84219350-stock-photo-word-blog-suspended-by-ropes.jpg" alt="post picture" />


            <div className={st.postBlock}>

                <img className={st.avatar} src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg" alt="avatar" />

                <div className={st.items}>
                <h4 onClick={()=> onClickPostHandler(post.id)}>{post.title}</h4>
                <span>{post.shortDescription}</span>

                <div>{post.createdAt.slice(0, 10)}</div>
                <button onClick={removePostButton}>Remove post</button>
                </div>
                <Modal active={modal} setActive={undefined} >
                    <div className={st.modalBlock}>
                        <h4 className={st.modalTitle}>Do you wanrs to remove post?</h4>
                        <div className={st.buttonBlock}>
                            <button onClick={() => {buttonYes(post.id)}} className={st.yes}>Yes</button>
                            <button onClick={buttonNo} className={st.no}>No</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}