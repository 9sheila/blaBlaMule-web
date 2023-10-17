import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTravel } from "../../services/TravelsService";
import { formatDate } from '../../utils/dateHelper';
import { Link } from 'react-router-dom';



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
          <div className="TravelsDetails detail-container container">
            <div className="mt-4 travel-info-container">
              <h1>{ formatDate(new Date(travel.date))}</h1>
              <p>{travel.startingPoint}-{travel.destination}</p>
              <p>{travel.weight} weight left</p> 
              <Link to={`/travel/user/${travel.user.id}`}><button className="btn btn-light">{travel.user.name}</button></Link>
            </div>
            </div>
        </>
      )}
    </div>
  )
}

export default TravelsDetail;