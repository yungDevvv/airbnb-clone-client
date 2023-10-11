import React, { useEffect, useState } from 'react'
import s from './index.module.scss'
import Datepicker from '../Datepicker/Datepicker'
import GuestDropdown from '../Dropdown/GuestDropdown'
import { useSearchStore } from '../../store/SearchStore'
import { shallow } from 'zustand/shallow'
import SearchButton from '../UI/SearchButton/SearchButton'


const SearchBar = ({ open, handleSearch }) => {
    const { adults, childrens, inflants, country, dateState } = useSearchStore((state) => ({
        adults: state.guests.adults.count,
        childrens: state.guests.childrens.count,
        inflants: state.guests.inflants.count,
        country: state.searchParams.country,
        dateState: state.dateState
    }), shallow)

    const updateSearch = useSearchStore((state) => state.updateSearch);
    const getDates = useSearchStore((state) => state.getDates)

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGuests, setShowGuests] = useState(false);
    const [showCountries, setShowCountries] = useState(false);

    const handleOpen = (callback) => {
        setShowDatePicker(false);
        setShowGuests(false);
        setShowCountries(false);
        callback(true);
    }
   
    useEffect(() => {
        if (dateState.startDate && dateState.endDate) {
            getDates(dateState.startDate, dateState.endDate);
        }
    }, [dateState.startDate, dateState.endDate])
    return (
        <div style={open ? { opacity: 1, padding: '15px 0', visibility: 'visible' } : { opacity: 0, padding: 0, visibility: 'hidden' }} className={s.bar}>
            <div className={s.barBody}>
                <button type="button" className={`${s.button} ${showCountries ? s.active : ''}`} onClick={() => handleOpen(setShowCountries)}>
                    <strong>Where</strong>
                    <span className='description-text'>{country && country !== '0' ? country.charAt(0).toUpperCase() + country.slice(1) : 'Anywhere'} </span>
                </button>
                <button type="button" className={`${s.button} ${dateState.focusedInput === 'startDate' && !dateState.endDate && showDatePicker ? s.active : ''}`} onClick={() => handleOpen(setShowDatePicker)}>
                    <strong>Check-in</strong>
                    <span className='description-text'>{dateState.startDate ? new Date(dateState.startDate).toLocaleDateString("en-GB") : 'Add dates'}</span>
                </button>
                <button type="button" className={`${s.button} ${dateState.focusedInput === 'startDate' || dateState.endDate ? '' : s.active}`} onClick={() => handleOpen(setShowDatePicker)}>
                    <strong>Check-out</strong>
                    <span className='description-text'>{dateState.endDate ? new Date(dateState.endDate).toLocaleDateString("en-GB") : 'Add dates'}</span>
                </button>
                <button type="button" className={`${s.button} ${showGuests ? s.active : ''}`} onClick={() => handleOpen(setShowGuests)}>
                    <strong>Who</strong>
                    <span className='description-text'>{(adults + childrens + inflants) > 1 ? `${adults + childrens + inflants} guests` : 'Add guests'}</span>
                </button>
                <div className={s.searchButton}>
                    <SearchButton callback={handleSearch} style={{ padding: '10px' }} />
                </div>
            </div>
            {showDatePicker &&
                <div className={`${s.datePicker} ${s.modal}`}>
                    <Datepicker />
                    <button className="button underline" onClick={() => setShowDatePicker(false)}>Close</button>
                </div>
            }
            {showGuests &&
                <div className={`${s.guestsModal} ${s.modal}`}>
                    <GuestDropdown close={setShowGuests} />
                </div>
            }
            {showCountries &&
                <div className={`${s.countryModal} ${s.modal}`}>
                    <label htmlFor="finland">
                        <button type="button" value="finland" className={country === 'finland' ? s.active : ''} onClick={(e) => updateSearch({ country: e.target.value })}>Finland</button>
                    </label>
                    <label htmlFor="german">
                        <button type="button" value="german" className={country === 'german' ? s.active : ''} onClick={(e) => updateSearch({ country: e.target.value })}>German</button>
                    </label>
                    <label htmlFor="indonesia">
                        <button type="button" value="indonesia" className={country === 'indonesia' ? s.active : ''} onClick={(e) => updateSearch({ country: e.target.value })}>Indonesia</button>
                    </label>
                    <label htmlFor="anywhere">
                        <button type="button" value={0} className={country === 0 ? s.active : ''} onClick={(e) => updateSearch({ country: e.target.value })}>Anywhere</button>
                    </label>
                    <button className="button underline" onClick={() => setShowCountries(false)}>Close</button>
                </div>
            }
        </div>
    )
}

export default SearchBar


