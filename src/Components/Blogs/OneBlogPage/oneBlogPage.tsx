import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneBlogTС } from '../../../redux/BlogReducer';
import { selectBlogPage } from '../../../redux/selectors/blogs-selectors';
import { useAppDispatch } from '../../../redux/store';
import { pathSiteBarEnum } from '../../MainPage/mainPage';
import st from './oneBlogPage.module.css'




export const OneBlogPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const params = useParams<'id'>();
    const id = params.id

    useEffect(() => {
        id && dispatch(getOneBlogTС({ id }))
    }, [])

    const blogPage = useSelector(selectBlogPage)

    const onClickBackToBlogsHandler = () => {
        navigate(pathSiteBarEnum.blogs)
    }


    return (

        <div>
            <div className={st.backButton} onClick={onClickBackToBlogsHandler}> ← Back to blogs</div>
            <div className={st.picture}>
                <img src="https://postium.ru/wp-content/uploads/2020/03/kak-sdelat-lichnyj-blog-v-instagram-696x331.png" alt="picture" />
            </div>
            <div className={st.block}>
                <div >
                <img className={st.avatar} src="https://freelance.ru/img/portfolio/pics/00/3F/3A/4143866.jpg" alt="ava" />
                </div>
                <div style={{marginLeft: 20}}>
                <div> 
                    <h4> Name: {blogPage.name}</h4>
                </div>
                <div>
                <span>Website:  </span>
                <a href={blogPage.websiteUrl}>{blogPage.websiteUrl}</a>
                <div>
                    <span>Discription:  {blogPage.description}</span>
                </div>
                </div>
                </div>
            </div>

        </div>

    )
}