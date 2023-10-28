import React, { useEffect } from 'react'
import HostingCard from '../../components/HostingCard/HostingCard'
import { useUserStore } from '../../store/UserStore'
import PageLoader from '../../components/UI/PageLoader/PageLoader';


const MyPlaces = () => {
    const getUserHouses = useUserStore(state => state.getUserHouses);
    const { pageLoading } = useUserStore(state => ({ pageLoading: state.pageLoading }))
    const userHouses = useUserStore(state => state.userHouses);
    useEffect(() => {
        const fetchUserHouses = async () => {
            await getUserHouses();
        }
        fetchUserHouses();
    }, [])
    return (
        <div className='my-hostings-page'>
            {!pageLoading
                ? (
                    <div className="wrap wrap-small">
                        <h1>There is the list of all your places</h1>
                        {userHouses.length 
                        ? userHouses.map((item, i) => (
                                <HostingCard key={i} data={item} />
                            ))
                        : <strong>No hosting created yet...</strong>
                        }
                    </div>
                ) 
                : <PageLoader />
            }
        </div>
    )
}

export default MyPlaces