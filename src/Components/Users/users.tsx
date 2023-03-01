import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button } from '../../Common/Button/button';
import { Modal } from '../../Common/Modal/modal';
import { selectUsers } from '../../redux/selectors/users-selectors';
import { useAppDispatch } from '../../redux/store';
import { getUsersTC } from '../../redux/UsersReducer';
import { User } from './User/user';
import st from './users.module.css'

export const Users = () => {

    const dispatch = useAppDispatch()

    const [modalActive, setModalActive] = useState<boolean>(false);
    const { items, page, pageSize, pagesCount, totalCount } = useSelector(selectUsers)

    useEffect(() => {
        dispatch(getUsersTC({}))
    }, [])


    const {
        register, handleSubmit, formState: { errors }, formState, reset } = useForm({
            mode: 'onBlur',
            defaultValues: {
                login: '',
                password: '',
                email: '',
            }
        });

    const onSubmit = (args: any) => {
        // dispatch(addBlogTC({ args }))
        setModalActive(false)
        reset() 
    }

    const addUserButtonHandler = () => {
        setModalActive(true)
    }


    return (
        <div className={st.usersMainBlock}>
            <div>
                <h2>Users</h2>
                <div className={st.buttonBlock}>
                    <Button disabled={false} title={'Add User'} onClick={addUserButtonHandler} />
                </div>
                <Modal active={modalActive} setActive={setModalActive} >
                    <div className={st.modalBlock}>
                        <button onClick={() => {setModalActive(false)}} className={st.closeButton}>X</button>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={st.titleInput}>Login 
                                <input placeholder='Login' className={st.inputForm} {...register('login', {
                                    required: 'field is required',
                                    maxLength: { value: 15, message: 'Max Length 15' },
                                })} />
                            </div>
                            <div>{errors?.login && <p>{errors.login.message || 'Error'}</p>}</div>
                            <div className={st.titleInput}>Password 
                                <input placeholder='password' type='password' className={st.inputForm} {...register('password', {
                                    required: 'field is required',
                                    maxLength: { value: 15, message: 'Max Length 15' },
                                })} />
                            </div>
                            <div>{errors.password && <p>{errors.password.message || 'Error'}</p>}</div>
                            <div className={st.titleInput}>Email
                                <input placeholder='email' className={st.inputForm} {...register('email', {
                                    required: 'field is required',
                                    maxLength: { value: 15, message: 'Max Length 15' },
                                })} />
                            </div>
                            <div>{errors.email && <p>{errors.email.message || 'Error'}</p>}</div>
                            <input className={st.createBlogButton} type="submit" value='Add User' />
                        </form>
                        </div>
                        </Modal>
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
                            return <div className={st.userBlock} key={u.id}>
                                <User user={u} />
                            </div>
                        })
                    }

            </div>
            )
}