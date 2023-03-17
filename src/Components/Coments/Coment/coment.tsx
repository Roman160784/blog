import React from 'react';
import { Button } from '../../../Common/Button/button';
import { EditableSpan } from '../../../Common/EditableSpan/editableSpan';
import { CommentType } from '../../../redux/CommentsReducer';
import st from './coment.module.css'

type ComentPropsType = {
    comment: CommentType
}

export const Coment = ({comment, ...props}: ComentPropsType) => {

    return (
        <div className={st.comentBlock}>
            <img className={st.avatar} src="https://w7.pngwing.com/pngs/862/646/png-transparent-beard-hipster-male-man-avatars-xmas-giveaway-icon-thumbnail.png" alt="avatar" />
            <span className={st.name}>{comment.commentatorInfo.userLogin}</span>
            <span className={st.date}>{comment.createdAt}</span>
            <div>
                <EditableSpan title={comment.content} changeTitle={() => { }} />
            </div>
            <Button disabled={false} title={'Remove'} onClick={() => { }} />
        </div>
    )

}