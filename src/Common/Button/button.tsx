import React from 'react';

type ButtonPropsType = {
    title: string
    onClick: () => void
}

export const Button = ({title, onClick, ...props}: ButtonPropsType) => {

return(
    <>
    <button style={{marginBottom: 25}} onClick={onClick}>{title}</button>
    </>
)

}