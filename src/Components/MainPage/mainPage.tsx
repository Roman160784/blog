import React, { useEffect } from 'react';
import { Route, Routes, useActionData } from 'react-router-dom';
import { Preloader } from '../../Common/Preloader/preloader';
import { SaiteBarNav } from '../../Navigation/navlinkSiteBar';
import { selectStatus } from '../../redux/selectors/app-selectors';
import { Blogs } from '../Blogs/blogs';
import { OneBlogPage } from '../Blogs/OneBlogPage/oneBlogPage';
import { Header } from '../Header/header';
import { Login } from '../Login/loginPage';
import { Posts } from '../Posts/posts';
import { PostPage } from '../Posts/PostsOfBlog/PostPage/postPage';
import { Users } from '../Users/users';
import { useSelector } from 'react-redux';
import st from './mainPage.module.css'
import { useAppDispatch } from '../../redux/store';
import { checkAuthTC } from '../../redux/LoginReducer';


export enum pathSiteBarEnum {
    main = '/',
    blogs = '/',
    posts = '/posts',
    users = '/users',
    postsOfBlog = '/postsOfBlog/:blogId',
    postPage = '/postPage/:id',
    oneBlogPage = '/oneBlogPage/:id',
    login = '/login'
}
export const MainPage = () => {
    const dispatch = useAppDispatch()
    const appStatus = useSelector(selectStatus)

    useEffect(() => {
        const accessToken = localStorage.getItem('token')
            dispatch(checkAuthTC({accessToken}))
    }, [])

    return (
        <div className={st.wrapper}>
            <Header />
            <div className={st.mainBlock}>
                <div className={st.child1}>
                    <SaiteBarNav />
                </div>
                <div className={st.child2}>
                    {appStatus === 'loading' && <Preloader />}
                    <Routes>
                        <Route path={pathSiteBarEnum.login} element={<Login />} />
                        <Route path={pathSiteBarEnum.blogs} element={<Blogs />} />
                        <Route path={pathSiteBarEnum.posts} element={<Posts />} />
                        <Route path={pathSiteBarEnum.postPage} element={<PostPage />} />
                        <Route path={pathSiteBarEnum.oneBlogPage} element={<OneBlogPage />} />
                        <Route path={pathSiteBarEnum.users} element={<Users />} />
                    </Routes>
                </div>
            </div>

        </div>
    )
}