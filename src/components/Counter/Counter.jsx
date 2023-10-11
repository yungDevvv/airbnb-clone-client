import React from 'react'
import s from './index.module.scss'

const Counter = ({
    guestCount,
    maxCount,
    count,
    increase,
    decrease,
    min,
    dataAttrValue
}) => {
    return (
        <div className={s.count_container}>
            <button type='button' disabled={count === min && true} onClick={decrease} data-key={dataAttrValue} >
                <i className="lni lni-minus"></i>
            </button>
            <strong>{count}</strong>
            <button type='button' disabled={maxCount && guestCount >= maxCount} onClick={increase} data-key={dataAttrValue}>
                <i className="lni lni-plus"></i>
            </button>
        </div>
    )
}

export default Counter