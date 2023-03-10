
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../../Common/Modal/modal';
import { BlogType, getBlogPostsTC, removeBlogTC, updateBlogTC } from '../../../redux/BlogReducer';
import { useAppDispatch } from '../../../redux/store';
import st from './blog.module.css'

type BlogsPrpsType = {
    blog: BlogType
}



export const Blog = ({ blog, ...props }: BlogsPrpsType) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [active, setActive] = useState<boolean>(false)
    const [updateModalActive, setupdateModalActive] = useState<boolean>(false)
    const [id, setId] = useState('')

    const {
        register, handleSubmit, formState: { errors }, formState, reset } = useForm({
            mode: 'onBlur',
            defaultValues: {
                name: '',
                description: '',
                websiteUrl: '',
            }
        });

    const onSubmit = (args: any) => {
        dispatch(updateBlogTC({id, args}))
        setupdateModalActive(false)
    }

    const onClickBlogHandler = (blogId: string) => {
        navigate(`/oneBlogPage/${blogId}`)
        // dispatch(getBlogPostsTC({blogId}))
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

    const updateBlogHandler = (id: string) => {
        setId(id)
        setupdateModalActive(true)
    }

    const closeUpdateModalHandler = () => {
        setupdateModalActive(false)
        reset()
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

             <button className={st.buttonRemove} onClick={() => {updateBlogHandler(blog.id)}}>Update blog</button>
        <div className={st.blogBlock}>
                <Modal active={updateModalActive} setActive={undefined} >
                    <div className={st.modalBlockUpdate}>
                        <div><button onClick={closeUpdateModalHandler} className={st.closeButton}>X</button></div>
                            <h4 className={st.titleModal}>Update Blog</h4>
                            <div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={st.modalUpdateTitle}>Name
                            <input  placeholder='Name' className={st.modalInputUpdate} {...register('name', {
                                required: 'field is required',
                                maxLength: { value: 15, message: 'Max Length 15' },
                            })} />
                        </div>
                        <div>{errors?.name && <p>{errors.name.message || 'Error'}</p>}</div>
                        <div className={st.modalUpdateTitle}>about
                            <input  placeholder='discription' className={st.modalInputUpdate} {...register('description', {
                                required: 'field is required',
                                maxLength: { value: 500, message: 'Max Length 500' },
                            })} />
                        </div>
                        <div>{errors.description && <p>{errors.description.message || 'Error'}</p>}</div>
                        <div className={st.modalUpdateTitle}>website
                            <input  placeholder='www.xxx.com' className={st.modalInputUpdate} {...register('websiteUrl', { 
                                required: 'field is required' })} />
                        </div>
                        <div>{errors.websiteUrl && <p>{errors.websiteUrl.message || 'Error'}</p>}</div>
                        <input  className={st.updateButton}  type="submit" value='Update Blog' />
                            </form>
                            </div>
                    </div>
                </Modal>
            <div>
                <img className={st.avatar} src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg"
                    alt="avatar" />
            </div>

            <div className={st.textBlog}>
                <div>
                    <h5 onClick={() => onClickBlogHandler(blog.id)}>{blog.name}</h5>
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


