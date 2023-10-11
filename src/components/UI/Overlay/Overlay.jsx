import React from 'react'
import s from './overlay.module.scss'

const Overlay = ({ children }) => {
    return (
        <div className={s.overlay}>
            {children}
        </div>
    )
}

export default Overlay;