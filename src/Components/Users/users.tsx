import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button } from '../../Common/Button/button';
import { Modal } from '../../Common/Modal/modal';
import { Pagenator } from '../../Common/Pagenator/pagenator';
import useDebounce from '../../Hooks/useDebounce';
import { selectUsers } from '../../redux/selectors/users-selectors';
import { useAppDispatch } from '../../redux/store';
import { addUserTC, getUsersTC } from '../../redux/UsersReducer';
import { User } from './User/user';
import st from './users.module.css'

export const Users = () => {

    
    const dispatch = useAppDispatch()

    const [search, setSearch] = useState<string>('')
    const [modalActive, setModalActive] = useState<boolean>(false);
    const { items, page, pageSize, pagesCount, totalCount } = useSelector(selectUsers)

    const debonsedSerchValue = useDebounce( search, 700)

    useEffect(() => {
        dispatch(getUsersTC({searchLoginTerm: debonsedSerchValue, searchEmailTerm: debonsedSerchValue }))
    }, [pagesCount, debonsedSerchValue])


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
        dispatch(addUserTC(args ))
        reset() 
        setModalActive(false)  
    }

    const addUserButtonHandler = () => {
        setModalActive(true)
    }

    const searchHandler = (e: ChangeEvent <HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    const sortMinEmail = () => {
        dispatch(getUsersTC({sortDirection: 'asc'}))
    }
    const sortMaxEmail = () => {
        dispatch(getUsersTC({sortDirection: 'desc'}))
    }
    const sortMinDate = () => {
        dispatch(getUsersTC({sortBy: 'createdAt'}))
    }
    const sortMaxDate = () => {
        dispatch(getUsersTC({sortBy: '0'}))
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
                                    maxLength: { value: 10, message: 'Max Length 10' },
                                    minLength: { value: 3, message: 'Min Length 3' },
                                })} />
                            </div>
                            <div>{errors?.login && <p>{errors.login.message || 'Error'}</p>}</div>
                            <div className={st.titleInput}>Password 
                                <input placeholder='password' type='password' className={st.inputForm} {...register('password', {
                                    required: 'field is required',
                                    maxLength: { value: 20, message: 'Max Length 20' },
                                    minLength: { value: 6, message: 'Min Length 6' },
                                })} />
                            </div>
                            <div>{errors.password && <p>{errors.password.message || 'Error'}</p>}</div>
                            <div className={st.titleInput}>Email
                                <input placeholder='email' className={st.inputForm} {...register('email', {
                                    required: 'field is required',
                                })} />
                            </div>
                            <div>{errors.email && <p>{errors.email.message || 'Error'}</p>}</div>
                            <input className={st.createBlogButton} type="submit" value='Add User' />
                        </form>
                        </div>
                        </Modal>
                        <hr />
                        <div className={st.inputBlock}>
                            <input value={search} onChange={searchHandler} 
                            className={st.inputFirst} type="text" placeholder='search Login' />
                            <input value={search} onChange={searchHandler} 
                            className={st.inputSecond} type="text" placeholder='search Email' />
                        </div>
                    </div>
                    <div className={st.titleBlock}>
                        <span className={st.titleLogin}>Login</span>
                        <span className={st.boxArrow}>
                        <i className={`${st.arrow} ${st.arrowUp}`}
                           onClick={sortMinEmail}>
                        </i>
                        <i className={`${st.arrow} ${st.arrowDown}`}
                           onClick={sortMaxEmail}>
                        </i>
                        </span>
                        <span className={st.titleEmail}>Email</span>
                        <span className={st.titleDate}>Created Date </span>
                        <span className={st.boxArrow}>
                        <i className={`${st.arrow} ${st.arrowUp}`}
                           onClick={sortMinDate}>
                        </i>
                        <i className={`${st.arrow} ${st.arrowDown}`}
                           onClick={sortMaxDate}>
                        </i>
                        </span>
                    </div>
                    {
                        items.map(u => {
                            return <div className={st.userBlock} key={u.id}>
                                <User user={u} />
                            </div>
                        })
                    }
                    <div>
                    <Pagenator totalCount={totalCount} pagesCount={pagesCount} page={page} portionSize={pageSize}/>
                    </div>

            </div>
            )
}