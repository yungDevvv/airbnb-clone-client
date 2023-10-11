import React from 'react'
import Datepicker from '../../Datepicker/Datepicker';
import ModalContainer from '../ModalContainer';


const CalendarModal = (
    {
        unavailableDates,
        dateState,
        focusedInput,
        setShowModal,
        clearDates
    }
) => {
    return (
        <ModalContainer>
            <div className="modal reservation-modal">
                <Datepicker unavailableDates={unavailableDates}>
                    <div className="modal-header flex">
                        <div className="has-text">
                            <h2>Select dates</h2>
                            <p className='description-text'>Add your travel dates for exact pricing</p>
                        </div>
                        <div className="has-dates flex">
                            <div data-focused={focusedInput === "startDate" && true}>
                                <span>CHECK-IN</span>
                                <span>{dateState.startDate ? new Date(dateState.startDate).toLocaleDateString("en-GB") : 'Select date'}</span>
                            </div>
                            <div data-focused={focusedInput === "endDate" && true}>
                                <span>CHECKOUT</span>
                                <span>{dateState.endDate ? new Date(dateState.endDate).toLocaleDateString("en-GB") : 'Select date'}</span>
                            </div>
                        </div>
                    </div>
                </Datepicker>
                <div className="has-actions">
                    <button className='button underline' onClick={() => clearDates()}>Clear dates</button>
                    <button className='button black' onClick={() => setShowModal(false)}>Close</button>
                </div>
            </div>
        </ModalContainer>
    )
}

export default CalendarModal