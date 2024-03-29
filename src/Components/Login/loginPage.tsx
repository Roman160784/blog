import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginisationTC } from '../../redux/LoginReducer';
import { selectLogin } from '../../redux/selectors/login-selectors';
import { useAppDispatch } from '../../redux/store';
import { pathSiteBarEnum } from '../MainPage/mainPage';
import st from './loginPage.module.css'


export const Login = () => {

    const dispatch = useAppDispatch()
    const isLogin = useSelector(selectLogin)


    const {
        register, handleSubmit, formState: { errors }, formState, reset } = useForm({
            mode: 'onBlur',
            defaultValues: {
                loginOrEmail: '',
                password: '',
            }
        });

    const onSubmit = (args: any) => {
    dispatch(loginisationTC({args}))

    }

    
    if (isLogin === true) return <Navigate to={pathSiteBarEnum.blogs}/>

    return (
        <div className={st.blockLogin}>
            <form onSubmit={handleSubmit(onSubmit)} className={st.loginForm}>
                <h1>Login</h1>
                <div>
                    <input type='text' className={st.inputLogin} placeholder={'Email or Login'}
                        {...register('loginOrEmail', {
                            required: 'field is required',
                            maxLength: { value: 10, message: 'Max Length 10' },
                            minLength: { value: 3, message: 'Min Length 3' },
                        })}
                    />
                    <div>{'Roma160784'}</div>
                </div>
                <div>
                    <input type='text' className={st.inputLogin} placeholder={'Password'}
                        {...register('password', {
                            required: 'field is required',
                            maxLength: { value: 20, message: 'Max Length 20' },
                            minLength: { value: 6, message: 'Min Length 6' },
                        })}
                    />
                     <div>{'160784'}</div>
                </div>
                <input className={st.buttonLogin} type="submit" value='Login' />
            </form>
        </div>
    )
}