import React from 'react'
import s from './index.module.scss'
import { Link } from 'react-router-dom'


const HostingCard = ({data}) => {
    return (
        <Link to={data._id} className={s.link}>
            <div className={s.card}>
                <div className={"has-images " + s.has_image}>
                    <img src={data.images[0]} alt="" />
                </div>
                <div className={s.body}>
                    <div className={s.flex}>
                        <h2>{data.title}</h2>
                    </div>
                    <p className={s.address}>{data.address}</p>
                    <strong className={s.country}>{data.city}, {data.country[0].toUpperCase() + data.country.slice(1)}</strong>
                </div>
            </div>
        </Link>
    )
}

export default HostingCard