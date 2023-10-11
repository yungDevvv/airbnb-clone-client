import React from 'react'
import TripCard from '../../components/TripCard/TripCard'
import { useEffect } from 'react'
import { useReservationStore } from '../../store/ReservationStore'
import PageLoader from '../../components/UI/PageLoader/PageLoader'
import ErrorText from '../../components/UI/Errors/ErrorText'

const MyTrips = () => {
    const {getUserReservations, deleteUserReservation} = useReservationStore(state => ({
        getUserReservations: state.getUserReservations,
        deleteUserReservation: state.deleteUserReservation
    }));

    const { userReservations, pageLoading, fetchError, actionError } = useReservationStore(state => ({
        userReservations: state.userReservations,
        pageLoading: state.pageLoading,
        fetchError: state.fetchError,
        actionError: state.actionError
    }));

    const handleDeleteReservation = async (id, setDeleteLoading) => {
        setDeleteLoading(true); // just easy way to tell current button to show loading
        let res = await deleteUserReservation(id);
        if(res) {
            await getUserReservations();
        } else {
            setDeleteLoading(false)
        }
    }
    useEffect(() => {
        const fetchTrips = async () => {
            await getUserReservations();
        }
        fetchTrips();
    }, [])
    return (
        <>
            {pageLoading
                ? <PageLoader />
                : (
                    <section className='user-trips'>
                        <div className="wrap wrap-small">
                            <h1>My Trips</h1>
                            {actionError &&
                                <ErrorText type="p" error={actionError} />
                            }
                            {fetchError &&
                                <ErrorText type="title" error={fetchError} />
                            }
                           
                            {userReservations.length !== 0
                                ? <div className='flex'>
                                    {
                                        userReservations.map(reserv => <TripCard deleteUserReservation={handleDeleteReservation} key={reserv._id} data={reserv} />)
                                    }
                                </div>
                                : <>
                                    <h2 style={{ fontSize: '20px', marginTop: '20px' }}>No trips booked...yet!</h2>
                                    <p>Time to dust off your bags and start planning your next adventure</p>
                                </>
                            }
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default MyTrips