import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../Common/Button/button';
import { getPostsTC } from '../../redux/PostsReducer';
import { selectAllPosts, selectPosts} from '../../redux/selectors/posts-selectors';
import { useAppDispatch } from '../../redux/store';
import { Post } from './Post/post';
import st from './posts.module.css'

export const Posts = () => {

    const dispatch = useAppDispatch() 
    const postsAll = useSelector(selectAllPosts)
    const [disabled, setDisable] = useState<boolean>(false)
    let {page, pageSize, pagesCount, totalCount} = useSelector(selectPosts)

    
    useEffect(() => {
      dispatch(getPostsTC({}))
    }, [])

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