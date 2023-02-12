import React from 'react';
import { NavLink } from 'react-router-dom';
import st from './siteBar.module.css'

export enum pathSiteBarEnum {
    blogs = '/',
    posts = '/posts',
}



export const SaiteBarNav = () => {
    return (
        <nav>
            <div className={st.mainBlock}>
                <div>
                    <NavLink className={st.navigation} to={pathSiteBarEnum.blogs}>
                        <h4 className={st.navigation}> Blogs</h4>
                    </NavLink>
                </div>
                <div>
                    <NavLink className={st.navigation} to={pathSiteBarEnum.posts}>
                        <h4 className={st.navigation}> Posts</h4>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}