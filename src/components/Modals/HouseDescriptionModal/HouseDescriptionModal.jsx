import React from 'react'
import CloseButton from '../../UI/CloseButton/CloseButton'
import ModalContainer from '../ModalContainer'

const HouseDescriptionModal = ({description, trigger, close }) => {

    return (
        <ModalContainer trigger={trigger}>
            <div className='modal house-description'>
                <div className="modal-header">
                    <CloseButton styles={{ position: 'static' }} close={() => close()} />
                </div>
                <div className="modal-body">
                    <h2>About the place</h2>
                    {description}
                </div>
            </div>
        </ModalContainer>
    )
}

export default HouseDescriptionModal