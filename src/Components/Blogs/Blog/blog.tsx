import React from 'react';
import st from './blog.module.css'

export const Blog = () => {
    return(
        <div className={st.blogBlock}>
            <div>
                <img className={st.avatar} src="https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg"
                 alt="" />
            </div>
            <div>
                <div>
                <h5>BLA-BLA-BLA</h5>
                </div>
                <div>
                    <span>Website:</span>
                    <a className={st.link} href="https://google.com">  Name</a>
                </div>
                <div className={st.discription}>
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quas soluta iusto ad dolorem quod harum, molestiae omnis. Ex excepturi iste illum reiciendis. Rem pariatur nostrum, dolore praesentium facere nulla?</span>
                </div>
                
            </div>
            <hr />
        </div>
    )
}