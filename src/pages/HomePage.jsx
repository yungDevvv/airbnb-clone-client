import { useEffect, useState } from "react";
import HouseCard from "../components/HouseCard/HouseCard";
import { useHouseStore } from "../store/HouseStore.js";
import HouseCategoryBar from "../components/HouseCategoryBar/HouseCategoryBar";
import FilterModal from "../components/Modals/FilterModal/FilterModal";
import { useSearchStore } from "../store/SearchStore";
import CardSkeleton from "../components/UI/CardSkeleton/CardSkeleton";
import ErrorText from "../components/UI/Errors/ErrorText";
import {shallow} from 'zustand/shallow'

const HomePage = () => {
    const {searchHouses, error, loading} = useSearchStore((state) => ({
        searchHouses: state.searchHouses, 
        error: state.error, 
        loading: state.loading
    }), shallow);

    const calculateActiveFilters = useSearchStore(state => state.calculateActiveFilters);
    const housesList = useHouseStore((state) => state.housesList);
    
    const [showFilterModal, setShowFilterModal] = useState(false);

    useEffect(() => {
        const fetchHouses = async () => {
            await searchHouses();
        }
        fetchHouses();
    }, [])
    
    useEffect(() => {
        calculateActiveFilters();
    }, [showFilterModal])
    return (
        <>
            <HouseCategoryBar setShowFilterModal={setShowFilterModal} />
            {showFilterModal &&
                <FilterModal trigger={showFilterModal} setShowFilterModal={setShowFilterModal} />
            }
            <section style={{ marginTop: '90px' }}>
                <div className="wrap">
                    {housesList.length !== 0 &&
                        <div className="flex card-flex">
                            {housesList.map((item, i) => <HouseCard key={i} data={item} />)}
                        </div>

                    }
                    {!housesList.length && !loading && !error &&
                        <>
                            <h1>No exact matches</h1>
                            <p>Try changing or removing some of your filters or adjusting your search area.</p>
                        </>

                    }
                    {loading &&
                        <div className="flex card-flex">
                            {
                                [...Array(10)].map((item, i) => <CardSkeleton key={i} />)
                            }
                        </div>
                    }
                    {error && !loading && 
                        <ErrorText type="title" error={error} />
                    }
                </div>
            </section>
        </>
    )
}

export default HomePage;
