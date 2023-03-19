
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../../Common/Button/button';
import { addCommentTC } from '../../redux/CommentsReducer';
import { selectComments } from '../../redux/selectors/comments-selectors';
import { useAppDispatch } from '../../redux/store';
import { Coment } from './Coment/coment';
import st from './coments.module.css'

type ComentsPropsType = {
    postId: string
}


export const Coments = ({ postId, ...props }: ComentsPropsType) => {

    const [content, setContent] = useState<string>('')
    const [error, setError] = useState<string | null>('')

    const {page, pageSize, items, pagesCount, totalCount} = useSelector(selectComments)

    const dispatch = useAppDispatch()

   
    const canclelButtonHandler = () => {
        setContent('')
    }

    const sendCommentHandler = () => {
        if (content.length > 20 && content.length < 300) {
            dispatch(addCommentTC({ postId: postId, content: content }))
            setContent('')
        } else {
            setError('Min length 20 and Max length 300')
        }

    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.currentTarget.value)
        setError(null)
    }


    return (
        <div className={st.comentsBlock}>
            <h3 className={st.title}>{`Comments (${totalCount})`}</h3>
            <input value={content} className={st.coment} onChange={onChangeHandler} type="text" placeholder='Provide your coment...' />
            {error && <div className={st.error}>{error}</div>}
            <div>
                <Button disabled={false} title={'Cancel'} onClick={canclelButtonHandler} />
                <Button disabled={false} title={'Send your comment'} onClick={sendCommentHandler} />
            </div>
            {
              items.map(c => {
                return (
                    <div key={c.id}>
                        <Coment comment={c} />
                    </div>
                )
              }) 
            }
            <div className={st.showMore}>
            <Button disabled={false} title={'Show more'} onClick={canclelButtonHandler} />
            </div>
        </div>
    )

}


