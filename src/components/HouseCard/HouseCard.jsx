import React from 'react';
import s from './card.module.scss';
import { Link } from 'react-router-dom';

function HouseCard({ data }) {
    return (
        <div className={s.card}>
            <Link target="_blank" rel="noopener noreferrer" to={'/house/' + data._id}>
                <div className={s.image}>
                    <img src={data.images[0]} alt="house-img" />
                </div>
                <div className={s.flex}>
                    <h3>
                        {data.title.charAt(0).toUpperCase() + data.title.slice(1)},&nbsp;
                        {data.country.charAt(0).toUpperCase() + data.country.slice(1)}
                    </h3>
                    <div className={s.rating}>
                        <i className="lni lni-star-fill"></i>
                        <span>5.0</span>
                    </div>
                </div>
                <p className={s.description}>{data.short_description}</p>
                <div className={s.price}><strong>{data.price}€</strong> / night</div>
            </Link>
        </div>
    )
}

export default HouseCard;
