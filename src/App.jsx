import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import Profile from './views/Profile/Profile';
import TravelsList from './views/TravelsList/TravelsList';
import TravelsDetails from './views/TravelsDetails/TravelsDetails';
import UserDetails from './views/User/UserDetails';
import RequestsList from './views/User/RequestsList';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAuthContext } from './contexts/AuthContext';
import AddTrip from './views/AddTrip/AddTrip';
import UserTravels from './views/User/UserTravels';
import EditTravelCard from './views/User/EditTravelCard';

function App() {
  const { isAuthenticationFetched } = useAuthContext();

  return (
    <div className='w-100 h-100'>
      <Navbar />

      <div className="p-3">
        {!isAuthenticationFetched ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<h1>Not Found</h1>} />

            <Route path="/" element={<ProtectedRoute/>} >
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/travels/:id" element={<UserTravels />} />
              <Route path="/travels/details/:id" element={<TravelsDetails />} />
              <Route path="/travelsList" element={<TravelsList />} />
              <Route path="/requestsList" element={<RequestsList />} />
              <Route path="/addTrip" element={<AddTrip />} />
              <Route path="/travel/user/:id" element={<UserDetails />} />
              <Route path="/travel/edit/id" element={<EditTravelCard />} />
              


            </Route>
          </Routes>
        )}
      </div>
    </div>
  )
}

export default App