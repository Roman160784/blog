import React, { useState } from 'react';
import { Button } from '../../../Common/Button/button';
import { Modal } from '../../../Common/Modal/modal';
import { useAppDispatch } from '../../../redux/store';
import { removeUserTC, UserType } from '../../../redux/UsersReducer';
import st from './user.module.css'

type UserPropsType = {
    user: UserType
}

export const User = ({user, ...props} : UserPropsType) => {

    const dispatch = useAppDispatch()
    const [active, setActive] = useState<boolean>(false)

    const buttonRemoveHandler = (id: string) => {
        setActive(true)
    }

    const buttonYesHandler = (id: string) => {
     dispatch(removeUserTC({id}))
     setActive(false)
    }

     const buttonNoHandler = () => {
        setActive(false)
     }
    
    return(
        <div >
            <Modal active={active} setActive={undefined} >
                <div className={st.modalBlock}>
                    <div className={st.modalTitle}>Are you really wants to delete User?</div>
                    <div className={st.buttonBlock}>
                        <button className={st.yesButton} onClick={()=> {buttonYesHandler(user.id)}}>Yes</button>
                        <button className={st.noButton} onClick={buttonNoHandler}>No</button>
                    </div>
                </div>
            </Modal>
            <span className={st.titleLogin}>{user.login}</span>
            <span className={st.titleEmail}>{user.email}</span>
            <span className={st.titleDate}>{user.createdAt}</span>
            <Button disabled={false} title={'Remove User'} onClick={() => {buttonRemoveHandler(user.id)}}/>
        </div>
        )
}