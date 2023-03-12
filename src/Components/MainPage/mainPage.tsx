import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SaiteBarNav } from '../../Navigation/navlinkSiteBar';
import { Blogs } from '../Blogs/blogs';
import { OneBlogPage } from '../Blogs/OneBlogPage/oneBlogPage';
import { Header } from '../Header/header';
import { Login } from '../Login/loginPage';
import { Posts } from '../Posts/posts';
import { PostPage } from '../Posts/PostsOfBlog/PostPage/postPage';
import { Users } from '../Users/users';
import st from './mainPage.module.css'


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

    return (
        <div className={st.wrapper}>
                <Header />
            <div className={st.mainBlock}>
                <div className={st.child1}>
                <SaiteBarNav />
                </div>
                <div className={st.child2}>
                <Routes>
                <Route path={pathSiteBarEnum.login} element={<Login/>}/>
                <Route path={pathSiteBarEnum.blogs} element={<Blogs/>}/>
                <Route path={pathSiteBarEnum.posts} element={<Posts/>}/>
                <Route path={pathSiteBarEnum.postPage} element={<PostPage/>}/>
                <Route path={pathSiteBarEnum.oneBlogPage} element={<OneBlogPage/>}/>
                <Route path={pathSiteBarEnum.users} element={<Users/>}/>
                </Routes>
                </div>
            </div>
            
        </div>
    )
}