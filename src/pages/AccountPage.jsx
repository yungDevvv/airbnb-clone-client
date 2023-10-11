import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../store/UserStore'

const AccountPage = () => {
    const user = useUserStore(state => state.user);

    return (
        <section className='account-page'>
            <div className="wrap">
                <h1>Account</h1>
                <p><strong>{user.first_name} {user.last_name},</strong> {user.email}</p>
                <div className="flex">
                    <Link to="/account/personal-info">
                        <div className="account-card">
                            <i className="lni lni-support"></i>
                            <div>
                                <h4>Personal info</h4>
                                <p>Provide personal details and how we can reach you</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/account/my-hostings">
                        <div className="account-card">
                            <i className="lni lni-home"></i>
                            <div>
                                <h4>My hostings</h4>
                                <p>List of your created hostings</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/account/create-hosting">
                        <div className="account-card">
                        <i className="lni lni-play"></i>
                            <div>
                                <h4>Create new hosting</h4>
                                <p>You can create your own hosting place, to become superhost!</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/account/my-trips">
                        <div className="account-card">
                        <i className="lni lni-travel"></i>
                            <div>
                                <h4>My trips</h4>
                                <p>You see your reservations</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AccountPage