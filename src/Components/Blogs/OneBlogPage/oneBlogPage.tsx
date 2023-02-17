import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from '../../../Common/Modal/modal';
import { getOneBlogTС } from '../../../redux/BlogReducer';
import { addPostTC } from '../../../redux/PostsReducer';
import { selectBlogPage } from '../../../redux/selectors/blogs-selectors';
import { selectPosts } from '../../../redux/selectors/posts-selectors';
import { useAppDispatch } from '../../../redux/store';
import { pathSiteBarEnum } from '../../MainPage/mainPage';
import { Post } from '../../Posts/Post/post';
import st from './oneBlogPage.module.css'




export const OneBlogPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const blogPage = useSelector(selectBlogPage)
    const [modal, setModal] = useState<boolean>(false)
    const [blogId, setBlogId] = useState<string>('')



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
        dispatch(addPostTC({ args }))
        reset()
        setModal(false)
    }

    const params = useParams<'id'>();
    const id = params.id

    useEffect(() => {
        id && dispatch(getOneBlogTС({ id }))
    }, [])

    

    const onClickBackToBlogsHandler = () => {
        navigate(pathSiteBarEnum.blogs)
    }

    const openModalHandler = (blogId: string) => {
        setBlogId(blogId)
        setModal(true)
    }
    const closeModalHandler = () => {
        reset()
        setModal(false)
    }

    return (

        <div>

            <div className={st.backButton} onClick={onClickBackToBlogsHandler}> ← Back to blogs</div>
            <div className={st.picture}>
                <img src="https://postium.ru/wp-content/uploads/2020/03/kak-sdelat-lichnyj-blog-v-instagram-696x331.png" alt="picture" />
            </div>
            <div className={st.block}>
                <div >
                    <img className={st.avatar} src="https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg" alt="ava" />
                </div>
                <div style={{ marginLeft: 20 }}>
                    <div>
                        <h4> Name: {blogPage.name}</h4>
                    </div>
                    <div>
                        <span>Website:  </span>
                        <a href={blogPage.websiteUrl}>{blogPage.websiteUrl}</a>
                        <div>
                            <span>Discription:  {blogPage.description}</span>
                        </div>
                        <button onClick={() => { openModalHandler(blogPage.id) }} className={st.buttonCreatePost}>Create new Post</button>
                    </div>

                    <Modal active={modal} setActive={undefined}>
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
                                <input className={st.createPostButton} type="submit" value='Create your post' />
                                <button onClick={closeModalHandler} className={st.closePostButton}>Close</button>
                            </form>
                        </div>
                    </Modal>

                </div>
                {/* {
                    posts.map(p => {
                        return(
                            
                        )
                    })
                } */}
              

            </div>

        </div>

    )
}