import React, { useEffect } from 'react'
import CloseButton from '../../UI/CloseButton/CloseButton';
import ModalContainer from '../ModalContainer';
import { useSearchStore } from '../../../store/SearchStore';
import { comforts_data } from '../../../utils/getComforts'
import Checkbox from '../../UI/Checkbox/Checkbox';
import { v4 as uuid } from 'uuid';
import RadioButton from '../../UI/RadioButton/RadioButton';
import {shallow} from 'zustand/shallow'

const FilterModal = ({ trigger, setShowFilterModal }) => {
    
    const { minPrice, maxPrice, bedrooms, bathrooms, beds, comforts, housesCount } = useSearchStore(state => ({
        minPrice: state.searchParams.minPrice,
        maxPrice: state.searchParams.maxPrice,
        clearFilters: state.clearFilters,
        bedrooms: state.searchParams.bedrooms,
        bathrooms: state.searchParams.bathrooms,
        beds: state.searchParams.beds,
        comforts: state.searchParams.comforts,
        housesCount: state.housesCount
    }), shallow);
  
    const { searchHouses, countHousesByFilter, updateSearch, clearFilters } = useSearchStore(state => ({
        searchHouses: state.searchHouses,
        countHousesByFilter: state.countHousesByFilter,
        updateSearch: state.updateSearch,
        clearFilters: state.clearFilters,
    }), shallow);

    const handleCheckbox = (e, name) => {
        if (!e.target.checked) {
            updateSearch({ comforts: comforts.filter(comfort => comfort !== name) })
        } else {
            updateSearch({ comforts: [...comforts, name] })
        }
    }

    const handleSearch = async () => {
        await searchHouses();
        setShowFilterModal(false);
    }
    const RadioButtons = React.memo(RadioButton);
    const Checkboxes = React.memo(Checkbox)
    useEffect(() => {
        ( async () => {
            await countHousesByFilter();
        })()
    }, [])
    return (
        <ModalContainer trigger={trigger}>
            <div className="modal filters fade-in fast">
                <div className="modal-header">
                    <strong>Filters</strong>
                    <CloseButton close={setShowFilterModal} styles={{ right: '15px', left: 'unset', top: '20px' }} />
                </div>
                <div className="modal-body">
                    <form onChange={async () => await countHousesByFilter()}>
                        <div className="filter-row">
                            <strong>Price range </strong>
                            <div className="flex">
                                <input type="number" min={0} className='input' placeholder='Minimum' value={minPrice} onChange={(e) => updateSearch({ minPrice: e.target.value })} />
                                -
                                <input type="number" min={0} className='input' placeholder='Maximum' value={maxPrice} onChange={(e) => updateSearch({ maxPrice: e.target.value })} />
                            </div>
                        </div>
                        <div className="filter-row">
                            <strong>Rooms and beds </strong>
                            <div className='room-filter'>
                                <h3>Bedrooms</h3>
                                <div className="flex">
                                    <RadioButtons value={0} checked={bedrooms === 0 ? true : false} title="Any" name="bedrooms" onChange={(e) => updateSearch({ bedrooms: +e.target.value })} />
                                    <RadioButtons value={1} checked={bedrooms === 1 ? true : false} title="1" name="bedrooms" onChange={(e) => updateSearch({ bedrooms: +e.target.value })} />
                                    <RadioButtons value={2} checked={bedrooms === 2 ? true : false} title="2" name="bedrooms" onChange={(e) => updateSearch({ bedrooms: +e.target.value })} />
                                    <RadioButtons value={3} checked={bedrooms === 3 ? true : false} title="3" name="bedrooms" onChange={(e) => updateSearch({ bedrooms: +e.target.value })} />
                                    <RadioButtons value={4} checked={bedrooms === 4 ? true : false} title="4" name="bedrooms" onChange={(e) => updateSearch({ bedrooms: +e.target.value })} />
                                    <RadioButtons value={5} checked={bedrooms === 5 ? true : false} title="5" name="bedrooms" onChange={(e) => updateSearch({ bedrooms: +e.target.value })} />
                                    <RadioButtons value={6} checked={bedrooms === 6 ? true : false} title="6+" name="bedrooms" onChange={(e) => updateSearch({ bedrooms: +e.target.value })} />
                                </div>
                            </div>
                            <div className='room-filter'>
                                <h3>Beds</h3>
                                <div className="flex">
                                    <RadioButtons value={0} checked={beds === 0 ? true : false} title="Any" name="beds" onChange={(e) => updateSearch({ beds: +e.target.value })} />
                                    <RadioButtons value={1} checked={beds === 1 ? true : false} title="1" name="beds" onChange={(e) => updateSearch({ beds: +e.target.value })} />
                                    <RadioButtons value={2} checked={beds === 2 ? true : false} title="2" name="beds" onChange={(e) => updateSearch({ beds: +e.target.value })} />
                                    <RadioButtons value={3} checked={beds === 3 ? true : false} title="3" name="beds" onChange={(e) => updateSearch({ beds: +e.target.value })} />
                                    <RadioButtons value={4} checked={beds === 4 ? true : false} title="4" name="beds" onChange={(e) => updateSearch({ beds: +e.target.value })} />
                                    <RadioButtons value={5} checked={beds === 5 ? true : false} title="5" name="beds" onChange={(e) => updateSearch({ beds: +e.target.value })} />
                                    <RadioButtons value={6} checked={beds === 6 ? true : false} title="6+" name="beds" onChange={(e) => updateSearch({ beds: +e.target.value })} />
                                </div>
                            </div>
                            <div className='room-filter'>
                                <h3>Bathrooms</h3>
                                <div className="flex">
                                    <RadioButtons value={0} checked={bathrooms === 0 ? true : false} title="Any" name="bathrooms" onChange={(e) => updateSearch({ bathrooms: +e.target.value })} />
                                    <RadioButtons value={1} checked={bathrooms === 1 ? true : false} title="1" name="bathrooms" onChange={(e) => updateSearch({ bathrooms: +e.target.value })} />
                                    <RadioButtons value={2} checked={bathrooms === 2 ? true : false} title="2" name="bathrooms" onChange={(e) => updateSearch({ bathrooms: +e.target.value })} />
                                    <RadioButtons value={3} checked={bathrooms === 3 ? true : false} title="3" name="bathrooms" onChange={(e) => updateSearch({ bathrooms: +e.target.value })} />
                                    <RadioButtons value={4} checked={bathrooms === 4 ? true : false} title="4" name="bathrooms" onChange={(e) => updateSearch({ bathrooms: +e.target.value })} />
                                    <RadioButtons value={5} checked={bathrooms === 5 ? true : false} title="5" name="bathrooms" onChange={(e) => updateSearch({ bathrooms: +e.target.value })} />
                                    <RadioButtons value={6} checked={bathrooms === 6 ? true : false} title="6+" name="bathrooms" onChange={(e) => updateSearch({ bathrooms: +e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="filter-row">
                            <strong>Amenities </strong>
                            {comforts_data.map((category, i) => (
                                <div key={i}>
                                    <h3>
                                        {category.category_title}
                                    </h3>
                                    <div className='filter-amenities flex'>
                                        {
                                            category.items.map(item => (
                                                <div key={uuid()} className='has-checkbox'>
                                                    <Checkboxes checked={comforts.find(comforts => comforts === item.name) ? true : false} title={item.title} onChange={(e) => handleCheckbox(e, item.name)} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </form>
                </div>
                <div className="modal-footer flex">
                    <button type="button" className='button underline' onClick={async () => await clearFilters()}>Clear all</button>
                    <button type="button" className='button black' onClick={async () => await handleSearch()}>
                        {housesCount ? `Show ${housesCount} places` : 'No exact matches'}
                    </button>
                </div>
            </div>
        </ModalContainer>
    )
}

export default FilterModal;