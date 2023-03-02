import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { getUsersTC } from '../../redux/UsersReducer';
import st from './pagenator.module.css'

type PagenatorPropsType = {
    totalCount: number
    pagesCount: number
    page: number
    portionSize?: number,
}


export const Pagenator = ({totalCount=0, pagesCount, page, portionSize=10, ...props} : PagenatorPropsType) => {

    const dispatch = useAppDispatch()
    
    let pageCount = Math.ceil(totalCount/pagesCount)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pageCount / portionSize)
    const [portionNumber, setPortionNumber] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    const onPageChanged = (curentPage: number) => {
            dispatch(getUsersTC({pageNumber: curentPage}))
    }

    return(
           <div className={st.paginatorUsers}>
            {
                portionNumber > 1 &&
                <button className={st.btn} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>{'<'}</button>
            }
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <span className={page === p ? st.selectedPage : st.select}
                                 onClick={() => {onPageChanged(p)}}>{p}</span> })}
            {
                portionCount > portionNumber &&
                <button className={st.btn} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>{'>'}</button>
            }
        </div>
    )
}