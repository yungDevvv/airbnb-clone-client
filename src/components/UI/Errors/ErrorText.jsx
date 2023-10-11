import React from 'react'
import s from './index.module.scss'

const ErrorText = ({ error, type }) => {
    return (
        <>
            {type === "title" &&
                <h1 style={{ textAlign: 'center', color: 'red' }}>{error}</h1>
            }
            {type === "p" &&
                <p style={{ color: 'red' }}>{error}</p>
            }
        </>
    )
}

export default ErrorText