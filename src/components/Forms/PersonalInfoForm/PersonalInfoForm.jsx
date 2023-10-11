import React from 'react'
import s from './index.module.scss'
import { useUserStore } from '../../../store/UserStore'
import { useState } from 'react';
import ErrorText from '../../UI/Errors/ErrorText'
import ButtonLoader from '../../UI/ButtonLoader/ButtonLoader'

const PersonalInfoForm = () => {
    const { user, updateUserError, loading } = useUserStore(state => ({
        user: state.user,
        updateUserError: state.errors.updateUserError,
        loading: state.loading
    }));

    const [updateSuccess, setUpdateSuccess] = useState(false);

    const [formInputs, setFormInputs] = useState({
        legal_name: {
            label: "Legal name",
            inputs: [
                {
                    name: "first_name",
                    placeholder: "Fist name",
                    value: user.first_name || '',
                    type: "text"
                },
                {
                    name: "last_name",
                    placeholder: "Last name",
                    value: user.last_name || '',
                    type: "text"
                }
            ]
        },
        email: {
            label: "Email",
            state: user.email || 'Not provided',
            inputs: [
                {
                    name: "email",
                    placeholder: "Email",
                    value: user.email || '',
                    type: "text"
                }
            ]
        }
    })
    const updateUser = useUserStore(state => state.updateUser)
    const inputChange = (e, input, item, key) => {
        let newValue = e.target.value;
        setFormInputs({
            ...formInputs,
            [key]: {
                ...formInputs[key],
                inputs: formInputs[key].inputs.map(inp => {
                    if (inp.name === input.name) return {
                        ...inp,
                        value: newValue
                    }
                    return inp
                })
            }
        })
    }
    const formHandler = async (e) => {
        e.preventDefault();

        const key = e.target.dataset.key;
        const data = {};

        for (let i = 0; i < formInputs[key].inputs.length; i++) {
            const objkey = formInputs[key].inputs[i].name;
            const value = formInputs[key].inputs[i].value;

            data[objkey] = value;
        }
        const response = await updateUser(user._id, data);
        if (response) setUpdateSuccess(true);
    }
    return (
        <div className={s.body}>
            <ErrorText type="p" error={updateUserError} />
            <p style={{ color: 'green' }}>
                {
                    updateSuccess && 'Your information updated succefuly'
                }
            </p>
            <div className="flex">
                {
                    Object.entries(formInputs).map(([key, item]) => (
                        <div key={key} className={s.row_element}>
                            <div className={s.element_header}>
                                <h3>{item.label}</h3>
                            </div>
                            <form onSubmit={formHandler} data-key={key}>
                                {item.inputs && item.inputs.map(input => <input
                                    className='input'
                                    key={input.name}
                                    name={input.name}
                                    type={input.type}
                                    value={input.value}
                                    onChange={(e) => inputChange(e, input, item, key)}
                                />)}
                                <button className='button black'>
                                    {loading
                                        ? <ButtonLoader />
                                        : 'Save'
                                    }
                                </button>
                            </form>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PersonalInfoForm