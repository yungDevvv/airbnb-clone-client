import axios from 'axios';
import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import api from '../http/axios';
import { v4 as uuid } from 'uuid';

const initialFormState = {
    title: '',
    short_description: '',
    description: '',
    country: 'finland',
    address: '',
    city: '',
    state: '',
    zip: '',
    guests: 1,
    bedroom: 1,
    beds: 1,
    bathrooms: 1,
    comforts: [],
    house_type: null,
    images: [],
    price: 0,
    uploadedImages: []
}

export const useHouseFormStore = create()(devtools(persist(
    (set, get) => ({
        formData: { ...initialFormState },
        phase: sessionStorage.getItem('form-phase') || 0,
        fetchError: null,
        loading: false,
        editingHouse: [],
        updateFields: (fields) => {
            set({ formData: { ...get().formData, ...fields } });
        },
        updateEditingHouse: (data) => {
            const images = data.images.map(image => ({id: uuid(), img: image}))
            set({ editingHouse: { _id: data._id } });
            set({ formData: { ...get().formData, ...data, images: [...images] } });
        },
        updateHouse: async () => {
            set({fetchError: null});
            set({loading: true});
            await get().uploadImages();
            try {
                if (get().editingHouse._id) {
                await api.put('api/houses/' + get().editingHouse._id, {
                    ...get().formData,
                    images: [...get().formData.uploadedImages]
                });
                sessionStorage.clear();
                set({ formData: initialFormState });
                return true;
                }
            } catch (error) {
                console.error(error)
                set({ fetchError: 'Something went wrong!' });
                return false;
            } finally {
                set({loading: false});
            }
        },
        uploadImages: async () => {
            try {
                const uploadedImages = await Promise.all(
                    Object.values(get().formData.images).map(async (file) => {
                        console.log(file, 'START');
                        if(file.img.split(':')[0] !== 'data') return file.img;
                        console.log(file, 'SUCCESS');
                        const data = new FormData();
                        data.append("file", file.img);
                        data.append("upload_preset", "upload");
                        const uploadRes = await axios.post(
                            "https://api.cloudinary.com/v1_1/semtest/image/upload",
                            data
                        );

                        if (uploadRes.status !== 200) return;

                        const { url } = uploadRes.data;
                        return url;
                    })
                )
                
                set({ formData: { ...get().formData, uploadedImages: [...uploadedImages] } })
                set({ error: null })
                return uploadedImages;
            } catch (error) {
                console.error(error)
                set({ fetchError: 'Problem with uploading images! Try later!' });
                return false;
            } finally {
                set({ loading: false });
            }
        },
        deleteImage: async (public_id, house_id, img) => {
            if (get().editingHouse._id) {
                try {
                    await api.post('api/houses/deleteImage', {
                        public_id: public_id,
                        house_id: house_id,
                        img: img
                    })
                } catch (error) {
                    console.error(error)
                }        
            }
        },
        resetForm: () => {
            sessionStorage.clear();
        },
        submitForm: async () => {
            set({ loading: true });
            /* Sending images to cloudinary */
            await get().uploadImages();
            /* Sendig form to our api */
            try {
                await api.post('/api/houses', {
                    ...get().formData,
                    images: get().formData.uploadedImages
                })
                sessionStorage.clear();
                set({ formData: initialFormState });
                return true;
            } catch (error) {
                console.error(error)
                set({ fetchError: 'Problem with form sending! Try later' });
                return false;
            } finally {
                set({ loading: false });
            }
            
        },
        setFetchError: (error) => {
            set({fetchError: error});
        } 
    }),
    {
        name: 'create-house-form',
        storage: createJSONStorage(() => sessionStorage),
    }
)))