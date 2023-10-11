import React, { useEffect, useState } from 'react'
import s from './reservationcard.module.scss'
import CalendarModal from '../Modals/CalendarModal/CalendarModal';
import GuestDropdown from '../Dropdown/GuestDropdown';
import { shallow } from 'zustand/shallow';
import { useSearchStore } from '../../store/SearchStore';
import { Link, useNavigate } from 'react-router-dom';
import { useHouseStore } from '../../store/HouseStore';


const ReservationCard = () => {
    const [showModal, setShowModal] = useState(false)
    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false)

    const { adults, childrens, inflants, dates } = useSearchStore((state) => ({
        adults: state.guests.adults.count,
        childrens: state.guests.childrens.count,
        inflants: state.guests.inflants.count,
        dates: state.dates
    }), shallow)

    const { short_description, price, house_type, houseID, images, unavalableDates } = useHouseStore(state => ({
        short_description: state.currentHouse.short_description,
        price: state.currentHouse.price,
        house_type: state.currentHouse.house_type,
        houseID: state.currentHouse._id,
        images: state.currentHouse.images,
        unavalableDates: state.currentHouse.unavalableDates
    }), shallow);

    const { clearDates, dateState, getDates } = useSearchStore(state => ({
        clearDates: state.clearDates,
        dateState: state.dateState,
        getDates: state.getDates
    }), shallow)

    const navigate = useNavigate();

    const handleReserve = () => {
        if (dates.length < 1) {
            setShowModal(true);
            return;
        };
        navigate("/reservation/" + houseID, {
            state: {
                id: houseID,
                dates: dates,
                img: images,
                guests: adults + childrens + inflants,
                house_type: house_type,
                price: price,
                short_description: short_description
            }
        });
    }

    useEffect(() => {
        if (dateState.startDate && dateState.endDate) {
            getDates(dateState.startDate, dateState.endDate);
        }
    }, [dateState.startDate, dateState.endDate])

    useEffect(() => {
        if(dates && unavalableDates) {
            dates.forEach((date) => {
                if(!unavalableDates.indexOf(date.toISOString())) {
                    clearDates();
                    alert('We found that you choosed dates are already reservated, pick another dates, please!');
                    return;
                }
            })
        }
    }, [unavalableDates])
    return (
        <div className={s.card}>
            <div className={s.flex_jc}>
                <span>
                    <strong>149 € </strong>
                    per night
                </span>
                <span onClick={() => console.log(dates)}>
                    <i className="lni lni-star-fill"></i> <span>4.5</span> 
                </span>
            </div>
            <div className={s.inputs}>
                <div className={`flex ${s.dates}`}>
                    <button onClick={() => setShowModal(true)}>
                        <div>
                            <span>CHECK-IN</span>
                            <span>{dateState.startDate ? new Date(dateState.startDate).toLocaleDateString("en-GB") : 'Select date'}</span>
                        </div>
                        <div>
                            <span>CHECKOUT</span>
                            <span>{dateState.endDate ? new Date(dateState.endDate).toLocaleDateString("en-GB") : 'Select date'}</span>
                        </div>
                    </button>
                    <button onClick={() => setShowGuestsDropdown(state => !state)}>
                        <div className={s.guests}>
                            <div>
                                <span>Guests</span>
                                <span>{adults + childrens + inflants} guest</span>
                            </div>
                            <i className={`lni lni-chevron-down ${showGuestsDropdown && s.true}`}></i>
                        </div>

                    </button>
                </div>
                {showGuestsDropdown &&
                    <GuestDropdown close={setShowGuestsDropdown} />
                }
            </div>
            <button className='button pink' onClick={handleReserve}>
                Reserve
            </button>
            <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>You won't be charged yet</p>
            <div className={s.total}>
                <div className={s.flex_jc}>
                    <span>€ {price} x {dates.length - 1} nights</span>
                    <span>790€</span>
                </div>
                <div className={`${s.flex_jc} ${s.total_price}`}>
                    <strong>Total</strong>
                    <strong>€ 890</strong>
                </div>
            </div>
            {showModal &&
                <CalendarModal
                    setShowModal={setShowModal}
                    dateState={dateState}
                    focusedInput={dateState.focusedInput}
                    clearDates={clearDates}
                    unavailableDates={unavalableDates}
                />
            }
        </div>
    )
}

export default ReservationCard