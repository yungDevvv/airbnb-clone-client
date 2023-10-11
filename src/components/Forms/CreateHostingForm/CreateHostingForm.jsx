import React, { useEffect, useRef, useState } from 'react'
import s from './index.module.scss'
import FirstStep from './Steps/FirstStep'
import { useMultistepForm } from './useMultistepForm'
import SecondStep from './Steps/SecondStep'
import ThirdStep from './Steps/ThirdStep'
import FourthStep from './Steps/FourthStep'
import FifthStep from './Steps/FifthStep'
import SixthStep from './Steps/SixthStep'
import SeventhStep from './Steps/SeventhStep'
import { useNavigate, useParams } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useHouseFormStore } from '../../../store/CreateHouseForm'
import { v4 as uuid } from 'uuid';
import { useHouseStore } from '../../../store/HouseStore'
import ErrorText from '../../UI/Errors/ErrorText'
import successImage from '../../../img/done.png'

const CreateHostingForm = () => {
    const navigate = useNavigate();
    const formContainer = useRef();

    const [formError, setFormError] = useState('');
    
    const { images, fetchError, loading, house_type, price, } = useHouseFormStore((state) => ({
        images: state.formData.images,
        fetchError: state.fetchError,
        loading: state.loading,
        house_type: state.formData.house_type,
        price: state.formData.price
    }), shallow);

    const { submitForm, updateHouse, setFetchError, resetForm } = useHouseFormStore((state) => ({
        submitForm: state.submitForm,
        updateHouse: state.updateHouse,
        setFetchError: state.setFetchError,
        resetForm: state.resetForm
    }), shallow)

    const {
        currentStepIndex,
        currentForm,
        isFirstStep,
        isLastStep,
        stepsLength,
        next,
        back
    } = useMultistepForm([
        <FirstStep />,
        <SecondStep formError={formError} />,
        <ThirdStep />,
        <FourthStep />,
        <FifthStep />,
        <SixthStep formError={formError} />,
        <SeventhStep formError={formError} />
    ])

    const formValidation = () => {
        const phase = sessionStorage.getItem('form-phase');
        let success = true;
        switch (phase) {
            case '1': // Second step
                if (!house_type) {
                    setFormError('Choose one of the house types');
                    success = false;
                }
                break;
            case '5': // Sixth step
                // The file format happens in drag and drop component, it automatticly don't read wrong format files
                if (images.length < 4) {
                    setFormError('Upload atleast 5 images');
                    success = false;
                }
                break;
            case '6':
                if ( price < 1) {
                    setFormError("Price field can't be 0");
                    success = false;
                }
                break;
            default:
                break;
        }
        return success;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            if (!isLastStep) {
                setFetchError('');
                setFormError('');
                return next();
            } else {
                if (houseID) { // EDIT MODE
                    let success = await updateHouse();
                    if(success) {
                        
                        formContainer.current.innerHTML = `
                            <div class="page-center">
                                <img src="${successImage}" alt="succes" />
                                <p style="text-align: center; color: green;">Information about your property was successefuly changed</p>
                            </div>
                        ` 
                        setTimeout(() => {
                            navigate('/account/my-hostings/' + houseID);
                        }, 2000)
                    }
                } else {
                    let success = await submitForm();
                    
                    if (success) {
                        navigate('/account/create-hosting/success');
                    }
                }
            }
        }

    }

    /* EDIT MODE */
    const houseID = useParams().id;
    const getHouseById = useHouseStore((state) => state.getHouseById);
    const updateEditingHouse = useHouseFormStore(state => state.updateEditingHouse);
    useEffect(() => {
        setFetchError('');
        const fetchEditHouseData = async () => {
            const { data } = await getHouseById(houseID);
            updateEditingHouse({ ...data });
        };
        if (houseID) fetchEditHouseData(houseID);
        else resetForm();
        return () => {
            resetForm();
        }
    }, [])

    return (
        <div className="wrap wrap-small" ref={formContainer}>
            <form onSubmit={handleSubmit} className={s.form}>
                <ErrorText type="title" error={fetchError} />
                <div>
                    {
                        currentForm
                    }
                </div>
                <div className={s.progress_bar}>
                    <div className={s.buttons}>
                        {!isFirstStep &&
                            <button type="button" className='button underline' onClick={() => { setFormError(''); back() }}>Back</button>
                        }
                        <button type="submit" className='button black'>
                            {loading
                                ? <i className="lni lni-spinner-solid loading"></i>
                                : isLastStep ? 'Finish' : 'Next'
                            }
                        </button>
                    </div>
                    <div className={s.bar}>
                        {
                            [...new Array(stepsLength)].map((item, i) =>
                                <span
                                    key={uuid()}
                                    style={{
                                        width: `calc(100% / ${stepsLength} - 5px)`,
                                        ...(i <= currentStepIndex ? { backgroundColor: '#000' } : { backgroundColor: 'transparent' })
                                    }}
                                />
                            )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateHostingForm