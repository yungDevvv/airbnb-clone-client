import React, { useEffect } from 'react'
import Overlay from '../UI/Overlay/Overlay'
import s from './index.module.scss'
import image from '../../img/e25a9b25-fa98-4160-bfd1-039287bf38b6.webp'

const SimpleLightbox = ({galleryState, data, close }) => {
    useEffect(() => {
        if(galleryState) {
            document.body.style = 'overflow: hidden'
        } else {
            document.body.style = 'overflow: auto'
        }
    }, [galleryState])
    return (
        <div className={galleryState ? `${s.modal} slide-in` : `${s.modal} slide-out`}>
            <div className={s.modal_header}>
                <div onClick={() => close(false)}>
                    <i className="lni lni-chevron-left"></i>
                </div>
            </div>
            <div className={s.body}>
                {data &&
                    data.map(src => (
                        <div key={src} className={s.image_container}>
                            <img src={src} alt="" />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default SimpleLightbox