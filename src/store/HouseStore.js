import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../http/axios';
import { useUserStore } from './UserStore';
import { useSearchStore } from './SearchStore';

export const useHouseStore = create()(
    (set, get) => ({
        housesList: [],
        currentHouse: {},
        currentHouseOwner: {},
        pageLoading: false,
        loading: false,
        fetchError: null, // GET
        actionError: null, // POST PUT DELETE
        updateHousesList: (data) => {
            set({housesList: [...data]})
        },
        getHouseById: async (id) => {
            try {
                const house = await api.get('api/houses/' + id);
                return house;
            } catch (error) {
                set({fetchError: 'Error while fething house...'})
                console.error(error);
            }
        },
        getHouseAndOwner: async (id) => {
            set({pageLoading: true});
            try {
                const house = await api.get('api/houses/' + id);
                set({currentHouse: house.data})

            } catch (error) {
                console.error(error);
                set({fetchError: 'Failed fetch current house!'});

            } finally {
                set({pageLoading: false});

            }
            
            try {
                const owner = await api.get('api/users/' + get().currentHouse.owner);
                set({currentHouseOwner: owner.data})

            } catch (error) {
                console.error(error);
                set({fetchError: 'Failed fetch current house owner!'})

            } finally {
                set({pageLoading: false});

            }

        },
        checkAvailability: async (id, dates) => {
            set({pageLoading: true});
            try {
                const res = await api.post(`api/houses/checkAvailability/${id}`, {
                    dates: dates
                })
                return res.data;
            } catch (error) {
                console.error(error);
                
            } finally {
                set({pageLoading: false});
            }
        },
        reserveHouse: async (houseID, dates) => {
            set({loading: true});
            const adults = useSearchStore.getState().guests.adults.count;
            const inflants = useSearchStore.getState().guests.inflants.count;
            const childrens = useSearchStore.getState().guests.childrens.count;
        
            try {
                await api.post('api/reservations', {
                    house: houseID,
                    dates: dates,
                    client: useUserStore.getState().user,
                    guests: adults + inflants + childrens
                })
                return true;    

            } catch (error) {
                console.error(error); 
                set({actionError: 'Failed reserve house!'});
                
            } finally {
                set({loading: false});
            }
        },
    }
))