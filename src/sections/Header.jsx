import React, { useState } from 'react'
import Logo from '../components/UI/Logo/Logo'
import HeaderMenu from '../components/HeaderMenu/HeaderMenu.jsx';
import LoginModal from '../components/Modals/LoginModal/LoginModal';
import RegisterModal from '../components/Modals/RegisterModal/RegisterModal';
import { useUserStore } from '../store/UserStore';
import SearchBar from '../components/SearchBar/SearchBar';
import { useEffect } from 'react';
import { useSearchStore } from '../store/SearchStore';

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);

    const user = useUserStore(state => state.user);
    const searchHouses = useSearchStore((state) => state.searchHouses);
    
    const { endDate, startDate } = useSearchStore(state => ({
        endDate: state.dateState.endDate,
        startDate: state.dateState.startDate
    }));
    const handleSearch = async () => {

        if (startDate && !endDate) {
            alert('End date is propably missing!');
            return;
        }
        setShowSearchBar(false);
        await searchHouses();
    }
    const handleOpen = (callback, action) => {
        switch (action) {
            case 'searchbar':
                setShowMenu(false);
                break;
            case 'menu':
                setShowSearchBar(false)
                break;
            default:
                break;
        }
        callback(open => !open);
    }
    useEffect(() => {
        showSearchBar ? document.body.style = 'overflow: hidden' : document.body.style = 'overflow: auto';
    }, [showSearchBar])

    if (localStorage.getItem('redirect-auth')) {
        setShowMenu(true);
        setShowLoginModal(true);
        localStorage.removeItem('redirect-auth');
    }
    return (
        <>
            <div className={`${showSearchBar ? 'search-open' : ''}`} onClick={() => setShowSearchBar(false)}></div>
            <header className='header'>
                <div className="wrap flex">
                    <a href="/" className="header__logo">
                        <Logo />
                    </a>
                    {window.location.pathname === '/' &&
                        <button style={showSearchBar ? { border: '1px solid black' } : {}} className="header__search-panel flex hover-shadow" onClick={() => handleOpen(setShowSearchBar, 'searchbar')}>
                            <span style={showSearchBar ? { marginLeft: '28%' } : {}}>Start your search</span>
                            <div style={showSearchBar ? { opacity: '0' } : { opacity: '1' }} className="search-panel-circle">
                                <i className="lni lni-search-alt"></i>
                            </div>
                        </button>
                    }
                    <div className={"flex header__user-panel hover-shadow " + showMenu} onClick={() => handleOpen(setShowMenu, 'menu')}>
                        <div className="user-panel-burger flex">
                            <i className="lni lni-menu"></i>
                        </div>
                        <div className="user-panel-icon">
                            <div>
                                {user
                                    ? user.first_name[0].toUpperCase()
                                    : <i className="lni lni-user"></i>
                                }

                            </div>
                        </div>
                        {showMenu &&
                            <HeaderMenu setShowLoginModal={setShowLoginModal} setShowRegisterModal={setShowRegisterModal} />
                        }
                    </div>
                </div>
                {showLoginModal &&
                    <LoginModal trigger={showLoginModal} setShowLoginModal={setShowLoginModal} />
                }
                {showRegisterModal &&
                    <RegisterModal trigger={showRegisterModal} setShowRegisterModal={setShowRegisterModal} />
                }
                {window.location.pathname === '/' &&
                    <SearchBar handleSearch={handleSearch} open={showSearchBar} />
                }

            </header>
        </>
    )
}

export default Header;