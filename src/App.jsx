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

function App() {
  const { isAuthenticationFetched } = useAuthContext();

  return (
    <div className='App'>
      <Navbar />

      <div className="container my-3">
        {!isAuthenticationFetched ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<h1>Not Found</h1>} />

            <Route path="/" element={<ProtectedRoute/>} >
              <Route index path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/travels/details/:id" element={<TravelsDetails />} />
              <Route path="/travelsList" element={<TravelsList />} />
              <Route path="/requestsList" element={<RequestsList />} />
              <Route path="/travel/user/:id" element={<UserDetails />} />
              


            </Route>
          </Routes>
        )}
      </div>
    </div>
  )
}

export default App