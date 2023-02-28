import React from 'react';
import st from './user.module.css'

export const User = () => {
    
    return(
        <div >
            <span className={st.titleLogin}>Login</span>
            <span className={st.titleEmail}>Email</span>
            <span className={st.titleDate}>Created Date</span>
        </div>
        )
}