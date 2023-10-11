import React from 'react'
import s from '../index.module.scss'
import { useHouseFormStore } from '../../../../store/CreateHouseForm'
import { shallow } from 'zustand/shallow'

const ThirdStep = () => {
    const { formData } = useHouseFormStore((state) => ({ formData: state.formData }), shallow)
    const updateFields = useHouseFormStore((state) => state.updateFields)
    return (
        <section className='fade-in'>
            <h1>Let's give your house title and description</h1>
            <p className='description-text'>Short titles work best. Have fun with it—you can always change it later. You can also write full description of your place, it'll show on page</p>
            <div className={`${s.fields} ${s.body}`}>
                <label>
                    <span>
                        Give your house a title
                    </span>
                    <input type="text" className='input' value={formData.title} onChange={(e) => updateFields({ title: e.target.value })} required />
                </label>
                <label>
                    <span>
                        Describe your house for short title
                    </span>
                    <input type="text" className='input' value={formData.short_description} onChange={(e) => updateFields({ short_description: e.target.value })} required />
                </label>
                <label>
                    <span>
                        Give your house full description
                    </span>
                    <textarea className='input' value={formData.description} onChange={(e) => updateFields({ description: e.target.value })} required />
                </label>
            </div>
        </section>
    )
}

export default ThirdStep