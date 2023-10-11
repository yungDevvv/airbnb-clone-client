import React from 'react'
import s from '../index.module.scss'
import Counter from '../../../Counter/Counter'
import { useHouseFormStore } from '../../../../store/CreateHouseForm'
import { shallow } from 'zustand/shallow'

const FifthStep = () => {
    const {guests, bedroom, beds, bathrooms} = useHouseFormStore(state => ({
        guests: state.formData.guests,
        bedroom: state.formData.bedroom,
        beds: state.formData.beds,
        bathrooms: state.formData.bathrooms
    }), shallow);
    
    const MemoizedCounter = React.memo(Counter);
    const updateFields = useHouseFormStore((state) => state.updateFields);
    return (
        <section className='fade-in'>
            <h1>Share some basics about your place</h1>
            <p className='description-text'>You'll add more details later, like bed types.</p>
            <div className={s.body}>
                <div className={s.row}>
                    <span>Guests</span>
                    <MemoizedCounter count={guests} min={1} increase={() => updateFields({ guests: guests + 1 })} decrease={() => updateFields({ guests: guests - 1 })} />
                </div>
                <div className={s.row}>
                    <span>Bedrooms</span>
                    <MemoizedCounter count={bedroom} min={1} increase={() => updateFields({ bedroom: bedroom + 1 })} decrease={() => updateFields({ bedroom: bedroom - 1 })} />
                </div>
                <div className={s.row}>
                    <span>Beds <span className='description-text'>( also sofa-bed)</span></span>
                    <MemoizedCounter count={beds} min={1} increase={() => updateFields({ beds: beds + 1 })} decrease={() => updateFields({ beds: beds - 1 })} />
                </div>
                <div className={s.row}>
                    <span>Bathrooms</span>
                    <MemoizedCounter count={bathrooms} min={1} increase={() => updateFields({ bathrooms: bathrooms + 1 })} decrease={() => updateFields({ bathrooms: bathrooms - 1 })} />
                </div>

            </div>
        </section>
    )
}

export default FifthStep