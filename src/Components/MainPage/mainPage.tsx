import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SaiteBarNav } from '../../Navigation/navlinkSiteBar';
import { Blogs } from '../Blogs/blogs';
import { Header } from '../Header/header';
import { Posts } from '../Posts/posts';
import st from './mainPage.module.css'


export enum pathSiteBarEnum {
    main = '/',
    blogs = '/',
    posts = '/posts',
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
                <Route path={pathSiteBarEnum.blogs} element={<Blogs/>}/>
                <Route path={pathSiteBarEnum.posts} element={<Posts/>}/>
                </Routes>
                </div>
            </div>
            
        </div>
    )
}