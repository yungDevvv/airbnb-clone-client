import React, { useEffect, useState } from 'react';
import ErrorText from '../../UI/Errors/ErrorText';
import CloseButton from '../../UI/CloseButton/CloseButton';
import ModalContainer from '../ModalContainer';
import { useUserStore } from '../../../store/UserStore';
import ButtonLoader from '../../UI/ButtonLoader/ButtonLoader';
import { validateEmail } from '../../../utils/validations';


const RegisterModal = ({ trigger, setShowRegisterModal }) => {
    const { loading, registerError, registerUser, updateError, } = useUserStore(state => ({
        registerUser: state.registerUser,
        registerError: state.errors.registerError,
        loading: state.loading,
        updateError: state.updateError
    }))

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateEmail(formData.email)) {
            let res = await registerUser(formData);
            if (res !== undefined) setShowRegisterModal(false);
        } else {
            updateError({ registerError: 'Not valid email' });
        }

    }

    useEffect(() => {
        updateError({ registerError: null });
    }, [trigger])
    return (
        <ModalContainer trigger={trigger}>
            <div className="modal entry-modal fade-in fast">
                <div className="modal-header">
                    <CloseButton close={setShowRegisterModal} />
                    <h2>Sign up</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <h3>Welcome to Airbnb</h3>
                        {registerError &&
                            <ErrorText type="p" error={registerError} />
                        }
                        <input type="text" className='input' placeholder='Fist Name' value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} required />
                        <input type="text" className='input' placeholder='Last Name' value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} required />
                        <input type="text" className='input' placeholder='Email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <input type="password" className='input' placeholder='Password' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <div className="modal-footer">
                        <button className="button pink">
                            {loading
                                ? <ButtonLoader />
                                : 'Sign up'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </ModalContainer>
    )
}

export default RegisterModal;