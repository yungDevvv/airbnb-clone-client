import React from 'react'
import s from '../Checkbox/index.module.scss'

const Checkbox = ({ title, checked, onChange}) => {
    return (
        <label className={s.container}>
            <input type="checkbox" onChange={onChange} defaultChecked={checked} />
            <div className={s.checkmark}></div>
            {title &&
                <span className={s.title}>{title}</span>
            }
        </label>
    )
}

export default Checkbox