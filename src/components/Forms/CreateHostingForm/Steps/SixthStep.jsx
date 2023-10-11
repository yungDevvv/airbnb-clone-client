import React, { useEffect, useRef, useState } from 'react'
import s from '../index.module.scss'
import DragDropImages from '../../../DragDropImages/DragDropImages'
import ErrorText from '../../../UI/Errors/ErrorText'
import { useHouseFormStore } from '../../../../store/CreateHouseForm'
import { shallow } from 'zustand/shallow'
import { changeArrayElementsPosition } from '../../../../utils/helpers'


const SixthStep = ({ formError }) => {

    const { deleteImage, editingHouse, updateFields } = useHouseFormStore((state) => ({
        deleteImage: state.deleteImage,
        editingHouse: state.editingHouse,
        updateFields: state.updateFields,
    }), shallow);

    const { images } = useHouseFormStore(state => ({
        images: state.formData.images
    }));

    const [previewImages, setPreviewImages] = useState([...images]);

    const barMenuRef = useRef([]);

    const handeOpenActionMenu = (e) => {
        const bar = e.currentTarget;
        const barMenu = bar.querySelector('ul');

    
        if (barMenu.dataset['active'] === 'active') { // still need to close and open the same menu
            barMenu.dataset['active'] = ''
        } else {
            barMenu.dataset['active'] = 'active';
        }

        for (let key in barMenuRef.current) { // close all opened menus
            if (key !== bar.dataset['index'] && barMenuRef.current[key]?.dataset['active']) { // not the current menu
                barMenuRef.current[key].dataset['active'] = '';
            }
        }
    }

    const handleAction = (e, action, index) => {
        let tempArray = [...previewImages];
        const currentElementIndex = tempArray.findIndex(element => element.id === index);
        const currentElement = previewImages.find(item => item.id === index);

        switch (action) {
            case "SET_MAIN":
                if (index !== previewImages[0].id) {
                    setPreviewImages([...changeArrayElementsPosition(tempArray, currentElementIndex, 0)]);
                    updateFields({ images: [...tempArray] });
                }
                break;
            case "MOVE_FORWARD":
                if (currentElementIndex !== tempArray.length - 1 && currentElementIndex !== 0) { // we won't move last image to main image
                    setPreviewImages([...changeArrayElementsPosition(tempArray, currentElementIndex, currentElementIndex + 1)]);
                    updateFields({ images: [...tempArray] });
                }
                break;
            case "MOVE_BACKWARD":
                if (currentElementIndex !== 1 && currentElementIndex !== 0) { // we won't move second image to main image
                    setPreviewImages([...changeArrayElementsPosition(tempArray, currentElementIndex, currentElementIndex - 1)]);
                    updateFields({ images: [...tempArray] });
                }
                break;
            case "DELETE":
                if (editingHouse._id) { // EDIT MODE
                    if (window.confirm('Are you sure you want to delete this image?')) {

                        if (currentElement.img.slice(0, 4) !== 'data') { // checking is image new uploaded or from db
                            const public_id = currentElement.img.split('.')[2].split('/')[6]; // parsing url and getting public_id for cloudinary
                            deleteImage(public_id, editingHouse._id, currentElement.img); // fetch call
                            setPreviewImages(previewImages.filter(prev => prev.id !== index));
                            updateFields({ images: [...previewImages.filter(prev => prev.id !== index)] });
                        } else {
                            setPreviewImages(previewImages.filter(prev => prev.id !== index));
                            updateFields({ images: [...previewImages.filter(prev => prev.id !== index)] });
                        }
                        if (previewImages.length === 1) {
                            updateFields({ images: [] })
                        }
                    }
                } else {
                    setPreviewImages(previewImages.filter(prev => prev.id !== index));
                    updateFields({ images: [...previewImages.filter(prev => prev.id !== index)] });
                    if (previewImages.length === 1) {
                        updateFields({ images: [] })
                    }
                }

                break;
            default:
                break;
        }
    }
    useEffect(() => {
        updateFields({images: [...previewImages]})
    }, [previewImages])
    return (
        <section className='fade-in'>
            <h1>Ta-da! How does this look?</h1>
            <p>You'll need 5 photos to get started. You can add more or make changes later.</p>
            <ErrorText type="p" error={formError} />
            <div className={s.body}>
                <DragDropImages
                    min={5}
                    validFiles={'image/jpg,image/png,image/jpeg,image/webp'}
                    setPreviewImages={setPreviewImages}
                    images={images}
                />
                <div className={s.preview_images}>
                    {previewImages.length !== 0 &&
                        <div className={`${s.main_image} ${s.image} has-images`} data-index={previewImages[0].id} onClick={handeOpenActionMenu}>
                            <div className={s.imageActionContainer}>
                                <div className={s.imageActionDots}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                                <ul data-active="" ref={(el) => (barMenuRef.current[previewImages[0].id] = el)}>
                                    <li onClick={(e) => handleAction(e, 'DELETE', previewImages[0].id)}>Delete</li>
                                </ul>
                            </div>
                            <img src={previewImages[0].img} alt="" />
                        </div>
                    }
                    <div className={s.images_container}>
                        {previewImages.length !== 0 &&
                            previewImages
                                .slice(1)
                                .map(item => (
                                    <div key={item.id} className={`has-images ${s.image}`}>
                                        <div className={s.imageActionContainer} onClick={handeOpenActionMenu} data-index={item.id}>
                                            <div className={s.imageActionDots}>
                                                <div></div>
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <ul data-active="" ref={(el) => (barMenuRef.current[item.id] = el)}>
                                                <li onClick={(e) => handleAction(e, 'SET_MAIN', item.id)}>Set as main picture</li>
                                                <li onClick={(e) => handleAction(e, 'MOVE_FORWARD', item.id)}>Move forward</li>
                                                <li onClick={(e) => handleAction(e, 'MOVE_BACKWARD', item.id)}>Move backward</li>
                                                <li onClick={(e) => handleAction(e, 'DELETE', item.id)}>Delete</li>
                                            </ul>
                                        </div>
                                        <img src={item.img} alt="" />
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SixthStep