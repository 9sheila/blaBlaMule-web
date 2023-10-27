import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTravel } from "../../services/TravelsService";
import { formatDate } from '../../utils/dateHelper';
import { Link } from 'react-router-dom';
import './TravelsDetails.css'


const TravelsDetail = () => {
  const [travel, setTravel] = useState(null);
  const { id } = useParams();


  useEffect(() => {
    getTravel(id)
      .then((travel) => {
        setTravel(travel);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  return (

    <div className="TravelsDetail">
      {!travel ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="TravelsDetails">
            <div className="travel-info-container">
              <h1>{formatDate(new Date(travel.date))}</h1>
              <p className="route-description">
                {travel.startingPoint} - {travel.destination}
              </p>
              <p className="weight-info">{travel.weight} kg disponibles</p>
              <Link to={`/travel/user/${travel.user.id}`} className="user-link">
                {travel.user.name}
              </Link>
            </div>

          </div>
        </>
      )}
    </div>
  )
}

export default TravelsDetail;