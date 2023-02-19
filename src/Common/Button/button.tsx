import React from 'react';

type ButtonPropsType = {
    disabled: boolean
    title: string
    onClick: () => void
}

export const Button = ({disabled, title, onClick, ...props}: ButtonPropsType) => {

return(
    <>
    <button disabled={disabled} style={{marginBottom: 25}} onClick={onClick}>{title}</button>
    </>
)

}