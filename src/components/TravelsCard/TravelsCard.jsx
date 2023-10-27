import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateHelper';
import './TravelCard.css'

const TravelCard = (travel) => {
    const parsedDate = formatDate(new Date(travel.date))
    return (
        <Link to={`/travels/details/${travel.id}`} className="card-link">
        <div className="card">
           <div className='card-top'>
            <div className='location'> 
           <h3 className="card-title">{travel.startingPoint}-{travel.destination}</h3>
            </div>
            <p className="card-text">{parsedDate}</p>
            </div>
            <div className='card-bottom'>
            <p className="card-text">1Kg/{travel.price}€</p>
            </div>
        </div>
        </Link>



    )
}

export default TravelCard;