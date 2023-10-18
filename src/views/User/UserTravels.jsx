import { useState, useEffect } from "react";
import TravelCard from "../../components/TravelsCard/TravelsCard";
import { getTravels } from "../../services/TravelsService";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";




const UserTravels = () => {
  const {user} = useContext(AuthContext);
    const [travels, setTravels] = useState([]);

    useEffect(() => {
      const fetchUserTravels = () => {
        getTravels()
          .then(userTravels => setTravels(userTravels))
          .catch(error => console.error('Error al obtener los viajes:', error.message));
      };
  
      fetchUserTravels();
    }, []);

    const userTravels = travels.filter(travel => travel.user.id === user.id)
   

    return (
        <div className="UserTravels container">
        <h1>Viajes</h1>
        {userTravels.map((travel) => (
            <TravelCard key={travel.id} {...travel}/>
        ))}
    </div>
)
    
}

export default UserTravels;