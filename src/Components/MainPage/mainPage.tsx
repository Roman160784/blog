import React from 'react';
import { Blogs } from '../Blogs/blogs';
import { Header } from '../Header/header';
import { SiteBar } from '../SiteBar/siteBar';
import st from './mainPage.module.css'

export const MainPage = () => {

    

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className={st.mainBlock}>
                <div className={st.child1}>
                    <SiteBar />
                </div>
                <div className={st.child2}>
                    <Blogs />
                </div>
            </div>

        </div>
    )
}