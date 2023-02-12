import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../Common/Button/button';
import { Modal } from '../../Common/Modal/modal';
import { getBlogsTC } from '../../redux/BlogReducer';
import { selectBlogs } from '../../redux/selectors/blogs-selectors';
import { useAppDispatch } from '../../redux/store';
import { Blog } from './Blog/blog';
import { useForm } from 'react-hook-form';
import st from './blogs.module.css'

export const Blogs = () => {

    const blog = useSelector(selectBlogs)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getBlogsTC())
    }, [])

    
    const {
        register, handleSubmit, formState: { errors }, formState} = useForm({
            mode: 'onBlur',
        defaultValues: {
            name: '',
            description: '',
            websiteUrl: '',
        }
      });

      const onSubmit = (data: any) => {
        alert(JSON.stringify(data))
      }

    return (
        <div className={st.blogColor}>
                <h3 className={st.title}>Blogs</h3>
               
                <div className={st.buttonAdd}>
                    <Button title={'Add new Blog'} onClick={() => { }} />
                </div>
                <hr />
               
                <Modal active={true} setActive={undefined} >
                    <div className={st.modalBlock}>
                    <button className={st.closeButton}>X</button>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={st.titleInput}>Name    
                                <input className={st.inputForm} {...register('name', {required: 'obligatory Field'})}  />
                            </div>
                            <div>{errors?.name && <p>{errors.name.message || 'Error'}</p>}</div>
                            <div className={st.titleInput}>about
                                <input className={st.inputForm} {...register('description', {required: 'obligatory Field'})} />
                            </div>
                            <div>{errors.description && <p>{errors.description.message || 'Error'}</p>}</div>
                            <div className={st.titleInput}>website
                                <input className={st.inputForm} {...register('websiteUrl', {required: 'obligatory Field'})} />
                            </div>
                            <div>{errors.websiteUrl && <p>{errors.websiteUrl.message || 'Error'}</p>}</div>
                            <input className={st.createBlogButton} type="submit" value='Create blog' />
                        </form>
                        <div>
                            
                        </div>
                    </div>
                </Modal>
                
            <div className={st.inputBlock}>
                <div className={st.child1}>
                    <input className={st.search} placeholder='search' type="text" />
                </div>
                <div className={st.child2}>
                    <select className={st.select} name="blabla" id="1">
                        <option value="value1">New blogs first</option>
                        <option value="value1">Old blogs first</option>
                        <option value="value2">From A to Z</option>
                        <option value="value3">From Z to A</option>
                    </select>
                </div>

                <div className={st.child3}>

                    <div className={st.blogs}>
                        {
                            blog.map(b => {
                                return (
                                    <div key={b.id}>
                                        <Blog blog={b} />
                                        <hr />
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}