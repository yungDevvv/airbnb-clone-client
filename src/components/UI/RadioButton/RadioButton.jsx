import React from 'react'
import s from './index.module.scss'

const RadioButton = ({ title, name, value, onChange, checked }) => {
    
    return (
        <div className={s.radioButton}>
            <input type="radio" value={value} checked={checked} name={name} onChange={onChange} />
            <span>{title}</span>
        </div>
    )
}

export default RadioButton;