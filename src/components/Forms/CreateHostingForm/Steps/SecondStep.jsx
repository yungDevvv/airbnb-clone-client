import React from 'react'
import s from '../index.module.scss'
import { houses_data } from '../../../../utils/getHouses'
import { useHouseFormStore } from '../../../../store/CreateHouseForm'
import { shallow } from 'zustand/shallow'
import ErrorText from '../../../UI/Errors/ErrorText'

const SecondStep = ({formError}) => {
    const { house_type } = useHouseFormStore((state) => ({ 
        house_type: state.formData.house_type, 
    }), shallow);

    const {updateFields, editingHouse} = useHouseFormStore(state => ({
        updateFields: state.updateFields,
        editingHouse: state.editingHouse
    }))

    const handleCheckbox = (e) => {
        updateFields({ house_type: null })
        updateFields({ house_type: e.currentTarget.value })
    }
    return (
        <section className='fade-in'>
            <h1>Which of these best describes your place?</h1>
            <ErrorText type="p" error={formError} />
            <div className={`${s.flex_checkbox} ${s.body}`}>
                {houses_data.map((item, i) => (
                    <button
                        key={i}
                        type="button"
                        role="checkbox"
                        disabled={editingHouse._id ? true : false}
                        aria-checked={house_type === item.name}
                        className={s.checkbox}
                        data-index={i}
                        value={item.name} onClick={handleCheckbox}
                    >
                        <img src={item.icon} alt="" />
                        <h4>{item.label}</h4>
                    </button>
                ))}
            </div>
        </section>
    )
}

export default SecondStep