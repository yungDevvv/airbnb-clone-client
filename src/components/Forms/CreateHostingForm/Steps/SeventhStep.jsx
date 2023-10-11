import React from 'react'
import s from '../index.module.scss'
import { useHouseFormStore } from '../../../../store/CreateHouseForm'
import { shallow } from 'zustand/shallow'
import ErrorText from '../../../UI/Errors/ErrorText'

const SeventhStep = ({formError}) => {
    const { formData } = useHouseFormStore((state) => ({ formData: state.formData }), shallow)
    const updateFields = useHouseFormStore((state) => state.updateFields)
    return (
        <section className='fade-in'>
            <h1>The last step tell us what price you offer your house per night</h1>
            <ErrorText type="p" error={formError} />
            <div className={s.body}>
                <label>
                    <span>Price per night / €</span>
                    <input type="number" className='input' min={0} value={formData.price} onChange={(e) => updateFields({price: e.target.value})} />
                </label>
            </div>
        </section>
    )
}

export default SeventhStep