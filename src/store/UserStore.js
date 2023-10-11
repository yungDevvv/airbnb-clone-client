import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import api from '../http/axios';

export const useUserStore = create()(devtools(persist(
    (set, get) => ({
        errors: {
            loginError: null,
            registerError: null,
            updateUserError: null
        },
        loading: false,
        user: JSON.parse(localStorage.getItem("user")) || null,
        userHouses: [],
        setUser: (user) => set(() => ({ user: user })),
        registerUser: async ({ email, password, first_name, last_name }) => {
            try {
                set({ loading: true })
                const res = await api.post("/api/auth/register", {
                    email: email,
                    password: password,
                    first_name: first_name,
                    last_name: last_name
                })
                return res;
            } catch (error) {
                console.error(error.message);
                set({ errors: { ...get().errors, registerError: error.response.data.message } })
            } finally {
                set({ loading: false })
            }
        },
        loginUser: async ({ email, password }) => {
            set({ loading: true })
            try {
                const res = await api.post("/api/auth/login", {
                    email: email,
                    password: password
                })

                if (res.status !== 200) return;
                get().setUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                document.cookie = `access_token=${res.data.token}`;
                window.location.reload();
                return res;
            } catch (error) {
                console.error(error);
                set({ errors: { ...get().errors, loginError: error.response.data.message } });
            } finally {
                set({ loading: false })
            }
        },
        logoutUser: async () => {
            try {
                await api.get('/api/auth/logout');
                get().setUser(null);
                localStorage.clear();
                sessionStorage.clear();
                window.location.reload();
            } catch (error) {
                console.error(error);
                alert('Ups! Something went wrong!')
            }

        },
        updateUser: async (id, data) => {
            set({errors: {...get().errors, updateUserError: null}});
            set({loading: true});
            try {
                const res = await api.put('/api/users/' + id, data);
                get().setUser(res.data);
                return true;
            } catch (error) {
                console.error(error);
                set({errors: {...get().errors, updateUserError: 'Ups, seems it is problem on the server!'}});
            } finally {
                set({loading: false});
            }
        },
        updateError: (error) => {
            set({ errors: { ...get().errors, ...error } });

        },
        getUserHouses: async () => {
            let id = get().user._id;
            try {
                const res = await api.get("/api/houses/getUserHouses/" + id);
                if (res.status !== 200) return;
                set({ userHouses: res.data });
            } catch (error) {
                console.error(error)
            }
        },
        deleteUserHouse: async (houseID, navigate) => {
            if (!houseID) {
                alert('Something went wrong! House id was not provide!');
                return;
            }
            try {
                if (window.confirm('Are you sure that you want to delete this house?')) {
                    const res = await api.delete('api/houses/' + houseID);
                    navigate('/account/my-hostings');
                    alert(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }),
    { name: 'user', getStorage: () => localStorage }
)
))
