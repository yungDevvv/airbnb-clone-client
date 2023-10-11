import React, { useEffect, useState } from 'react'
import { useUserStore } from '../../store/UserStore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useReservationStore } from '../../store/ReservationStore';
import ButtonLoader from '../../components/UI/ButtonLoader/ButtonLoader'

const UserHouseInfo = () => {
    const houseID = useParams().id;
    const navigate = useNavigate();

    const {userHouses, deleteUserHouse} = useUserStore((state) => ({
        userHouses: state.userHouses,
        deleteUserHouse: state.deleteUserHouse
    }));
    
    const currentHouse = userHouses.find(house => house._id === houseID);

    const { houseReservations, reservationsCount, loading } = useReservationStore(state => ({
        houseReservations: state.houseReservations,
        reservationsCount: state.reservationsCount,
        loading: state.loading
    }))

    const { getHouseReservations, getCountOfReservations } = useReservationStore(state => ({
        getHouseReservations: state.getHouseReservations,
        getCountOfReservations: state.getCountOfReservations
    }))
    
    const [tabs, setTabs] = useState({
        previos: true,
        current: false,
        upcoming: false
    })

    const handleTab = async (type) => {
        setTabs({
            previos: false,
            current: false,
            upcoming: false
        })
        setTabs(prev => ({ ...prev, [type]: true }));
        await getHouseReservations(houseID, type);
    }

    useEffect(() => {
        const fetchReservationsCount = async () => {
            await getCountOfReservations(houseID);
        }
        fetchReservationsCount();
    }, [])
    return (
        <section className='user-house-info-page'>
            <div className='wrap'>
                <h1>Hello, here you can find all the information about your place</h1>
                <div className="user-house-banner" style={{ backgroundImage: `url(${currentHouse.images[0]})` }} >
                    <div className="has-buttons">
                        <button type="button" className='button red' onClick={async () => await deleteUserHouse(houseID, navigate)}>Delete place</button>
                        <button type="button" className='button white'><Link to={"../../create-hosting/" + houseID} relative='path'>Edit info</Link></button>
                    </div>
                </div>
                <div className='user-house-reservations'>
                    <h2>Your reservations</h2>
                    <div className="has-tabs">
                        <button type="button" disabled={loading || tabs.previos}  className={tabs.previos ? 'active' : ''} onClick={() => handleTab('previos')}>Previos reservations ({reservationsCount.previos})</button>
                        <button type="button" disabled={loading || tabs.current} className={tabs.current ? 'active' : ''} onClick={() => handleTab('current')}>Currently hosting</button>
                        <button type="button" disabled={loading || tabs.upcoming} className={tabs.upcoming ? 'active' : ''} onClick={() => handleTab('upcoming')}>Upcoming ({reservationsCount.upcoming})</button>
                    </div>
                    <div className="has-content">
                        <div>
                            {loading &&
                                <div style={{ padding: '35px 0' }}>
                                    <ButtonLoader />
                                </div>
                            }
                            {houseReservations.length === 0 && !loading &&
                                <>
                                    <div className='has-svg'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: "block", height: "32px", width: "32px", fill: "rgb(34, 34, 34);" }}>
                                            <path d="M24 1a5 5 0 0 1 5 4.78v5.31h-2V6a3 3 0 0 0-2.82-3H8a3 3 0 0 0-3 2.82V26a3 3 0 0 0 2.82 3h5v2H8a5 5 0 0 1-5-4.78V6a5 5 0 0 1 4.78-5H8zm-2 12a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm3.02 3.17 1.36 1.46-6.01 5.64-3.35-3.14 1.36-1.46 1.99 1.86z"></path>
                                        </svg>
                                    </div>
                                    <p>You don’t have any guests staying with you right now.</p>
                                </>
                            }
                            {houseReservations.length !== 0 && !loading &&
                                houseReservations.map((res, i) => (
                                    <div key={i} className='reservation'>
                                        <h3>{res.first_name} {res.last_name}</h3>
                                        <p>{new Date(res.dates[0]).toLocaleDateString("en-GB")} - {new Date(res.dates[res.dates.length - 1]).toLocaleDateString("en-GB")}</p>
                                        <span>Guests: {res.guests}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserHouseInfo;