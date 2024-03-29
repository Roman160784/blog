import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button } from '../../Common/Button/button';
import { getPostsTC } from '../../redux/PostsReducer';
import { selectLogin } from '../../redux/selectors/login-selectors';
import { selectAllPosts, selectPosts} from '../../redux/selectors/posts-selectors';
import { useAppDispatch } from '../../redux/store';
import { pathSiteBarEnum } from '../MainPage/mainPage';
import { Post } from './Post/post';
import st from './posts.module.css'

export const Posts = () => {

    const dispatch = useAppDispatch() 
    const postsAll = useSelector(selectAllPosts)
    const [disabled, setDisable] = useState<boolean>(false)
    const [select, setSelect] = useState<string>("");

    let {page, pageSize, pagesCount, totalCount} = useSelector(selectPosts)
    const isLogin = useSelector(selectLogin)
    
    useEffect(() => {
      dispatch(getPostsTC({sortDirection: select}))
    }, [select])

    const showMoreButtonHandler = () => { 
        if( pageSize < totalCount) {
            pageSize += 10
            dispatch(getPostsTC({pageSize}))
        }else if (totalCount < pageSize){
            setDisable(true)
        }
        else{
            setDisable(true)
        }
    }

    const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelect(e.currentTarget.value)
    }

    if (isLogin === false ) return <Navigate to={pathSiteBarEnum.login}/>

    return (
        <div >
            <div>
                <h3 className={st.title}>Posts</h3>
                <hr />
            </div>
            <div className={st.search}>
                <select onChange={onChangeSelectHandler} className={st.searchInput} name="blabla" id="1">
                    <option value="desc">New posts first</option>
                    <option value="asc">Old posts first</option>
                </select>
            </div>
            <ul className={st.mainPostsBlock}>
                {
                    postsAll.map(p => {
                        
                        return (
                            <li className={st.postBlock} key={p.id}>
                                <Post post={p} />
                            </li>
                        )
                    })
                }       
            </ul>
            <div className={st.showMoreButton}>
                <Button disabled={disabled} title={'Show more ↓'} onClick={showMoreButtonHandler}/>
            </div>
        </div>
    )
}