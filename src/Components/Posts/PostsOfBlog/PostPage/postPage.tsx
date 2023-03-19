import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../../../Common/Modal/modal';
import { getCommentsTC } from '../../../../redux/CommentsReducer';
import { getPostTC, removePostTC, updatePostTC } from '../../../../redux/PostsReducer';
import { selectOnePost } from '../../../../redux/selectors/posts-selectors';
import { useAppDispatch } from '../../../../redux/store';
import { Coments } from '../../../Coments/coments';
import { pathSiteBarEnum } from '../../../MainPage/mainPage';
import st from './postPage.module.css'


export const PostPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onePost = useSelector(selectOnePost)

    //for update modal
    const [active, setActive] = useState<boolean>(false)
    const [blogId, setBlogId] = useState<string>('')
    const [postId, setPostId] = useState<string>('')
    // fo remove modal
    const [modal, setModal] = useState<boolean>(false)


    const params = useParams<'id'>();
    const id = params.id

    useEffect(() => {
        id && dispatch(getPostTC({ id }))
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(getCommentsTC({ postId: id }))
        }
    }, [])

    //form for update post
    const {
        register, handleSubmit, formState: { errors }, formState, reset } = useForm({
            mode: 'onBlur',
            defaultValues: {
                title: '',
                shortDescription: '',
                content: '',
                blogId: '',
            }
        });

    const onSubmit = (args: any) => {
        args.blogId = blogId
        dispatch(updatePostTC({ id: postId, args }))
        reset()
        setActive(false)
    }



    // remove Post 
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
        dispatch(removePostTC({ id }))
        navigate(pathSiteBarEnum.posts)
        setModal(false)
    }

    //update post handlers

    const updateButtonHandler = (id: string, blogId: string) => {
        setPostId(id)
        setBlogId(blogId)
        setActive(true)
    }

    const closeModalHandler = () => {
        reset()
        setActive(false)
    }

    return (
        <div className={st.pagePostBlok}>
            <div className={st.nav} onClick={onClickBackToPostsHandler}> ← Back to posts</div>
            <div>
                <img className={st.avatar} src="https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png" alt="avatar" />
                <span className={st.blogName}>{onePost.blogName}</span>
                <button onClick={() => { updateButtonHandler(onePost.id, onePost.blogId) }} className={st.updateButton}>Update post</button>
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
                    <h4 className={st.modalTitle}>Do you wants to remove post?</h4>
                    <div className={st.buttonBlock}>
                        <button onClick={() => { buttonYes(onePost.id) }} className={st.yes}>Yes</button>
                        <button onClick={buttonNo} className={st.no}>No</button>
                    </div>
                </div>
            </Modal>
            <Modal active={active} setActive={undefined} >
                <div className={st.createPostBlock}>
                    <h3>Create your post</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={st.modalTitle}>Title
                            <input placeholder='title' className={st.modalInput} {...register('title', {
                                required: 'field is required',
                                maxLength: { value: 30, message: 'Max Length 30' },
                            })} />
                        </div>
                        <div>{errors?.title && <p>{errors.title.message || 'Error'}</p>}</div>
                        <div className={st.modalTitle}>about
                            <input placeholder='discription' className={st.modalInput} {...register('shortDescription', {
                                required: 'field is required',
                                maxLength: { value: 100, message: 'Max Length 100' },
                            })} />
                        </div>
                        <div>{errors.shortDescription && <p>{errors.shortDescription.message || 'Error'}</p>}</div>
                        <div className={st.titleInput}>
                            <textarea maxLength={1000} placeholder='content' className={st.textArea} {...register('content', {
                                required: 'field is required',
                                maxLength: { value: 1000, message: 'Max Length 1000' },
                            })} />
                        </div>
                        <div>{errors.content && <p>{errors.content.message || 'Error'}</p>}</div>
                        <input className={st.updatePostButton} type="submit" value='Create your post' />
                        <button onClick={closeModalHandler} className={st.closePostButton}>Close</button>
                    </form>
                </div>
            </Modal>
            <div>
                <Coments postId={onePost.id} />
            </div>
        </div>

    )
}