import React from 'react';
import { NavLink } from 'react-router-dom';

export enum pathSiteBarEnum {
    blogs = '/',
    posts = '/posts',
}



export const SaiteBarNav = () => {
    return (
        <nav>
            <div style={{ marginLeft: 50 }}>
                <div>
                    <NavLink style={{ textDecoration: 'none' }} to={pathSiteBarEnum.blogs}>
                        <h4> Blogs</h4>
                    </NavLink>
                </div>
                <div>
                    <NavLink style={{ textDecoration: 'none' }} to={pathSiteBarEnum.posts}>
                        <h4> Posts</h4>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}