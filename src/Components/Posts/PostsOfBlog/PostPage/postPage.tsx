import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostTC } from '../../../../redux/PostsReducer';
import { useAppDispatch } from '../../../../redux/store';


export const PostPage = () => {

    const dispatch = useAppDispatch() 

    const params = useParams<'id'>();
    const id = params.id

    useEffect(()=> {
        id && dispatch(getPostTC({id}))
    },[])

    


    return (

        <div>1111</div>
    )
}