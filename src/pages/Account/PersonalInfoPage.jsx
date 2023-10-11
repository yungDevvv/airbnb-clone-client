import React from 'react'
import PersonalInfoForm from '../../components/Forms/PersonalInfoForm/PersonalInfoForm'

const PersonalInfoPage = () => {
  return (
    <section className='personal-info-page'>
        <div className="wrap wrap-small">
            <h1>Personal info</h1>
            <PersonalInfoForm />
        </div>
    </section>
  )
}

export default PersonalInfoPage