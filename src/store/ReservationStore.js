import { create } from 'zustand';
import api from '../http/axios';
import { useUserStore } from './UserStore';

export const useReservationStore = create()(
    (set, get) => ({
        houseReservations: [],
        userReservations: [],
        fetchError: null, // GET
        actionError: null, // POST, DELETE, PUT
        loading: false,
        pageLoading: false,
        reservationsCount: {
            previos: 0,
            upcoming: 0
        },
        getUserReservations: async () => {
            set({ pageLoading: true });
            try {
                const userID = useUserStore.getState().user._id;
                const reservations = await api.get('api/reservations/user/' + userID);

                set({ pageLoading: false });
                set({ userReservations: reservations.data });
            } catch (error) {
                console.error(error);
                set({ fetchError: error.message });
                set({ pageLoading: false });
            }
        },
        deleteUserReservation: async (reservationID) => {
            set({ loading: true })
            try {
                if (window.confirm('Are you sure?')) {
                    await api.delete('api/reservations/' + reservationID);
                    return true;
                }
            } catch (error) {
                set({ actionError: 'Ops, something went wrong!' });
                console.error(error);
            } finally {
                set({ loading: false });
            }
        },
        getHouseReservations: async (houseID, type) => {
            set({ loading: true })
            try {
                const reservations = await api.get('api/reservations/house/' + houseID, {
                    params: {
                        type: type
                    }
                });
                
                set({ houseReservations: reservations.data });
                set({ loading: false });
            } catch (error) {
                console.error(error)
            } finally {
                set({ loading: false })
            }
        },
        getCountOfReservations: async (houseID) => {
            try {
                const reservations = await api.get('api/reservations/getCountOfReservations/' + houseID);
                set({ reservationsCount: reservations.data })
            } catch (error) {
                console.error(error)
            }
        },
    }
    ))