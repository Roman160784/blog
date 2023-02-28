import React from 'react';
import { UserType } from '../../../redux/UsersReducer';
import st from './user.module.css'

type UserPropsType = {
    user: UserType
}

export const User = ({user, ...props} : UserPropsType) => {
    
    return(
        <div >
            <span className={st.titleLogin}>{user.login}</span>
            <span className={st.titleEmail}>{user.email}</span>
            <span className={st.titleDate}>{user.createdAt}</span>
        </div>
        )
}