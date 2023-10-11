import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import api from '../http/axios';
import { useHouseStore } from './HouseStore';
import { START_DATE } from '@datepicker-react/hooks';

const initialGuestsState = {
    adults: {
        label: "Adults",
        description: "Age 13+",
        count: 1,
        min: 1
    },
    childrens: {
        label: "Childrens",
        description: "Ages 2-12",
        count: 0,
        min: 0
    },
    inflants: {
        label: "Infants",
        description: "Under 2",
        count: 0,
        min: 0
    }
}

const initialSearchState = {
    country: 0,
    minPrice: 0,
    maxPrice: 10000,
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
    comforts: [],
    house_type: 'cabin',
    unavalableDates: []
}

const initialDateState = {
    startDate: '',
    endDate: '',
    focusedInput: START_DATE
}

const updateHousesList = useHouseStore.getState().updateHousesList;

export const useSearchStore = create()(persist(
    (set, get) => ({
        searchParams: JSON.parse(localStorage.getItem('search'))?.state.searchParams || { ...initialSearchState },
        dateState: JSON.parse(localStorage.getItem('search'))?.state.dateState || { ...initialDateState },
        guests: JSON.parse(localStorage.getItem('search'))?.state.guests || { ...initialGuestsState },
        dates: [],
        buttonLoading: false,
        loading: false,
        housesCount: 0,
        error: null,
        activeFilters: 0,
        updateGuests: (fields) => {
            set({ guests: { ...get().guests, ...fields } })
        },
        updateSearch: (fields) => {
            set({ searchParams: { ...get().searchParams, ...fields } })
        },
        updateDates: (fields) => {
            set({ dateState: { ...get().dateState, ...fields } })
        },
        searchHouses: async () => {
            set({ error: null });
            const adults = get().guests.adults.count;
            const inflants = get().guests.inflants.count;
            const childrens = get().guests.childrens.count;
            try {
                set({ loading: true })
                updateHousesList([])
                const res = await api.get(`api/houses`, {
                    params: {
                        ...get().searchParams,
                        comforts: get().searchParams.comforts,
                        unavalableDates: [...get().dates],
                        guests: adults + inflants + childrens
                    }
                })
                updateHousesList(res.data)

            } catch (error) {
                console.error(error.message)
                set({ error: 'Error while fetching houses, try later!' })
            } finally {
                set({ loading: false })
            }

        },
        getDates: (startDate, endDate) => {
            const reservationDates = [];
            const start = new Date(startDate);
            const end = new Date(endDate);
            var nextDay = new Date(start);
            reservationDates.push(new Date(startDate))
            while (nextDay < end) {
                nextDay.setDate(nextDay.getDate() + 1);
                reservationDates.push(new Date(nextDay))
            }
            set({ dates: reservationDates });

        },
        clearDates: () => {
            set({ dates: [] });
            set({ dateState: { ...get().dateState, startDate: '', endDate: '', focusedInput: START_DATE } });
        },
        clearFilters: async () => {
            set({ searchParams: { ...get().searchParams, minPrice: 0, maxPrice: 10000, comforts: [], bathrooms: 0, bedrooms: 0, beds: 0 } })
            await get().countHousesByFilter();
        },
        countHousesByFilter: async () => {
            const adults = get().guests.adults.count;
            const inflants = get().guests.inflants.count;
            const childrens = get().guests.childrens.count;
            set({ buttonLoading: true })
            try {
                const res = await api.get(`api/houses/countHousesByFilter`, {
                    params: {
                        ...get().searchParams,
                        unavalableDates: [...get().dates],
                        guests: adults + inflants + childrens,
                    }
                })

                if (res.status !== 200) return;
                set({ housesCount: res.data })
            } catch (error) {
                console.error(error);
                set({ error: 'Error while counting houses, try later!' });
            } finally {
                set({ buttonLoading: false })
            }
        },
        calculateActiveFilters: () => {
            const {
                minPrice,
                maxPrice,
                comforts,
                beds,
                bedrooms,
                bathrooms,
            } = get().searchParams;
            
            let activeFiltersCount = 0;
            if(minPrice !== 0) activeFiltersCount += 1;
            if(maxPrice !== 10000) activeFiltersCount += 1;
            if(comforts.length > 0) activeFiltersCount += comforts.length;
            if(beds > 0) activeFiltersCount += 1;
            if(bedrooms > 0) activeFiltersCount += 1;
            if(bathrooms > 0) activeFiltersCount += 1;
            set({activeFilters: activeFiltersCount});
        }
    }),
    {
        name: 'search',
        storage: createJSONStorage(() => localStorage),
    }))