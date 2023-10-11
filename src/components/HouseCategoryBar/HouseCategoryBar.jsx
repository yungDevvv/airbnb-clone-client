import React, { useState } from 'react';
import s from './index.module.scss';
import { houses_data } from '../../utils/getHouses.js'
import { useSearchStore } from '../../store/SearchStore';

const HouseCategoryBar = ({ setShowFilterModal }) => {
    const { updateSearch, searchHouses, house_type, activeFilters } = useSearchStore((state) => ({
        updateSearch: state.updateSearch,
        searchHouses: state.searchHouses,
        active_category: state.active_category,
        house_type: state.searchParams.house_type,
        activeFilters: state.activeFilters
    }))

    const handleSearch = async (house_type) => {
        updateSearch({ house_type: house_type });
        await searchHouses();
    }
    return (
        <div className={s.bar}>
            <div className="wrap relative">
                <div className={s.barBody}>
                    {houses_data.map((category, i) => (
                        <button key={i} type="button" className={house_type === category.name ? `${s.categoryButton} ${s.active}` : `${s.categoryButton}`} onClick={() => handleSearch(category.name)}>
                            <div dangerouslySetInnerHTML={{ __html: category.html_icon }} />
                            <span>{category.label}</span>
                        </button>
                    ))
                    }
                    <button onClick={() => setShowFilterModal(true)} type="button" className={s.filters}>
                        <i className="lni lni-cogs"></i>
                        <span>Filters</span>
                        {activeFilters > 0 &&
                            <div className={s.activeFilterBlock}>{activeFilters}</div>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HouseCategoryBar