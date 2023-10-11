import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useHouseStore } from '../store/HouseStore';
import PageLoader from '../components/UI/PageLoader/PageLoader';
import ButtonLoader from '../components/UI/ButtonLoader/ButtonLoader'
import ErrorText from '../components/UI/Errors/ErrorText';

const ReservationPage = () => {
    const [formData, setFormData] = useState({
        address: '',
        apt: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: '',
        email: ''
    })
    const navigate = useNavigate();

    const { id, dates, guests, price, short_description, house_type, img } = useLocation().state;

    const { reserveHouse, pageLoading, loading, actionError } = useHouseStore(state => ({ 
        reserveHouse: state.reserveHouse, 
        loading: state.loading, 
        pageLoading: state.pageLoading,
        actionError: state.actionError
    }));

    const checkAvailability = useHouseStore(state => state.checkAvailability);

    const [isAvailable, setIsAvalable] = useState(true);

    const handleSubmit = async () => {
        let res = await checkAvailability(id, dates);
        setIsAvalable(res);
        if(isAvailable) {
            const res = await reserveHouse(id, dates);
            if(res) {
                alert('Reservation done! You will be redirected...');
                setTimeout(() => {
                    navigate('../../account/my-trips');
                }, 1000)
            }
        }
    }
    useEffect(() => {
        const fetchCheck = async () => {
            let res = await checkAvailability(id, dates);
            setIsAvalable(res);
        }
        fetchCheck();
    }, [])
    return (
        <section className='reservation-page'>
            {pageLoading
                ? <PageLoader />
                : (
                    <div className='wrap'>
                        <h1>Confirm and pay</h1>
                        <div className="flex">
                            <div className="left-side">
                                <h2>Your trip</h2>
                                <div className="section first">
                                    <div className='row'>
                                        <h3>Dates</h3>
                                        <span>{new Date(dates[0]).toLocaleDateString("en-GB")} - {new Date(dates[dates.length - 1]).toLocaleDateString("en-GB")}</span>
                                    </div>
                                    <div className='row'>
                                        <h3>Guests</h3>
                                        <span>{guests} guest</span>
                                    </div>
                                </div>
                                {isAvailable
                                    ? (
                                        <>
                                            <div className="section">
                                                <h2>Billing address <span>( not actually required )</span></h2>
                                                <input type="text" placeholder='Street address' value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                                                <input type="text" placeholder='Apt or suite number' value={formData.apt} onChange={(e) => setFormData({ ...formData, apt: e.target.value })} />
                                                <input type="text" placeholder='City' value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                                <div className="flex multiple-inputs">
                                                    <input type="text" placeholder='State' value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                                                    <input type="number" maxLength={7} placeholder='ZIP code' value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} />
                                                </div>
                                                <input type="text" placeholder='Country' value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                                            </div>
                                            <div className="section">
                                                <h2>Contacts <span>if other than profile</span> ( not actually required )</h2>
                                                <input type="text" placeholder='Phone number' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                                <input type="text" placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                            </div>
                                            <div className="section">
                                                <h2>Ground rules</h2>
                                                <p>We ask every guest to remember a few simple things about what makes a great guest.</p>
                                                <ul>
                                                    <li>Follow the house rules</li>
                                                    <li>Treat your Host’s home like your own</li>
                                                </ul>
                                            </div>
                                            <div className="section last">
                                                <button className='button pink' onClick={() => handleSubmit()}>{loading ? <ButtonLoader /> : 'Confirm and pay'}</button>
                                            </div>
                                        </>
                                    )
                                    : (
                                        <div className="section">
                                            <ErrorText type="p" error="Oops, it looks like the apartment has already been booked or it’s a bad time!" />
                                            <p>Try change the dates!</p>
                                        </div>
                                    )

                                }
                            </div>
                            <div className="right-side">
                                <div className="reserv-house">
                                    <div className="reserv-house-body">
                                        <div className="section flex">
                                            <div className='has-images'>
                                                <img src={img[0]} alt="" />
                                            </div>
                                            <div className="has-info">
                                                <span>{house_type}</span>
                                                <p>{short_description}</p>
                                            </div>
                                        </div>
                                        <div className="section">
                                            <h2>Price details</h2>
                                            <div className="row flex">
                                                <span>€ {price} x {dates.length - 1} nights</span>
                                                <span>€ {price * (dates.length - 1)}</span>
                                            </div>
                                        </div>
                                        <div className="section">
                                            <div className="row flex">
                                                <strong>Total (EUR)</strong>
                                                <strong>€ {price * (dates.length - 1)}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                {actionError &&
                                    <ErrorText type="p" error={actionError} />        
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default ReservationPage