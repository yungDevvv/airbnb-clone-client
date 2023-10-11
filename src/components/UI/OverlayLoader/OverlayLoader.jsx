import React, { useEffect } from 'react'
import ButtonLoader from '../ButtonLoader/ButtonLoader'
import s from './index.module.scss'

const OverlayLoader = ({ children, loading }) => {
    useEffect(() => {
        loading ? document.body.style = 'overflow: hidden' : document.body.style = 'overflow: auto'
        return () => document.body.style = 'overflow: auto'
    }, [loading])
    return (
        <>
            {loading &&
                <div className={s.loaderContainer}>
                    <ButtonLoader />
                </div>
            }
            {children}
        </>
    )
}

export default OverlayLoader