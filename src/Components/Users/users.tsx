import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/selectors/users-selectors';
import { useAppDispatch } from '../../redux/store';
import { getUsersTC } from '../../redux/UsersReducer';
import { User } from './User/user';
import st from './users.module.css'

export const Users = () => {

    const dispatch = useAppDispatch()

    const { items, page, pageSize, pagesCount, totalCount } = useSelector(selectUsers)

    useEffect(() => {
        dispatch(getUsersTC({}))
    }, [])


    return (
        <div className={st.usersMainBlock}>
            <div>
                <h2>Users</h2>
                <hr />
                <div className={st.inputBlock}>
                    <input className={st.inputFirst} type="text" placeholder='search Login' />
                    <input className={st.inputSecond} type="text" placeholder='search Email' />
                </div>
            </div>
            <div className={st.titleBlock}>
                <span className={st.titleLogin}>Login</span>
                <span className={st.titleEmail}>Email</span>
                <span className={st.titleDate}>Created Date</span>
            </div>
            {
                items.map(u => {
                    return <div key={u.id}>
                        <User user={u} />
                    </div>
                })
            }

        </div>
    )
}