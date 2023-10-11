import React, { useState, useEffect } from 'react'
import { useUserStore } from '../../../store/UserStore';
import ErrorText from '../../UI/Errors/ErrorText';
import CloseButton from '../../UI/CloseButton/CloseButton';
import ModalContainer from '../ModalContainer';
import ButtonLoader from '../../UI/ButtonLoader/ButtonLoader';


const LoginRegisterModal = ({ trigger, setShowLoginModal }) => {
    const { loading, loginError, loginUser, updateError } = useUserStore(state => ({
        loading: state.loading,
        loginError: state.errors.loginError,
        loginUser: state.loginUser,
        updateError: state.updateError
    }))
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await loginUser(formData);
        if (res !== undefined) {
            setShowLoginModal(false)
        }
    }
    useEffect(() => {
        
        updateError({loginError: null});
    }, [trigger])
    return (
        <ModalContainer trigger={trigger}>
            <div className="modal entry-modal fade-in fast">
                <div className="modal-header">
                    <CloseButton close={setShowLoginModal} />
                    <h2>Log in</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <h3>Welcome to Airbnb</h3>
                        {loginError &&
                            <ErrorText type="p" error={loginError} />
                        }
                        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} type="text" name="email" className='input' placeholder='Email' required />
                        <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} type="password" name="password" className='input' placeholder='Password' required />
                    </div>
                    <div className="modal-footer">
                        <button className="button pink">
                            {loading
                                ? <ButtonLoader />
                                : 'Log in'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </ModalContainer>
    )
}

export default LoginRegisterModal;