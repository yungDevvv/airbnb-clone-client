import React from 'react'
import s from '../index.module.scss'
import { useHouseFormStore } from '../../../../store/CreateHouseForm'
import {shallow} from 'zustand/shallow'

const FirstStep = () => {
    const {country, address, city, state, zip} = useHouseFormStore(state => ({
        country: state.formData.country,
        address: state.formData.address,
        city: state.formData.city,
        state: state.formData.state,
        zip: state.formData.zip,
    }), shallow);
    const updateFields = useHouseFormStore((state) => state.updateFields);
    return (
        <section className={`fade-in ${s.fields}`}>
            <h1>Where's your place located?</h1>
            <p className='description-text'>Your address is only shared with guests after they’ve made a reservation.</p>
            <div className={s.body}>
                <label className={s.field}>
                    <span>Country</span>
                    <select className='input' name="" id="" value={country} onChange={(e) => updateFields({ country: e.target.value })} required >
                        <option value="finland" defaultValue={true}>Finland</option>
                        <option value="indonesia">Indonesia</option>
                        <option value="german">German</option>
                    </select>
                </label>
                <label>
                    <span>Address</span>
                    <input type="text" className='input' value={address} onChange={(e) => updateFields({ address: e.target.value })} required />
                </label>
                <label>
                    <span>City</span>
                    <input type="text" className='input' value={city} onChange={(e) => updateFields({ city: e.target.value })} required />
                </label>
                <label>
                    <span>State / Province / Territory</span>
                    <input type="text" className='input' value={state} onChange={(e) => updateFields({ state: e.target.value })} required />
                </label>
                <label>
                    <span>Postal code</span>
                    <input maxLength={10} type="text" className='input' value={zip} onChange={(e) => updateFields({ zip: e.target.value })} required />
                </label>
            </div>
        </section>
    )
}

export default FirstStep