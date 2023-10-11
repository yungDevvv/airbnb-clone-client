import React from 'react'
import successImage from '../img/success.png'
import { Link } from 'react-router-dom'

const SuccessCreatingHouse = () => {
    return (
        <section className='success-host fade-in'>
            <div className='wrap center'>
                <div>
                    <img src={successImage} alt="" />
                </div>
                <h1>Congratulations!</h1>
                <p>Now you are host, and good luck with your business! You can also check your host palaces by click <Link className='button underline' to="/account/my-hostings">here</Link></p>
            </div>
        </section>
    )
}

export default SuccessCreatingHouse