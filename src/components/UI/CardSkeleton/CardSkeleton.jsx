import React from 'react'
import s from './index.module.scss'

const CardSkeleton = () => {
  return (
    <div className={s.card}>
        <div className={s.image}></div>
        <div className={s.row}>
            <div className={s.title}></div>
            <div className={s.rating}></div>
        </div>
        <div className={s.description}></div>
        <div className={s.price}></div>
    </div>
  )
}

export default CardSkeleton