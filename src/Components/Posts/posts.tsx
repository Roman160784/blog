import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPostsTC } from '../../redux/PostsReducer';
import { selectPosts } from '../../redux/selectors/posts-selectors';
import { useAppDispatch } from '../../redux/store';
import { Post } from './Post/post';
import st from './posts.module.css'

export const Posts = () => {

    const dispatch = useAppDispatch() 
    const post = useSelector(selectPosts)

    useEffect(() => {
      dispatch(getPostsTC())
    }, [])


    return (
        <div >
            <div>
                <h3 className={st.title}>Posts</h3>
                <hr />
            </div>
            <div className={st.search}>
                <select className={st.searchInput} name="blabla" id="1">
                    <option value="value1">New posts first</option>
                    <option value="value1">Old posts first</option>
                </select>
            </div>
            <ul className={st.mainPostsBlock}>
                {
                    post.map(p => {
                        return (
                            <li className={st.postBlock} key={p.id}>
                                <Post post={p} />
                            </li>
                        )
                    })
                }       
            </ul>
        </div>
    )
}