import React from 'react';
import { Blog } from './Blog/blog';
import st from './blogs.module.css'

export const Blogs = () => {
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
                        <Blog/>
                    </div>
                </div>
            </div>
        </div>
    )
}