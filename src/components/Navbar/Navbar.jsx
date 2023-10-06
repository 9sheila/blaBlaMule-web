import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { logout } from '../../stores/AccessTokenStore';

const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <nav className="Navbar navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">BlaBlaMule</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>Logout</button>
                </li>
                {/* /* por ahora me va a llevar a la vista de viajes luego será un buscador */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/travelsList">Search</NavLink> 
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to= "/addTrip">+Add Trip</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;