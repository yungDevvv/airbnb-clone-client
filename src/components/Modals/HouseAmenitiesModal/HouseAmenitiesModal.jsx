import React from 'react'
import ModalContainer from '../ModalContainer'
import CloseButton from '../../UI/CloseButton/CloseButton'
import { comforts_data } from '../../../utils/getComforts'
import { v4 as uuid } from 'uuid';

const HouseAmenitiesModal = ({ amenities, trigger, close }) => {
    return (
        <ModalContainer trigger={trigger}>
            <div className="modal house-amenities fade-in fast">
                <div className="modal-header">
                    <CloseButton styles={{ position: 'static' }} close={() => close()} />
                </div>
                <div className="modal-body">
                    <h2>What this place offers</h2>
                    {comforts_data.map((category, i) => (
                        <section key={uuid()}>
                            {
                                category.items.find(item => item.name === amenities.find(i => i === item.name)) ? <h3>{category.category_title}</h3> : ''
                            }
                            {amenities &&
                                amenities.map(comfort => category.items.find(item => item.name === comfort)
                                    ? (
                                        <div key={uuid()} className='modal-comfort-row'>
                                            <img src={category.items.find(item => item.name === comfort).icon} alt="" />
                                            <span>
                                                {category.items.find(item => item.name === comfort).title}
                                            </span>
                                        </div>
                                    )
                                    : '')}

                        </section>
                    ))}
                </div>
            </div>
        </ModalContainer>
    )
}

export default HouseAmenitiesModal