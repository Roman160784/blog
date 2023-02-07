import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { getBlogsTC } from '../../redux/BlogReducer';
import { selectBlogs } from '../../redux/selectors/blogs-selectors';
import { useAppDispatch } from '../../redux/store';
import { Blog } from './Blog/blog';
import st from './blogs.module.css'

export const Blogs = () => {

    const blog = useSelector(selectBlogs)
    const dispatch = useAppDispatch() 

    useEffect(() => {
      dispatch(getBlogsTC())
    }, [])
    


    return (
        <div className={st.blogColor}>
            <div>
                <h3 className={st.title}>Blogs</h3>
                <hr />
            </div>
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
                                return(
                                    <div key={b.id}>
                                    <Blog blog={b}  />
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