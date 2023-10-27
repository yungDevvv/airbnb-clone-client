import React, { useEffect, useState } from 'react'
import ReservationCard from '../components/ReservationCard/ReservationCard'
import avatar from '../img/depositphotos_73942743-stock-photo-beauty-portert-beautiful-model-in.jpg'
import bedIcon from '../img/9246618_bed_bedroom_furniture_icon.svg'
import SimpleLightbox from '../components/SimpleLightbox/SimpleLightbox'
import { useParams } from 'react-router-dom'
import { useHouseStore } from '../store/HouseStore'
import HouseDescriptionModal from '../components/Modals/HouseDescriptionModal/HouseDescriptionModal'
import HouseAmenitiesModal from '../components/Modals/HouseAmenitiesModal/HouseAmenitiesModal'
import { comforts_data } from '../utils/getComforts'
import { v4 as uuid } from 'uuid';
import { Fragment } from 'react'
import PageLoader from '../components/UI/PageLoader/PageLoader'
import ErrorText from '../components/UI/Errors/ErrorText'
import Footer from '../sections/Footer'
import {shallow} from 'zustand/shallow'

const HousePage = () => {
    const [showGallery, setShowGallery] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);

    const { id } = useParams();

    const getHouseAndOwner = useHouseStore((state) => state.getHouseAndOwner);

    const { currentHouse, currentHouseOwner, pageLoading, fetchError } = useHouseStore(state => ({
        currentHouse: state.currentHouse,
        currentHouseOwner: state.currentHouseOwner,
        pageLoading: state.pageLoading,
        fetchError: state.fetchError
    }), shallow)

    useEffect(() => {
        (async () => {
            await getHouseAndOwner(id);
        })();
    }, [])
    return (
        <>
            {fetchError && !pageLoading
                ? <ErrorText type="title" error={fetchError} />
                : (
                    <>
                        {showDescriptionModal &&
                            <HouseDescriptionModal trigger={showDescriptionModal} description={currentHouse.description} close={setShowDescriptionModal} />
                        }
                        {showAmenitiesModal &&
                            <HouseAmenitiesModal amenities={currentHouse.comforts} trigger={showAmenitiesModal} close={setShowAmenitiesModal} />
                        }
                        <SimpleLightbox data={currentHouse.images} galleryState={showGallery} close={setShowGallery} />
                        {pageLoading
                            ? <PageLoader />
                            : (
                                <div className='house-page wrap'>
                                    <div className='house-header'>
                                        <h1>{currentHouse.title}</h1>
                                        <div className="flex">
                                            <span>{currentHouse.city}, {currentHouse?.country?.charAt(0).toUpperCase() + currentHouse?.country?.slice(1)}</span>
                                        </div>
                                    </div>
                                    <div className='house-body'>
                                        <section className='house-body__gallery flex'>
                                            <div className='has-images galley-main-image'>
                                                <img src={currentHouse.images && currentHouse.images[0]} alt="" />
                                            </div>
                                            <div className="flex gallery-images">
                                                {currentHouse.images?.slice(1, 5).map(src => (
                                                    <div key={src} onClick={() => console.log(currentHouse.images[0])} className="has-images">
                                                        <img src={src} alt="" />
                                                    </div>
                                                ))}

                                            </div>
                                            <button className="button white" onClick={() => setShowGallery(true)}>Show all photos</button>
                                        </section>
                                        <section className="house-body__information">
                                            <div className="flex">
                                                <div className="house-information">
                                                    <div className='has-info flex'>
                                                        <div>
                                                            <h2>Entire house hosted by {currentHouseOwner.first_name}</h2>
                                                            <span>
                                                                {currentHouse.guests} guests . {currentHouse.bedroom} bedroom . {currentHouse.beds} bed . {currentHouse.bathrooms} bath
                                                            </span>
                                                        </div>
                                                        <div className='house-owner-avatar'>
                                                            <div className='has-images'>
                                                                <img src={avatar} alt="images" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="has-description">
                                                        <p>
                                                            {currentHouse.description}
                                                        </p>
                                                        <button onClick={() => setShowDescriptionModal(true)}>See more</button>
                                                    </div>
                                                    <div className="has-comforts">
                                                        <h2>What this place offers</h2>
                                                        <div className="flex">

                                                            {comforts_data.map((category, i) => (
                                                                <Fragment key={i}>
                                                                    {currentHouse.comforts && currentHouse.comforts.slice(0, 10).map(comfort => category.items.find(item => item.name === comfort)
                                                                        ? (
                                                                            <p key={uuid()}>
                                                                                <img src={category.items.find(item => item.name === comfort).icon} alt="" />
                                                                                <span>
                                                                                    {category.items.find(item => item.name === comfort).title}
                                                                                </span>
                                                                            </p>
                                                                        )
                                                                        : '')}
                                                                </Fragment>
                                                            ))}
                                                        </div>
                                                        <button className='button white' onClick={() => setShowAmenitiesModal(true)}>Show all {currentHouse.comforts?.length} amenities</button>
                                                    </div>
                                                </div>
                                                <ReservationCard />
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
            <Footer />
        </>
    )
}

export default HousePage