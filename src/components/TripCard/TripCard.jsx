import React from 'react'
import s from './index.module.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useHouseStore } from '../../store/HouseStore'
import { useState } from 'react'
import ButtonLoader from '../UI/ButtonLoader/ButtonLoader'

const TripCard = ({ data,  deleteUserReservation}) => {
    const [house, setHouse] = useState(null);    
    const getHouseById = useHouseStore(state => state.getHouseById);
    
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        const fetchHouse = async () => {
            const res = await getHouseById(data.house);
            setHouse(res.data);
        }
        fetchHouse();
    }, [])
    return (
        <div className={s.card}>
            <div className={s.img}>
                <Link to={"../../house/" + data.house}>
                    <strong>Explore</strong>
                    <img src={house && house.images[0]} alt="" />
                </Link>
            </div>
            {house &&
                <div className={s.body}>
                    <strong>{house.title}, {house.country[0].toUpperCase() + house.country.slice(1)}</strong>
                    <p>{house.city}, {house.address}</p>
                    <p>Guests: {data.guests}</p>
                    <strong>Dates: {new Date(data.dates[0]).toLocaleDateString("en-GB")} - {new Date(data.dates[data.dates.length - 1]).toLocaleDateString("en-GB")}</strong>
                    <div className={s.buttons}>
                        {deleteLoading
                            ? <ButtonLoader />
                            : <button className='button underline' onClick={async () => await deleteUserReservation(data._id, setDeleteLoading)}>Delete</button>
                        }                    
                    </div>
                </div>
            }
        </div>
    )
}

export default TripCard