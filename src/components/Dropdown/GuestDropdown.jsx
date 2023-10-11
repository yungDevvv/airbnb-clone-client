import React from 'react'
import s from './index.module.scss'
import Counter from '../Counter/Counter';
import { useHouseStore } from '../../store/HouseStore';
import { useSearchStore } from '../../store/SearchStore';


const GuestDropdown = ({ close }) => {
    const maxGuests = useHouseStore((state) => state.currentHouse.guests);
    
    const {guests, updateGuests} = useSearchStore((state) => ({
        guests: state.guests,
        updateGuests: state.updateGuests,
    }));

    const increaseCounter = (e) => {
        const target = e.target.parentElement;
        const key = target.dataset.key;
        updateGuests({
            ...guests,
            [key]: {
                ...guests[key],
                count: guests[key].count += 1
            }
        })
    }
    const decreaseCounter = (e) => {
        const target = e.target.parentElement;
        const key = target.dataset.key;
        updateGuests({
            ...guests,
            [key]: {
                ...guests[key],
                count: guests[key].count -= 1
            }
        })
    }
    return (
        <div className={s.dropdown}>
            <div className={s.body}>
                {Object.entries(guests).map(([key, item]) => {
                    return (
                        <div key={item.label + item.description} className={s.item}>
                            <div className={s.info_container}>
                                <strong>{item.label}</strong>
                                <span>{item.description}</span>
                            </div>
                            <Counter guestCount={guests.adults.count + guests.childrens.count + guests.inflants.count} maxCount={maxGuests} count={item.count} increase={increaseCounter} decrease={decreaseCounter} min={item.min} max={maxGuests} dataAttrValue={key} />
                        </div>
                    )
                })
                }
                <button className="button underline" onClick={() => close(false)}>Close</button>
            </div>
        </div>
    )
}

export default GuestDropdown