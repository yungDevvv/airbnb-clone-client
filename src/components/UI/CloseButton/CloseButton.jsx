import React from 'react'
import s from './index.module.scss'

const CloseButton = ({ close, styles }) => {
    return (
        <button className={s.closeButton} style={styles} type="button" onClick={() => close()}>
            <i className="lni lni-close"></i>
        </button>
    )
}

export default CloseButton