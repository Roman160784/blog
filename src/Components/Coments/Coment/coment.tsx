import React from 'react';
import { Button } from '../../../Common/Button/button';
import { EditableSpan } from '../../../Common/EditableSpan/editableSpan';
import { Modal } from '../../../Common/Modal/modal';
import { CommentType, removeCommentTC } from '../../../redux/CommentsReducer';
import { useAppDispatch } from '../../../redux/store';
import st from './coment.module.css'

type ComentPropsType = {
    comment: CommentType
}

export const Coment = ({ comment, ...props }: ComentPropsType) => {

    const dispatch = useAppDispatch()

    const removePostHandler = (commentId: string) => {
        dispatch(removeCommentTC({ commentId }))
    }

    return (
        <div className={st.comentBlock}>
            <img className={st.avatar} src="https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png" alt="avatar" />
            <span className={st.name}>{comment.commentatorInfo.userLogin}</span>
            <span className={st.date}>{comment.createdAt}</span>
            <Modal active={true} setActive={undefined} >
                <div className={st.modal}>
                    <span className={st.modalTitle}>Do you wants to remove comment???</span>
                    <div className={st.modalButtonBlock}>
                            <button className={st.buttonYes} onClick={() => { removePostHandler(comment.id) }}>{'Yea I do'}</button>
                            <button className={st.buttonNo} onClick={() => { removePostHandler(comment.id) }}>{'No no no'}</button>
                    </div>
                </div>
            </Modal>
            <div>
                <EditableSpan title={comment.content} changeTitle={() => { }} />
            </div>
            <Button disabled={false} title={'Remove comment'} onClick={() => { removePostHandler(comment.id) }} />
        </div>
    )

}