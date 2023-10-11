import { Route, Routes} from "react-router-dom";
import Header from "./sections/Header";
import HomePage from "./pages/HomePage";
import HousePage from "./pages/HousePage";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import PersonalInfoPage from "./pages/Account/PersonalInfoPage";
import MyPlaces from "./pages/Account/MyPlaces";
import CreateHostingForm from "./components/Forms/CreateHostingForm/CreateHostingForm";
import SuccessCreatingHouse from "./pages/SuccessCreatingHouse";
import UserHouseInfo from "./pages/Account/UserHouseInfo";
import ReservationPage from "./pages/ReservationPage";
import MyTrips from "./pages/Account/MyTrips";

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/" element={<HomePage />} exact />
                    <Route path="/house/:id" element={<HousePage />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path="/reservation/:id" element={<ReservationPage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/account/personal-info" element={<PersonalInfoPage />} />
                        <Route path="/account/my-trips" element={<MyTrips />} />
                        <Route path="/account/my-hostings" element={<MyPlaces />} />
                        <Route path="/account/my-hostings/:id" element={<UserHouseInfo />} />
                        <Route path="/account/create-hosting" element={<CreateHostingForm />} />
                        <Route path="/account/create-hosting/:id" element={<CreateHostingForm />} />
                        <Route path="/account/create-hosting/success" element={<SuccessCreatingHouse />} />
                    </Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;
