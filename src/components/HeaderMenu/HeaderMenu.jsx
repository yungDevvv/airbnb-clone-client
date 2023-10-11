import React from 'react';
import s from './headermenu.module.scss'
import { useUserStore } from '../../store/UserStore';
import { Link } from 'react-router-dom';

function HeaderMenu({ setShowLoginModal, setShowRegisterModal }) {
    const user = useUserStore((state) => state.user);
    const logoutUser = useUserStore(state => state.logoutUser); 

    return (
        <div className={s.modal}>
            {user
                ? (
                    <ul>
                        <li>
                            <Link to={"/account"}>Account</Link>
                        </li>
                        <li onClick={() => logoutUser()}>Logout</li>
                    </ul>
                )
                : (
                    <ul>
                        <li onClick={() => setShowRegisterModal(state => !state)}>Sing up</li>
                        <li onClick={() => setShowLoginModal(state => !state)}>Log in</li>
                    </ul>
                )
            }

        </div>
    )
}

export default HeaderMenu;