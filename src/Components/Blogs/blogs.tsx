import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../Common/Button/button';
import { Modal } from '../../Common/Modal/modal';
import { addBlogTC, getBlogsTC } from '../../redux/BlogReducer';
import { selectBlogs, selectBlogsQuery } from '../../redux/selectors/blogs-selectors';
import { useAppDispatch } from '../../redux/store';
import { Blog } from './Blog/blog';
import { useForm } from 'react-hook-form';
import st from './blogs.module.css'
import { AddBlogType } from '../../api/bloggerPlatformAPI';
import useDebounce from '../../Hooks/useDebounce';
import { selectLogin } from '../../redux/selectors/login-selectors';
import { Navigate } from 'react-router-dom';
import { pathSiteBarEnum } from '../MainPage/mainPage';
import { checkAuthTC } from '../../redux/LoginReducer';

enum SelectEnum {
    o = "0",
    createdAt = "createdAt",
    asc = 'asc',
    desc = "desc",

}

export const Blogs = () => {

    
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [disabled, setDisable] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("");
    const [selectDate, setSelectDate] = useState<string | undefined>(undefined);
    const [selectName, setSelectName] = useState<string | undefined>(undefined);


    const isLogin = useSelector(selectLogin)
    const blog = useSelector(selectBlogs)
    let {page, pageSize, pagesCount, totalCount} = useSelector(selectBlogsQuery)


    
    const debonsedSerchValue = useDebounce( search, 700)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuthTC({accessToken: localStorage.getItem('token')}))
        }
    }, [])
   

    useEffect(() => {
        dispatch(getBlogsTC({searchNameTerm: debonsedSerchValue, sortBy: selectDate, sortDirection: selectName}))
    }, [debonsedSerchValue, selectDate, selectName])

   

    const showMoreHandler = () => {
        if(pageSize < totalCount){
            pageSize+=10
            dispatch(getBlogsTC({pageSize})) 
        } else if (totalCount < pageSize){
            setDisable(true) 
        }else {
            setDisable(true)  
        }
        
    }

    

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
        dispatch(addBlogTC({ args }))
        setDisable(true) 
        setActiveForModal()
    }

    const setActiveForModal = () => {
        setModalActive(false)
        reset()  
    }

   
    const searchHandler = (e: ChangeEvent <HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setDisable(false) 
    }

    const seletHandler = (e: ChangeEvent<HTMLSelectElement>) => {
       const selectValue = e.currentTarget.value       
       if(selectValue === SelectEnum.createdAt || selectValue === SelectEnum.o){
        setSelectDate(selectValue)
        setSelectName(undefined)
       } else if (selectValue === SelectEnum.asc || selectValue ===  SelectEnum.desc) {
       setSelectName(selectValue)
       setSelectDate(undefined)
    }
    }

    if (isLogin === false ) return <Navigate to={pathSiteBarEnum.login}/>

    return (
        <div className={st.blogColor}>
            <h3 className={st.title}>Blogs</h3>

            <div className={st.buttonAdd}>
                <Button title={'Add new Blog'} onClick={() => { setModalActive(true); } } disabled={false} />
            </div>
            <hr />

            <Modal active={modalActive} setActive={setActiveForModal} >
                <div className={st.modalBlock}>
                    <button onClick={setActiveForModal} className={st.closeButton}>X</button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={st.titleInput}>Name
                            <input placeholder='name' className={st.inputForm} {...register('name', {
                                required: 'field is required',
                                maxLength: { value: 15, message: 'Max Length 15' },
                            })} />
                        </div>
                        <div>{errors?.name && <p>{errors.name.message || 'Error'}</p>}</div>
                        <div className={st.titleInput}>about
                            <input placeholder='discription' className={st.inputForm} {...register('description', {
                                required: 'field is required',
                                maxLength: { value: 500, message: 'Max Length 500' },
                            })} />
                        </div>
                        <div>{errors.description && <p>{errors.description.message || 'Error'}</p>}</div>
                        <div className={st.titleInput}>website
                            <input placeholder='www.xxx.com' className={st.inputForm} {...register('websiteUrl', { 
                                required: 'field is required' })} />
                        </div>
                        <div>{errors.websiteUrl && <p>{errors.websiteUrl.message || 'Error'}</p>}</div>
                        <input  className={st.createBlogButton}  type="submit" value='Create blog' />
                    </form>
                    <div>

                    </div>
                </div>
            </Modal>

            <div className={st.inputBlock}>
                <div className={st.child1}>
                    
                    <input value={search} onChange={searchHandler} className={st.search} placeholder='search' type="text" />
                </div>
                <div className={st.child2}>
                    <select onChange={seletHandler} className={st.select} name="blabla" id="1">
                        <option  value={SelectEnum.createdAt} >New blogs first</option>
                        <option  value={SelectEnum.o}>Old blogs first</option>
                        <option  value={SelectEnum.asc}>From A to Z</option>
                        <option  value={SelectEnum.desc}>From Z to A</option>
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
                    <div className={st.buttonShowMore}>
                        <Button title={'Show more ↓'} onClick={showMoreHandler} disabled={disabled}/>
                    </div>
                </div>
            </div>
        </div>
    )
}