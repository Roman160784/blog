import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../../../Common/Modal/modal';
import { getPostTC, removePostTC } from '../../../../redux/PostsReducer';
import { selectOnePost } from '../../../../redux/selectors/posts-selectors';
import { useAppDispatch } from '../../../../redux/store';
import { pathSiteBarEnum } from '../../../MainPage/mainPage';
import st from './postPage.module.css'


export const PostPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate() 

    const onePost = useSelector(selectOnePost)
   
    const [modal, setModal] = useState<boolean>(false)

    const params = useParams<'id'>();
    const id = params.id

    useEffect(()=> {
        id && dispatch(getPostTC({id}))
    },[])

    const onClickBackToPostsHandler = () => {
        navigate(pathSiteBarEnum.posts)
    }

    const removePostButton = () => {
        setModal(true)
    }

    const buttonNo = () => {
        setModal(false)
    }

    const buttonYes = (id: string) => {
        dispatch(removePostTC({id}))
        navigate(pathSiteBarEnum.posts)
        setModal(false)
    }
    
    return (
        <div className={st.pagePostBlok}>
            <div className={st.nav} onClick={onClickBackToPostsHandler}> ← Back to posts</div>
            <div>
                <img className={st.avatar} src="https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png" alt="avatar" />
                <span className={st.blogName}>{onePost.blogName}</span>
                <button className={st.updateButton}>Update post</button>
                <button onClick={removePostButton} className={st.updateButton}>Remove post</button>
            </div>
            <div>
                <h3>{onePost.title}</h3>
                <div>{onePost.createdAt.slice(0, 10)}</div>
                <div><img className={st.blogPicture} src="https://hyperhost.ua/info/storage/uploads/2020/03/blog.jpeg" alt="picture" /></div>
                <div className={st.conrent}>{onePost.content}</div>
            </div>
            <Modal active={modal} setActive={undefined} >
                    <div className={st.modalBlock}>
                        <h4 className={st.modalTitle}>Do you wanrs to remove post?</h4>
                        <div className={st.buttonBlock}>
                            <button onClick={() => {buttonYes(onePost.id)}} className={st.yes}>Yes</button>
                            <button onClick={buttonNo} className={st.no}>No</button>
                        </div>
                    </div>
                </Modal>
        </div>
        
    )
}