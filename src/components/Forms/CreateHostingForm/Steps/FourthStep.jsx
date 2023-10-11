import React from 'react'
import { comforts_data } from '../../../../utils/getComforts'
import s from '../index.module.scss'
import { useHouseFormStore } from '../../../../store/CreateHouseForm'
import { shallow } from 'zustand/shallow'
import { v4 as uuid } from 'uuid';

const FourthStep = () => {
    const { comforts } = useHouseFormStore((state) => ({ comforts: state.formData.comforts }), shallow);
    const updateFields = useHouseFormStore((state) => state.updateFields);

    const handleCheckbox = (e) => {
        const currentAriaChecked = (e.currentTarget.getAttribute("aria-checked") === 'true');
        e.currentTarget.setAttribute("aria-checked", !currentAriaChecked);
        if (currentAriaChecked) {
            updateFields({ comforts: comforts.filter(comf => comf !== e.currentTarget.value) })
        } else {
            updateFields({ comforts: [...comforts, e.currentTarget.value] })
        }
    }
    return (
        <section className='fade-in'>
            <h1>Tell guests what your place has to offer</h1>
            <p className='description-text'>Try to choose all the things that are in your house. It will be easier for people to search for your place</p>
            <div style={{padding: '20px 0'}}>
                {comforts_data.map((category, i) => (
                    <div key={uuid()}>
                        <h3>
                            {category.category_title}
                        </h3>
                        <div className={`${s.flex_checkbox} ${s.body}`}>
                            {
                                category.items.map(item => (
                                    <button key={uuid()} type="button" role="checkbox" aria-checked={comforts.find(elem => elem === item.name) ? true : false} className={s.checkbox} data-index={i} value={item.name} onClick={handleCheckbox}>
                                        <img src={item.icon} alt="" />
                                        <h4>{item.title}</h4>
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FourthStep